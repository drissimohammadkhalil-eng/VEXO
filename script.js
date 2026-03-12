@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');

:root {
    --primary: #2563eb;
    --orange: #f97316;
    --bg: #f8fafc;
    --white: #ffffff;
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Cairo', sans-serif; }
body { background-color: var(--bg); direction: rtl; }
.container { max-width: 1100px; margin: auto; padding: 0 20px; }

/* Navbar */
.navbar { background: var(--white); padding: 15px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: sticky; top:0; z-index:100; }
.nav-flex { display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 26px; font-weight: 900; }
.logo span { color: var(--primary); }
.logo img { max-height: 45px; }

/* Hero */
.hero-section { background: linear-gradient(135deg, #fff 0%, #f1f5f9 100%); padding: 60px 0; }
.hero-flex { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.hero-content h1 { font-size: 40px; font-weight: 900; margin-bottom: 15px; }
.hero-content h1 span { color: var(--primary); }
.hero-image img { width: 100%; max-width: 400px; border-radius: 15px; }

/* Grid */
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 25px; padding: 40px 0; }
.product-card { background: white; border-radius: 15px; padding: 15px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: 0.3s; }
.product-card:hover { transform: translateY(-5px); }
.product-card img { width: 100%; height: 220px; object-fit: cover; border-radius: 10px; }
.product-card h3 { margin: 15px 0 5px; font-size: 18px; }

/* Checkout Sidebar/Popup */
.sidebar { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: none; z-index: 1000; overflow-y: auto; }
.checkout-card { background: white; width: 95%; max-width: 480px; margin: 30px auto; border-radius: 20px; padding: 25px; position: relative; }
.close-x { position: absolute; top: 15px; left: 15px; border: none; font-size: 28px; cursor: pointer; background: none; color: #999; }

.product-preview { text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px; }
.product-preview img { width: 140px; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; border: 1px solid #eee; }
.price-tag { color: var(--primary); font-size: 24px; font-weight: 900; margin: 5px 0; }

.quantity-control { display: flex; align-items: center; justify-content: center; gap: 20px; margin: 15px 0; }
.quantity-control button { width: 40px; height: 40px; border-radius: 8px; border: none; background: #f1f5f9; font-size: 20px; cursor: pointer; transition: 0.2s; }
.quantity-control button:hover { background: #e2e8f0; }
#qty-val { font-size: 22px; font-weight: bold; min-width: 30px; }

.shipping-info input, .shipping-info select { width: 100%; padding: 14px; margin: 8px 0; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; font-size: 15px; }

.delivery-options { display: flex; gap: 10px; margin: 15px 0; }
.dev-option { flex: 1; padding: 12px; border: 2px solid #f1f5f9; border-radius: 12px; text-align: center; cursor: pointer; font-size: 14px; transition: 0.3s; color: #64748b; }
.dev-option.active { border-color: var(--primary); background: #eff6ff; color: var(--primary); font-weight: bold; }

.final-bill { background: #f8fafc; padding: 20px; border-radius: 12px; margin-top: 20px; }
.bill-line { display: flex; justify-content: space-between; font-size: 15px; margin-bottom: 8px; color: #64748b; }
.bill-total { display: flex; justify-content: space-between; font-weight: 900; font-size: 20px; color: var(--orange); margin-top: 12px; border-top: 1px dashed #cbd5e1; padding-top: 12px; }

.confirm-btn { width: 100%; padding: 18px; background: var(--orange); color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 20px; transition: 0.3s; }
.confirm-btn:hover { background: #ea580c; }

.btn-buy { width: 100%; padding: 12px; background: var(--primary); color: white; border: none; border-radius: 10px; cursor: pointer; margin-top: 10px; font-weight: bold; }
.admin-section { background: white; padding: 25px; border-radius: 15px; margin: 20px 0; border: 2px dashed var(--primary); }
.admin-input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px; }
.main-footer { text-align: center; padding: 40px 0; color: #94a3b8; font-size: 14px; }

@media (max-width: 768px) {
    .hero-flex { flex-direction: column-reverse; text-align: center; }
    .hero-content h1 { font-size: 32px; }
}
