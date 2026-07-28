import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  recognizedPersons,
  duplicateAttempts,
  dailyTrendData,
  mealPieData,
  summaryCards,
} from '../data/mockData';

/* ─── shared dataset builders ─────────────────────────────── */

function buildDistributionRows(type) {
  const base = recognizedPersons.map(p => ({
    'Person ID':   p.id,
    'Name':        p.name,
    'Time':        p.time,
    'Meal Type':   p.meal,
    'Confidence':  p.confidence,
    'Status':      p.status === 'served' ? 'Food Distributed'
                 : p.status === 'duplicate' ? 'Already Served' : 'Unknown Person',
  }));

  if (type === 'daily') return base;

  if (type === 'weekly') {
    return dailyTrendData.map(d => ({
      'Day':       d.day,
      'Breakfast': d.breakfast,
      'Lunch':     d.lunch,
      'Dinner':    d.dinner,
      'Total':     d.breakfast + d.lunch + d.dinner,
    }));
  }

  // monthly — summary cards + pie
  return [
    ...summaryCards.map(c => ({ 'Metric': c.label, 'Value': String(c.value), 'Change %': c.change })),
    {},
    { 'Metric': 'Meal Breakdown', 'Value': '', 'Change %': '' },
    ...mealPieData.map(m => ({ 'Metric': m.name, 'Value': m.value, 'Change %': '' })),
  ];
}

function buildDuplicateRows() {
  return duplicateAttempts.map(d => ({
    'Person':         d.person,
    'ID':             d.id,
    'Previous Visit': d.prevVisit,
    'Attempt Time':   d.currVisit,
    'Time Diff':      d.diff,
    'Status':         d.status,
  }));
}

/* ─── EXCEL EXPORT ─────────────────────────────────────────── */

export function exportExcel(reportType) {
  const wb = XLSX.utils.book_new();

  // Sheet 1 — Distribution data
  const distRows = buildDistributionRows(reportType);
  const ws1 = XLSX.utils.json_to_sheet(distRows);
  ws1['!cols'] = Object.keys(distRows[0] || {}).map(() => ({ wch: 22 }));
  XLSX.utils.book_append_sheet(wb, ws1, 'Distribution');

  // Sheet 2 — Duplicate Attempts (all report types include this)
  const dupRows = buildDuplicateRows();
  const ws2 = XLSX.utils.json_to_sheet(dupRows);
  ws2['!cols'] = Object.keys(dupRows[0]).map(() => ({ wch: 20 }));
  XLSX.utils.book_append_sheet(wb, ws2, 'Duplicate Attempts');

  // Sheet 3 — Summary
  const summaryRows = summaryCards.map(c => ({
    'Metric':    c.label,
    'Value':     String(c.value),
    'Change %':  c.change,
  }));
  const ws3 = XLSX.utils.json_to_sheet(summaryRows);
  ws3['!cols'] = [{ wch: 28 }, { wch: 14 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, ws3, 'Summary');

  const dateStr = new Date().toISOString().slice(0, 10);
  const label = reportType.charAt(0).toUpperCase() + reportType.slice(1);
  XLSX.writeFile(wb, `SmartCanteen_${label}Report_${dateStr}.xlsx`);
}

/* ─── PDF EXPORT ───────────────────────────────────────────── */

export function exportPDF(reportType) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const label   = reportType.charAt(0).toUpperCase() + reportType.slice(1);
  const pageW   = doc.internal.pageSize.getWidth();

  /* ── Header bar ── */
  doc.setFillColor(37, 99, 235);           // blue-600
  doc.rect(0, 0, pageW, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text('Smart Canteen Food Distribution System', 14, 10);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`${label} Report  ·  Generated: ${dateStr}`, 14, 17);

  /* ── Section 1: Summary Stats ── */
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary Overview', 14, 32);

  const summaryBody = summaryCards.map(c => [
    c.label,
    String(c.value),
    c.change === 0 ? '—' : `${c.change > 0 ? '+' : ''}${c.change}%`,
  ]);

  autoTable(doc, {
    startY: 35,
    head: [['Metric', 'Value', 'Change']],
    body: summaryBody,
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: [15, 23, 42] },
    alternateRowStyles: { fillColor: [240, 244, 255] },
    columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 30 }, 2: { cellWidth: 30 } },
    margin: { left: 14 },
    tableWidth: 130,
  });

  /* ── Section 2: Distribution Table ── */
  const distRows  = buildDistributionRows(reportType);
  const distKeys  = Object.keys(distRows.filter(r => Object.keys(r).length > 0)[0] || {});
  const distHead  = [distKeys];
  const distBody  = distRows
    .filter(r => Object.keys(r).length > 0)
    .map(r => distKeys.map(k => r[k] ?? ''));

  const afterSummary = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(
    reportType === 'daily'   ? 'Distribution Records'
    : reportType === 'weekly' ? 'Daily Distribution Trend'
    : 'Monthly Metrics',
    14, afterSummary
  );

  autoTable(doc, {
    startY: afterSummary + 3,
    head: distHead,
    body: distBody,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 8, textColor: [15, 23, 42] },
    alternateRowStyles: { fillColor: [240, 253, 249] },
    margin: { left: 14, right: 14 },
  });

  /* ── Section 3: Duplicate Attempts (new page) ── */
  doc.addPage();

  doc.setFillColor(239, 68, 68);
  doc.rect(0, 0, pageW, 14, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Duplicate Attempt Log', 14, 10);

  const dupRows  = buildDuplicateRows();
  const dupKeys  = Object.keys(dupRows[0]);
  autoTable(doc, {
    startY: 20,
    head: [dupKeys],
    body: dupRows.map(r => dupKeys.map(k => r[k])),
    theme: 'grid',
    headStyles: { fillColor: [239, 68, 68], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: [15, 23, 42] },
    alternateRowStyles: { fillColor: [255, 241, 242] },
    margin: { left: 14, right: 14 },
  });

  /* ── Footer on every page ── */
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Smart Canteen v2.0  ·  Page ${i} of ${totalPages}  ·  Confidential`,
      pageW / 2, doc.internal.pageSize.getHeight() - 6,
      { align: 'center' }
    );
  }

  XLSX; // suppress unused warning in some bundlers
  const fileDate = new Date().toISOString().slice(0, 10);
  doc.save(`SmartCanteen_${label}Report_${fileDate}.pdf`);
}
