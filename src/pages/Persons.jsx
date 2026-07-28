import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdPersonAdd, MdSearch, MdFilterList, MdClose } from 'react-icons/md';

const persons = [
  { id: 'EMP001', name: 'Rahul Sharma', dept: 'Engineering', meals: 45, status: 'active'   },
  { id: 'EMP002', name: 'Priya Singh',  dept: 'Marketing',   meals: 42, status: 'active'   },
  { id: 'EMP003', name: 'Amit Kumar',   dept: 'Finance',     meals: 38, status: 'active'   },
  { id: 'EMP004', name: 'Sneha Patel',  dept: 'HR',          meals: 50, status: 'active'   },
  { id: 'EMP005', name: 'Vikram Nair',  dept: 'Engineering', meals: 30, status: 'active'   },
  { id: 'EMP006', name: 'Anita Rao',    dept: 'Operations',  meals: 44, status: 'active'   },
  { id: 'EMP007', name: 'Ravi Verma',   dept: 'Logistics',   meals: 35, status: 'inactive' },
  { id: 'EMP008', name: 'Meera Joshi',  dept: 'Engineering', meals: 48, status: 'active'   },
];

export default function Persons() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'delete'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (type, person = null) => {
    setModalType(type);
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPerson(null);
    setModalType(null);
  };

  const handleDelete = () => {
    // Add your delete logic here
    console.log(`Deleting person: ${selectedPerson?.name}`);
    // Remove from array or call API
    closeModal();
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add your save logic here
    console.log(`Saving ${modalType === 'add' ? 'new' : 'updated'} person`);
    closeModal();
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
        >
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Persons</h1>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Manage registered personnel</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal('add')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            <MdPersonAdd size={18} /> 
            <span style={{ display: 'inline' }}>Add Person</span>
          </motion.button>
        </motion.div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--card-bg)', border: '1px solid var(--border)',
            borderRadius: 16, boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
          }}
        >
          {/* Toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
            borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
          }}>
            <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 320 }}>
              <MdSearch size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
              <input
                placeholder="Search by name or ID..."
                style={{
                  width: '100%', paddingLeft: 30, paddingRight: 12,
                  paddingTop: 8, paddingBottom: 8, borderRadius: 10,
                  fontSize: 13, background: 'var(--input-bg)',
                  border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none',
                  transition: 'all 0.2s ease',
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, background: 'var(--bg-hover)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
                background: 'var(--bg-surface2)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <MdFilterList size={15} /> Filter
            </motion.button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: 'var(--bg-surface2)' }}>
                  {['Person', 'ID', 'Department', 'Meals This Month', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '10px 16px',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                      textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {persons.map((p, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                    whileHover={{ background: 'var(--bg-hover)' }}
                  >
                    {/* Person */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg,#3b82f6,#6366f1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontSize: 12, fontWeight: 700,
                        }}>
                          {p.name[0]}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{p.dept}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{p.meals}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                        background: p.status === 'active' ? 'rgba(16,185,129,0.1)' : 'var(--bg-surface2)',
                        color:      p.status === 'active' ? 'var(--accent-green)'   : 'var(--text-muted)',
                        border:     p.status === 'active' ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--border)',
                        textTransform: 'capitalize',
                      }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8,
                        flexWrap: 'wrap',
                      }}>
                        <motion.button 
                          whileHover={{ 
                            scale: 1.05,
                            background: 'rgba(59, 130, 246, 0.15)',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)'
                          }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => openModal('edit', p)}
                          style={{ 
                            fontSize: 12, 
                            fontWeight: 600, 
                            color: 'var(--accent-blue)', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            padding: '4px 10px',
                            borderRadius: 6,
                            transition: 'all 0.2s ease',
                            background: 'rgba(59, 130, 246, 0.05)',
                            minWidth: '44px',
                            minHeight: '30px',
                          }}
                        >
                          Edit
                        </motion.button>
                        
                        <motion.button 
                          whileHover={{ 
                            scale: 1.05,
                            background: 'rgba(239, 68, 68, 0.15)',
                            boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)'
                          }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => openModal('delete', p)}
                          style={{ 
                            fontSize: 12, 
                            fontWeight: 600, 
                            color: 'var(--accent-red)',  
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            padding: '4px 10px',
                            borderRadius: 6,
                            transition: 'all 0.2s ease',
                            background: 'rgba(239, 68, 68, 0.05)',
                            minWidth: '44px',
                            minHeight: '30px',
                          }}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 16,
                padding: '32px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                border: '1px solid var(--border)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MdClose size={24} />
              </motion.button>

              {/* Modal Content */}
              {modalType === 'delete' ? (
                // Delete Confirmation Modal
                <>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: 'var(--accent-red)',
                    }}>
                      ⚠️
                    </div>
                  </div>
                  
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    textAlign: 'center',
                    marginBottom: '8px'
                  }}>
                    Delete Person
                  </h2>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-secondary)',
                    textAlign: 'center',
                    marginBottom: '24px'
                  }}>
                    Are you sure you want to delete <strong>{selectedPerson?.name}</strong>?
                    <br />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      ID: {selectedPerson?.id} • Department: {selectedPerson?.dept}
                    </span>
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center',
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={closeModal}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        flex: 1,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Cancel
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDelete}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        flex: 1,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </>
              ) : (
                // Add/Edit Person Modal
                <>
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: 700, 
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {modalType === 'add' ? 'Add New Person' : 'Edit Person'}
                  </h2>
                  <p style={{ 
                    fontSize: '13px', 
                    color: 'var(--text-muted)',
                    marginBottom: '24px'
                  }}>
                    {modalType === 'add' ? 'Enter the details to add a new person' : `Update ${selectedPerson?.name}'s information`}
                  </p>

                  <form onSubmit={handleSave}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '6px'
                      }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedPerson?.name || ''}
                        placeholder="Enter full name"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '6px'
                      }}>
                        Employee ID *
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedPerson?.id || ''}
                        placeholder="Enter employee ID"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        required
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '6px'
                      }}>
                        Department *
                      </label>
                      <select
                        defaultValue={selectedPerson?.dept || ''}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        required
                      >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="Operations">Operations</option>
                        <option value="Logistics">Logistics</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        marginBottom: '6px'
                      }}>
                        Status
                      </label>
                      <select
                        defaultValue={selectedPerson?.status || 'active'}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'var(--input-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '12px',
                    }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={closeModal}
                        style={{
                          padding: '10px 24px',
                          borderRadius: '10px',
                          border: '1px solid var(--border)',
                          background: 'transparent',
                          color: 'var(--text-secondary)',
                          fontSize: '14px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          flex: 1,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={{
                          padding: '10px 24px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          flex: 1,
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {modalType === 'add' ? 'Add Person' : 'Update Person'}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          /* Add Person button responsive */
          button[style*="linear-gradient(135deg,#3b82f6,#1d4ed8)"] {
            padding: 8px 14px !important;
            font-size: 12px !important;
          }
          
          button[style*="linear-gradient(135deg,#3b82f6,#1d4ed8)"] span {
            display: none !important;
          }
          
          /* Filter button responsive */
          button:has(svg[data-icon="filter"]) {
            padding: 8px 12px !important;
            font-size: 11px !important;
          }
        }

        @media (max-width: 600px) {
          /* Edit and Delete buttons become icons */
          td:last-child button {
            min-width: 36px !important;
            min-height: 36px !important;
            padding: 4px 8px !important;
            font-size: 0 !important;
            border-radius: 8px !important;
          }
          
          td:last-child button:first-child::after {
            content: "✎" !important;
            font-size: 18px !important;
            line-height: 1 !important;
          }
          
          td:last-child button:last-child::after {
            content: "✕" !important;
            font-size: 18px !important;
            line-height: 1 !important;
          }
          
          td:last-child {
            padding: 8px 10px !important;
          }
          
          td:last-child div {
            gap: 6px !important;
          }
        }

        @media (max-width: 480px) {
          /* Small screens optimization */
          td {
            padding: 8px 8px !important;
            font-size: 11px !important;
          }
          
          td:first-child div p {
            font-size: 11px !important;
          }
          
          td:first-child div div {
            width: 28px !important;
            height: 28px !important;
            font-size: 10px !important;
          }
          
          th {
            padding: 8px 8px !important;
            font-size: 8px !important;
          }
          
          /* Make Edit/Delete buttons even smaller on very small screens */
          td:last-child button {
            min-width: 32px !important;
            min-height: 32px !important;
            padding: 2px 6px !important;
          }
          
          td:last-child button:first-child::after,
          td:last-child button:last-child::after {
            font-size: 16px !important;
          }
          
          td:last-child div {
            gap: 4px !important;
          }
          
          /* Modal adjustments for mobile */
          div[style*="padding: '32px'"] {
            padding: 24px !important;
            margin: 12px !important;
          }
        }

        /* Touch-friendly hover states for mobile */
        @media (hover: none) and (pointer: coarse) {
          button:active {
            transform: scale(0.95) !important;
          }
        }
      `}</style>
    </>
  );
}