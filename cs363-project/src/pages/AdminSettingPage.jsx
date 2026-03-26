import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminSettingPage() {
  const navigate = useNavigate();
  // ─── States (รักษาข้อมูลเดิมครบถ้วน) ──────────────────────────────────────────
  const [shopName, setShopName] = useState(localStorage.getItem('shopName') || '');
  const [bgColor, setBgColor] = useState('#DCC3A1'); // สีพื้นหลังเดิมจากโค้ดชุดแรก
  const [btnColor, setBtnColor] = useState('#58B9B1');
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0); 
  const [showAddPopup, setShowAddPopup] = useState(false);

  const [draggingIndex, setDraggingIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const [newCatTH, setNewCatTH] = useState('');
  const [newCatEN, setNewCatEN] = useState('');
  const [newCatOption, setNewCatOption] = useState('showSpecific');

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [{ id: 1, th: 'เมนูทั้งหมด', en: 'All Menu', selectedOption: 'showSpecific' }];
  });

  const bgInputRef = useRef(null);
  const btnInputRef = useRef(null);

  // ─── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('shopName', shopName);
  }, [categories, shopName]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const toggleAccordion = (index) => {
    setActiveAccordionIndex((prev) => (prev === index ? null : index));
  };

  const handleRadioChange = (catId, option) => {
    setCategories(categories.map(cat => 
      cat.id === catId ? { ...cat, selectedOption: option } : cat
    ));
  };

  const confirmAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      th: newCatTH || 'หมวดหมู่ใหม่', 
      en: newCatEN || 'New Category',
      selectedOption: newCatOption 
    };
    setCategories([...categories, newCategory]);
    setNewCatTH('');
    setNewCatEN('');
    setNewCatOption('showSpecific');
    setShowAddPopup(false);
  };

  // ─── Drag-and-drop Logic (นำมาจาก AdminMenu) ──────────────────────────────
  const handleDragStart = useCallback((i) => setDraggingIndex(i), []);
  const handleDragOver  = useCallback((e, i) => {
    e.preventDefault();
    setOverIndex(i);
  }, []);
  const handleDragEnd   = useCallback(() => { setDraggingIndex(null); setOverIndex(null); }, []);

  const handleDrop = useCallback(
    (dropIndex) => {
      if (draggingIndex === null || draggingIndex === dropIndex) return;
      setCategories((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggingIndex, 1);
        next.splice(dropIndex, 0, moved);
        return next;
      });
      setDraggingIndex(null);
      setOverIndex(null);
    },
    [draggingIndex]
  );

  // ─── Styles Object (ปรับให้เต็มจอและ Responsive) ──────────────────────────
  const styles = {
    container: {
      fontFamily: "'Sarabun','Noto Sans Thai',sans-serif",
      minHeight: "100vh",
      backgroundColor: "#FAF5F5", // กลับมาใช้สีพื้นหลังเดิมตามที่คุณต้องการ
      color: "#2D505D",
      padding: "20px",
      paddingBottom: "100px", // เผื่อพื้นที่ด้านล่าง
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    wrapper: {
      width: "100%",
      maxWidth: "100%", // ปรับความกว้างให้ดูดีทั้งในคอมและมือถือ
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
    logo: { fontSize: "24px", fontWeight: "800", lineHeight: "1.1", margin: 0 },
    section: { marginBottom: "25px", width: "100%" },
    title: { fontSize: "18px", fontWeight: "bold", marginBottom: "15px" },
    inputGroup: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "10px" },
    input: { border: "none", borderRadius: "12px", padding: "10px 15px", background: "white", flex: "1", maxWidth: "200px", outline: "none", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" },
    select: { border: "none", borderRadius: "12px", padding: "10px 15px", background: "white", flex: "1", maxWidth: "200px", outline: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232D505D' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 15px center" },
    colorDot: { width: "35px", height: "35px", borderRadius: "50%", border: "3px solid white", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
    card: { background: "#EDEDED", borderRadius: "20px", marginBottom: "12px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" },
    popupOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(2px)" },
    popupBox: { background: "#E2E8EA", width: "90%", maxWidth: "380px", borderRadius: "30px", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" },
    radioCircle: { width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #2D505D", background: "white", position: "relative", flexShrink: 0 }
  };

  return (
    <>
      <style>{`
        .active-tab { border: 2px solid #2D505D; border-radius: 20px; font-weight: bold; }
        .radio-checked::after { content: ''; position: absolute; top: 3px; left: 3px; width: 8px; height: 8px; background: #2D505D; border-radius: 50%; }
        input:focus, select:focus { border: 1.5px solid #58B9B1 !important; }
        @media (max-width: 400px) {
            .input-label { font-size: 14px; }
            input, select { max-width: 160px !important; }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Header */}
          <header style={styles.header}>
            <h1 style={styles.logo}>Ezy <br /> Order</h1>
            <button style={{ border: "2px solid #58B9B1", background: "white", padding: "8px 16px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", color: "#2D505D" }}>
              ดูตัวอย่าง
            </button>
          </header>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', padding: '12px 20px', borderBottom: '1px solid #F0F0F0',alignItems: 'center',justifyContent: 'center' }}>
          <div style={{ display: 'flex', width: '100%', maxWidth: '400px', alignItems: 'center' }}>
            
            {/* Tab: ตั้งค่าระบบ (Active) */}
            <button 
              onClick={() => navigate('/admin/setting')}
              style={{ flex: 1, padding: '8px 0', borderRadius: '12px', border: '2px solid #58B9B1', backgroundColor: 'transparent', color: '#2D505D', fontWeight: '900', fontSize: '16px',cursor: 'pointer'
              }}
            >
              ตั้งค่าระบบ
            </button>

            {/* เส้นคั่นกลางแนวตั้ง */}
            <div style={{ width: '1px', height: '20px', backgroundColor: '#E0E0E0', margin: '0 15px' }} />

            {/* Tab: จัดการเมนู (Inactive) */}
            <button 
              onClick={() => navigate('/admin')}
              style={{ flex: 1, padding: '8px 0', border: 'none', backgroundColor: 'transparent', color: '#2D505D', fontWeight: 'bold', fontSize: '16px',cursor: 'pointer'
              }}
            >
              จัดการเมนู
            </button>
          </div>
          </div>

          {/* Basic Settings (ข้อมูลเดิมครบ) */}
          <section style={styles.section}>
            <h2 style={styles.title}>⚙️ ตั้งค่าขั้นพื้นฐาน</h2>
            
            <div style={styles.inputGroup}>
              <label className="input-label">ชื่อร้าน</label>
              <input 
                style={styles.input} 
                value={shopName} 
                onChange={(e) => setShopName(e.target.value)} 
                placeholder="ชื่อร้านของคุณ"
              />
            </div>

            <div style={styles.inputGroup}>
              <label className="input-label">สีพื้นหลัง</label>
              <div style={{ ...styles.colorDot, backgroundColor: bgColor }} onClick={() => bgInputRef.current.click()} />
              <input type="color" ref={bgInputRef} value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ display: "none" }} />
            </div>

            <div style={styles.inputGroup}>
              <label className="input-label">สีปุ่ม</label>
              <div style={{ ...styles.colorDot, backgroundColor: btnColor }} onClick={() => btnInputRef.current.click()} />
              <input type="color" ref={btnInputRef} value={btnColor} onChange={(e) => setBtnColor(e.target.value)} style={{ display: "none" }} />
            </div>

            <div style={styles.inputGroup}>
              <label className="input-label">หน้าเริ่มต้น</label>
              <select style={styles.select}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.th}>{cat.th}</option>
                ))}
              </select>
            </div>
          </section>

          {/* Categories Section */}
          <section style={styles.section}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ ...styles.title, marginBottom: 0 }}>⚙️ หมวดหมู่</h2>
              <button 
                onClick={() => setShowAddPopup(true)}
                style={{ width: "35px", height: "35px", borderRadius: "50%", border: "none", background: "white", fontWeight: "bold", fontSize: "20px", cursor: "pointer", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}
              >+</button>
            </div>

            {categories.map((cat, index) => {
              const isActive = activeAccordionIndex === index;
              const isDragging = draggingIndex === index;
              const isOver = overIndex === index && draggingIndex !== index;

              return (
                <div 
                  key={cat.id} 
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={() => handleDrop(index)}
                  className={`${isDragging ? 'dragging' : ''} ${isOver ? 'drag-over' : ''}`}
                  style={styles.card}
                >
                  <div 
                    onClick={() => toggleAccordion(index)}
                    style={{ padding: "15px 20px", display: "flex", justifyContent: "space-between", cursor: "pointer", fontWeight: "bold" }}
                  >
                    <span>{cat.th}</span>
                    <span style={{ fontSize: "12px" }}>{isActive ? '▲' : '▼'}</span>
                  </div>

                  {isActive && (
                    <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                      <div style={styles.inputGroup}>
                        <label style={{ fontSize: "13px" }}>ชื่อ (TH):</label>
                        <input 
                          style={{ ...styles.input, maxWidth: "180px" }} 
                          value={cat.th} 
                          onChange={(e) => {
                            const updated = [...categories];
                            updated[index].th = e.target.value;
                            setCategories(updated);
                          }}
                        />
                      </div>

                      <div style={styles.inputGroup}>
                        <label style={{ fontSize: "13px" }}>ชื่อ (EN):</label>
                        <input 
                          style={{ ...styles.input, maxWidth: "180px" }} 
                          value={cat.en || ''} 
                          onChange={(e) => {
                            const updated = [...categories];
                            updated[index].en = e.target.value;
                            setCategories(updated);
                        }} />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ display: "flex", gap: "10px", fontSize: "12px", cursor: "pointer" }} onClick={() => handleRadioChange(cat.id, 'showSpecific')}>
                          <div className={`radio-circle ${cat.selectedOption === 'showSpecific' ? 'radio-checked' : ''}`} style={styles.radioCircle} />
                          <span>แสดงเฉพาะเมนูที่ต้องการในหมวด</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", fontSize: "12px", cursor: "pointer" }} onClick={() => handleRadioChange(cat.id, 'showAll')}>
                          <div className={`radio-circle ${cat.selectedOption === 'showAll' ? 'radio-checked' : ''}`} style={styles.radioCircle} />
                          <span>แสดงทุกเมนู(หลังเลือกจะแก้ไขเมนูในหมวดหมู่ไม่ได้)</span>
                        </div>
                      </div>

                      {cat.selectedOption === 'showSpecific' && (
                        <button 
                          onClick={() => navigate(`/admin-edit-menu/${cat.id}`)} // ส่ง ID ไปทาง URL
                          style={{ padding: "12px", borderRadius: "15px", border: "1.5px solid #2D505D", background: "white", fontWeight: "bold", color: "#2D505D" }}
                        >
                          แก้ไขเมนูในหมวดหมู่
                        </button>
                      )}

                      <div 
                        onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                        style={{ color: "#E57373", textAlign: "center", fontSize: "12px", textDecoration: "underline", cursor: "pointer", marginTop: "5px" }}
                      >
                        ลบหมวดหมู่
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>

        {/* Add Popup (Responsive) */}
        {showAddPopup && (
          <div style={styles.popupOverlay}>
            <div style={styles.popupBox}>
              <h3 style={{ textAlign: "center", margin: 0, fontWeight: "800" }}>เพิ่มหมวดหมู่</h3>
              
              <div style={styles.inputGroup}>
                <label style={{ fontSize: "13px" }}>ชื่อ (TH):</label>
                <input 
                  style={{ ...styles.input, maxWidth: "180px" }} 
                  placeholder="ชื่อภาษาไทย" 
                  value={newCatTH}
                  onChange={(e) => setNewCatTH(e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
              <label style={{ fontSize: "13px" }}>ชื่อ (EN):</label>
                <input 
                  style={{ ...styles.input, maxWidth: "180px" }} // ใส่เพิ่มตรงนี้
                  placeholder="ชื่อภาษาอังกฤษ" 
                  value={newCatEN} 
                  onChange={(e) => setNewCatEN(e.target.value)} 
                />
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", gap: "10px", fontSize: "12px", cursor: "pointer" }} onClick={() => setNewCatOption('showSpecific')}>
                  <div className={`radio-circle ${newCatOption === 'showSpecific' ? 'radio-checked' : ''}`} style={styles.radioCircle} />
                  <span>แสดงเฉพาะเมนูที่ต้องการ</span>
                </div>
                <div style={{ display: "flex", gap: "10px", fontSize: "12px", cursor: "pointer" }} onClick={() => setNewCatOption('showAll')}>
                  <div className={`radio-circle ${newCatOption === 'showAll' ? 'radio-checked' : ''}`} style={styles.radioCircle} />
                  <span>แสดงทุกเมนู(หลังเลือกจะแก้ไขเมนูในหมวดหมู่ไม่ได้)</span>
                </div>
              </div>

              {newCatOption === 'showSpecific' && (
                <button style={{ padding: "12px", borderRadius: "15px", border: "1.5px solid #2D505D", background: "white", fontWeight: "bold", color: "#2D505D", fontSize: "13px" }}>
                  แก้ไขเมนูในหมวดหมู่
                </button>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button onClick={confirmAddCategory} style={{ flex: 1, background: "#58B9B1", color: "white", border: "none", padding: "12px", borderRadius: "15px", fontWeight: "bold", cursor: "pointer" }}>เพิ่ม</button>
                <button onClick={() => setShowAddPopup(false)} style={{ flex: 1, background: "white", border: "1.5px solid #2D505D", padding: "12px", borderRadius: "15px", fontWeight: "bold", color: "#2D505D", cursor: "pointer" }}>ยกเลิก</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}