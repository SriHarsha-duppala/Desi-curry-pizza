import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Pizza, Menu, Phone, MapPin, Search, X, ChevronLeft, ChevronRight, ShieldCheck, FileText, MessageCircle, Star, Leaf, Flame, Utensils, Clock } from 'lucide-react';
import './styles.css';

const PHONE = '+15106760223';
const PHONE_DISPLAY = '+1 (510) 676-0223';
const ADDRESS = '1713 Park Avenue, South Plainfield, New Jersey';
const mapSrc = 'https://www.google.com/maps?q=1713%20Park%20Avenue%2C%20South%20Plainfield%2C%20New%20Jersey&output=embed';

const prices = { Small: '18.99', Medium: '20.99', Large: '22.99', 'X-Large': '24.99' };

const images = [
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1600628421055-4d30de868b8f?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85'
];

const products = [
  { name: 'Butter Chicken Pizza', type: 'Non-Veg', desc: 'Creamy butter chicken topping with cheese and desi masala finish.', img: images[0], tag: 'Chef Special' },
  { name: 'Chicken Tikka Pizza', type: 'Non-Veg', desc: 'Juicy tikka pieces, onions, peppers and Indian spice blend.', img: images[1], tag: 'Popular' },
  { name: 'Achari Chicken Pizza', type: 'Non-Veg', desc: 'Tangy achari chicken flavour with bold pickle style spices.', img: images[2], tag: 'Tangy' },
  { name: 'Chicken Tandoori Pizza', type: 'Non-Veg', desc: 'Smoky tandoori chicken layered on a cheesy pizza base.', img: images[3], tag: 'Smoky' },
  { name: 'Chicken 65 Pizza', type: 'Non-Veg', desc: 'South Indian style Chicken 65 topping with spicy kick.', img: images[4], tag: 'Spicy' },
  { name: 'Spicy Chicken Pizza', type: 'Non-Veg', desc: 'Hot chicken pizza made for spice lovers.', img: images[5], tag: 'Hot' },
  { name: 'Desi Hawaiian Pizza', type: 'Non-Veg', desc: 'Sweet and spicy desi Hawaiian twist with chicken and pineapple notes.', img: images[6], tag: 'Fusion' },
  { name: 'Garlic Chicken Pizza', type: 'Non-Veg', desc: 'Garlic loaded chicken pizza with rich cheese pull.', img: images[7], tag: 'Garlic' },
  { name: 'Desi BBQ Chicken Pizza', type: 'Non-Veg', desc: 'BBQ chicken pizza with Indian seasoning and smoky sauce.', img: images[8], tag: 'BBQ' },
  { name: 'Palak Paneer Pizza', type: 'Veg', desc: 'Classic palak paneer taste on a soft, cheesy pizza crust.', img: images[9], tag: 'Veg Special' },
  { name: 'Garlic Garden Pizza', type: 'Veg', desc: 'Garden vegetables with garlic flavour and mozzarella cheese.', img: images[10], tag: 'Fresh' },
  { name: 'Veggie Pizza', type: 'Veg', desc: 'Loaded vegetables, cheese and house pizza sauce.', img: images[11], tag: 'Classic' },
  { name: 'Corn Pizza', type: 'Veg', desc: 'Sweet corn topping with creamy cheese and herbs.', img: images[12], tag: 'Kids Favorite' },
  { name: 'Paneer 65 Pizza', type: 'Veg', desc: 'Paneer 65 style topping with spicy desi flavour.', img: images[13], tag: 'Paneer' },
  { name: 'Desi Hawaiian Veggie', type: 'Veg', desc: 'Veggie Hawaiian style pizza with a desi twist.', img: images[14], tag: 'Fusion' },
  { name: 'Corn Garden Pizza', type: 'Veg', desc: 'Corn, garden veggies and cheese baked together.', img: images[15], tag: 'Garden' },
  { name: 'Veggie Works Pizza', type: 'Veg', desc: 'Fully loaded vegetable pizza with extra flavour.', img: images[2], tag: 'Loaded' },
  { name: 'Spaghetti', type: 'Pasta', desc: 'Classic spaghetti pasta with sauce and herbs.', img: images[14], tag: 'Pasta' },
  { name: 'Penne', type: 'Pasta', desc: 'Penne pasta with rich sauce and cheesy finish.', img: images[15], tag: 'Pasta' },
  { name: 'Ziti', type: 'Pasta', desc: 'Comforting ziti pasta baked style taste.', img: images[14], tag: 'Pasta' },
  { name: 'Fettuccine', type: 'Pasta', desc: 'Creamy fettuccine pasta with smooth texture.', img: images[15], tag: 'Pasta' }
];


function galleryFor(index) {
  return [images[index % images.length], images[(index + 3) % images.length], images[(index + 7) % images.length], images[(index + 11) % images.length]];
}

const enrichedProducts = products.map((p, index) => ({ ...p, id: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), gallery: galleryFor(index) }));

const banners = [
  { title: 'Desi Curry Pizza', text: 'Indian flavours. Fresh pizza. Direct WhatsApp booking.', img: images[1] },
  { title: 'Tandoori Meets Cheese', text: 'Fusion pizzas crafted for desi taste lovers.', img: images[3] },
  { title: 'Veg & Non-Veg Specials', text: 'Paneer, chicken, veggies, pasta and more.', img: images[9] },
  { title: 'Order on WhatsApp', text: 'Choose size, send message and enjoy fresh pizza.', img: images[5] }
];

function whatsappText(item = '') {
  const text = item ? `Hi, I want to order ${item} from Desi Curry Pizza.` : 'Hi, I want to order from Desi Curry Pizza.';
  return `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(text)}`;
}


function GlobalSearch({ setPage, setSelected }) {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const value = q.trim().toLowerCase();
    if (!value) return [];
    return enrichedProducts.filter(p => p.name.toLowerCase().includes(value)).slice(0, 8);
  }, [q]);
  const openItem = (item) => {
    setSelected(item);
    setPage('detail');
    setQ('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <section className="globalSearchWrap">
    <div className="globalSearch"><Search size={20}/><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search pizza or menu items..." /></div>
    {results.length > 0 && <div className="searchDrop">{results.map(item => <button key={item.id} onClick={() => openItem(item)}><img src={item.img} alt={item.name}/><span>{item.name}</span><b>${prices.Small}</b></button>)}</div>}
  </section>;
}

function Header({ page, setPage, setSelected }) {
  const [open, setOpen] = useState(false);
  const pages = [
    ['home', 'Home'], ['pizza', 'Pizza'], ['menu', 'Menu'], ['about', 'About Us'], ['contact', 'Contact']
  ];
  const go = (p) => { setSelected(null); setPage(p); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <>
    <header className="topbar">
      <button className="brand" onClick={() => go('home')}><span className="logo">🍕</span><span>Desi Curry <b>Pizza</b></span></button>
      <nav className="desktopNav">{pages.map(([id, label]) => <button className={page === id ? 'active' : ''} onClick={() => go(id)} key={id}>{label}</button>)}</nav>
      <a className="orderTop" href={whatsappText()} target="_blank"><MessageCircle size={18}/> Order</a>
      <button className="hamb" onClick={() => setOpen(true)}>☰</button>
    </header>
    {open && <div className="drawerOverlay" onClick={() => setOpen(false)}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => setOpen(false)}><X/> Close</button>
        {pages.map(([id, label]) => <button className={page === id ? 'active drawerBtn' : 'drawerBtn'} onClick={() => go(id)} key={id}>{label}</button>)}
        <a className="drawerOrder" href={whatsappText()} target="_blank">Order on WhatsApp</a>
      </aside>
    </div>}
  </>;
}

function BannerSlider() {
  const [i, setI] = useState(0);
  const next = () => setI((value) => (value + 1) % banners.length);
  const prev = () => setI((value) => (value - 1 + banners.length) % banners.length);
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, []);
  return <section className="sliderWrap">
    <div className="bannerSlide" style={{ backgroundImage: `linear-gradient(90deg, rgba(20,5,1,.70), rgba(20,5,1,.12)), url(${banners[i].img})` }}>
      <div className="bannerText"><p className="eyebrow">Fresh • Hot • Desi Style</p><h1>{banners[i].title}</h1><p>{banners[i].text}</p><button onClick={() => document.getElementById('intro').scrollIntoView({behavior:'smooth'})}>Explore</button></div>
      <button className="sliderBtn left" aria-label="Previous banner" onClick={prev}><ChevronLeft/></button>
      <button className="sliderBtn right" aria-label="Next banner" onClick={next}><ChevronRight/></button>
    </div>
    <div className="dots">{banners.map((_, idx) => <button key={idx} onClick={() => setI(idx)} className={idx === i ? 'dot activeDot' : 'dot'} />)}</div>
  </section>;
}

function HomePage({ setPage }) {
  return <main>
    <BannerSlider />
    <section id="intro" className="intro grid2">
      <div><p className="eyebrow">Welcome to Desi Curry Pizza</p><h2>Indian inspired pizza made for bold flavour lovers.</h2><p>Desi Curry Pizza brings together fresh pizza, Indian spices, paneer specials, chicken favourites and pasta options. The website is designed for easy browsing and direct WhatsApp ordering.</p><div className="ctaRow"><button onClick={() => setPage('pizza')}>View Pizza Page</button><a href={whatsappText()} target="_blank">WhatsApp Order</a></div></div>
      <div className="featureCard"><Star/><h3>Why customers love it</h3><p>Attractive fusion menu, multiple size options, easy direct booking, and a simple contact experience for South Plainfield customers.</p></div>
    </section>
    <section className="homeCards">
      <article><Flame/><h3>Desi Flavours</h3><p>Tikka, tandoori, butter chicken, paneer and spicy specials.</p></article>
      <article><Leaf/><h3>Veg Options</h3><p>Fresh veggie and paneer pizzas with Indian style seasoning.</p></article>
      <article><Utensils/><h3>Pasta Menu</h3><p>Spaghetti, penne, ziti and fettuccine options available.</p></article>
    </section>
  </main>;
}


function PizzaPage({ setPage, setSelected }) {
  const [filter, setFilter] = useState('All');
  const list = useMemo(() => enrichedProducts.filter(p => filter === 'All' || p.type === filter), [filter]);
  return <main className="pagePad">
    <section className="pageHero"><p className="eyebrow">Pizza & Pasta</p><h1>Choose your favourite item</h1><p>Tap any item to see more images, select size and book directly on WhatsApp.</p></section>
    <div className="filters">{['All','Non-Veg','Veg','Pasta'].map(f => <button className={filter===f?'activeFilter':''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
    <section className="productGrid">{list.map(item => <ProductCard key={item.id} item={item} setPage={setPage} setSelected={setSelected}/>)}</section>
  </main>;
}

function ProductCard({ item, setPage, setSelected }) {
  const open = () => { setSelected(item); setPage('detail'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <article className="productCard" onClick={open} role="button" tabIndex="0">
    <div className="imgBox"><img src={item.img} alt={item.name}/><span>{item.tag}</span></div>
    <div className="productBody"><div className="typeLine"><span className={item.type === 'Veg' ? 'veg' : item.type === 'Pasta' ? 'pasta' : 'nonveg'}>{item.type}</span></div><h3>{item.name}</h3>
    <div className="miniPrice"><b>From</b><span>${prices.Small}</span></div>
    <button className="whatsBtn" onClick={(e)=>{e.stopPropagation(); setSelected(item); setPage('detail');}}>View Details</button></div>
  </article>;
}


function BookingBox({ product, size }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const message = `Hi Desi Curry Pizza, I want to book an order.\n\nItem: ${product.name}\nSize: ${size}\nPrice: $${prices[size]}\nDelivery Charge: I will pay delivery charge if applicable.\n\nCustomer Name: ${customerName || 'Please update'}\nPhone: ${phone || 'Please update'}\nDelivery Address: ${address || 'Please update'}\nNotes: ${notes || 'No notes'}\n\nPlease confirm availability and total cost.`;
  const link = `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`;
  return <div className="bookingBox">
    <h3>Delivery Details</h3>
    <p>Fill your details. Address and delivery charge note will be sent directly to WhatsApp.</p>
    <input value={customerName} onChange={(e)=>setCustomerName(e.target.value)} placeholder="Your name" />
    <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Your phone number" />
    <textarea value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Full delivery address" rows="3" />
    <input value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Any note like pickup/delivery time" />
    <a className="detailOrder" href={link} target="_blank"><MessageCircle size={18}/> Send Full Details on WhatsApp</a>
  </div>;
}

function ProductDetailPage({ item, setPage }) {
  const product = item || enrichedProducts[0];
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState('Small');
  useEffect(() => {
    setImageIndex(0);
  }, [product.id]);
  useEffect(() => {
    const timer = setInterval(() => setImageIndex((value) => (value + 1) % product.gallery.length), 2800);
    return () => clearInterval(timer);
  }, [product.id, product.gallery.length]);
  return <main className="pagePad">
    <button className="backBtn" onClick={() => { setPage('pizza'); window.scrollTo({top:0, behavior:'smooth'}); }}>← Back to Pizza</button>
    <section className="detailWrap">
      <div className="detailImages">
        <div className="mainProductImg"><img src={product.gallery[imageIndex]} alt={product.name}/>
          <button className="detailArrow left" onClick={() => setImageIndex((imageIndex - 1 + product.gallery.length) % product.gallery.length)}><ChevronLeft/></button>
          <button className="detailArrow right" onClick={() => setImageIndex((imageIndex + 1) % product.gallery.length)}><ChevronRight/></button>
        </div>
        <div className="thumbGrid">{product.gallery.map((img, idx) => <button key={img+idx} className={imageIndex===idx?'activeThumb':''} onClick={()=>setImageIndex(idx)}><img src={img} alt={`${product.name} ${idx+1}`}/></button>)}</div>
      </div>
      <div className="detailInfo">
        <p className="eyebrow">{product.type} • {product.tag}</p>
        <h1>{product.name}</h1>
        <p>{product.desc}</p>
        <h3>Select Size</h3>
        <div className="sizeSelect">{Object.entries(prices).map(([s, price]) => <button key={s} className={size===s?'activeSize':''} onClick={()=>setSize(s)}><span>{s}</span><b>${price}</b></button>)}</div>
        <BookingBox product={product} size={size} />
      </div>
    </section>
  </main>;
}

function MenuPage() {
  return <main className="pagePad"><section className="pageHero"><p className="eyebrow">Complete Menu</p><h1>Desi Curry Pizza Menu</h1><p>Simple price structure for pizza and pasta sizes.</p></section>
    <div className="menuBox"><h2>Prices</h2><div className="menuPrices">{Object.entries(prices).map(([s,p]) => <span key={s}>{s} — <b>${p}</b></span>)}</div></div>
    <div className="menuColumns"><MenuList title="Chicken Pizzas" items={enrichedProducts.filter(p=>p.type==='Non-Veg').map(p=>p.name)}/><MenuList title="Veg Pizzas" items={enrichedProducts.filter(p=>p.type==='Veg').map(p=>p.name)}/><MenuList title="Pasta" items={enrichedProducts.filter(p=>p.type==='Pasta').map(p=>p.name)}/></div>
  </main>;
}
function MenuList({title, items}) { return <article className="menuList"><h3>{title}</h3>{items.map(x => <p key={x}>🍕 {x}</p>)}</article> }

function AboutPage() {
  return <main className="pagePad"><section className="pageHero"><p className="eyebrow">About Us</p><h1>About Desi Curry Pizza</h1><p>Desi Curry Pizza is built around a simple idea: combine the comfort of pizza with the taste of Indian spices.</p></section>
    <section className="contentCard"><h2>Our Story</h2><p>Desi Curry Pizza brings Indian flavour and classic pizza comfort together for customers in South Plainfield, New Jersey. Our menu includes rich chicken favourites, paneer specials, garden vegetable options and pasta choices made for families, students and food lovers who enjoy bold taste.</p><p>Every item is presented with simple size options so customers can quickly choose Small, Medium, Large or X-Large and send the order through WhatsApp without confusion.</p><p>From butter chicken and tandoori flavours to palak paneer and veggie works, our focus is on fresh taste, easy ordering and a friendly local experience. Customers can use the website to view the menu, check location, contact the store and share full delivery details directly.</p><p>We aim to make ordering simple: select your favourite item, choose size, add address, confirm delivery charge if applicable, and send the complete details to WhatsApp.</p></section>
  </main>;
}

function ContactPage() {
  return <main className="pagePad"><section className="pageHero"><p className="eyebrow">Contact</p><h1>Visit or order from Desi Curry Pizza</h1><p>Use WhatsApp booking or location map for quick directions.</p></section>
    <section className="contactGrid"><div className="contentCard"><h2>Contact Details</h2><p><Phone size={18}/> {PHONE_DISPLAY}</p><p><MapPin size={18}/> {ADDRESS}</p><p><Clock size={18}/> Contact for current timings and availability.</p><div className="ctaRow"><a href={whatsappText()} target="_blank">WhatsApp Order</a><a href={`tel:${PHONE}`}>Call Now</a></div></div><iframe title="Desi Curry Pizza Location" src={mapSrc} loading="lazy"></iframe></section>
  </main>;
}

function PolicyPage({ type }) {
  const isTerms = type === 'terms';
  return <main className="pagePad"><section className="pageHero"><p className="eyebrow">{isTerms ? 'Terms & Conditions' : 'Privacy Policy'}</p><h1>{isTerms ? 'Terms & Conditions' : 'Privacy Policy'}</h1><p>Information related to browsing, ordering and contacting Desi Curry Pizza.</p></section>
    <section className="contentCard policy"><h2>{isTerms ? 'Website and Order Terms' : 'Customer Privacy Information'}</h2>
    {isTerms ? <><p>By using the Desi Curry Pizza website, customers agree to browse menu information, prices, location details and ordering options for personal use only. Menu items, prices and availability may change based on store updates, ingredient availability and business decisions.</p><p>Orders placed through WhatsApp or phone are handled directly between the customer and Desi Curry Pizza. Customers should confirm item name, size, quantity, price, pickup or delivery details and payment method before finalizing the order.</p><p>Images shown on the website are used for presentation and menu display purposes. Actual food appearance may vary based on preparation, toppings, size and packaging. The website is intended to provide a convenient digital menu and contact experience.</p><p>Desi Curry Pizza is not responsible for delays caused by incorrect customer details, unavailable items, network issues, third-party messaging problems or map direction errors. Customers are requested to verify order details before confirming.</p></> : <><p>Desi Curry Pizza respects customer privacy. This React website does not include a backend database, login system or online payment gateway. Customers may contact the business through WhatsApp, phone or map directions.</p><p>When customers message through WhatsApp, details such as name, phone number, selected item, address or order notes may be shared directly with the business for order communication only.</p><p>The website may use external services such as Google Maps for location display and image links for visual presentation. These services may follow their own privacy and cookie practices.</p><p>Customer information shared for order purposes should be used only to process enquiries, confirm orders, provide directions and improve service communication.</p></>}
    </section></main>;
}

function BottomNav({ page, setPage }) {
  const nav = [['home', Home, 'Home'], ['pizza', Pizza, 'Pizza'], ['menu', Menu, 'Menu'], ['contact', Phone, 'Contact']];
  return <nav className="bottomNav">{nav.map(([id, Icon, label]) => <button className={page === id ? 'activeBottom' : ''} onClick={() => {setPage(id); window.scrollTo({top:0, behavior:'smooth'});}} key={id}><Icon size={21}/><span>{label}</span></button>)}</nav>;
}

function Footer({ setPage }) {
  return <footer><div className="footerBrand">🍕 Desi Curry Pizza</div><p>1713 Park Avenue, South Plainfield, New Jersey</p><p>Copyright © 2026 Desi Curry Pizza | All rights reserved.</p><p>Powered by VJ Marketing Company</p><div className="policyLinks"><button onClick={() => { setPage('terms'); window.scrollTo({top:0, behavior:'smooth'}); }}><FileText size={16}/> Terms & Conditions</button><button onClick={() => { setPage('privacy'); window.scrollTo({top:0, behavior:'smooth'}); }}><ShieldCheck size={16}/> Privacy Policy</button></div></footer>;
}

function App() {
  const [page, setPage] = useState('home');
  const [selected, setSelected] = useState(null);
  return <><Header page={page} setPage={setPage} setSelected={setSelected}/><GlobalSearch setPage={setPage} setSelected={setSelected}/>{page === 'home' && <HomePage setPage={setPage}/>} {page === 'pizza' && <PizzaPage setPage={setPage} setSelected={setSelected}/>} {page === 'detail' && <ProductDetailPage item={selected} setPage={setPage}/>} {page === 'menu' && <MenuPage/>} {page === 'about' && <AboutPage/>} {page === 'contact' && <ContactPage/>} {page === 'terms' && <PolicyPage type="terms"/>} {page === 'privacy' && <PolicyPage type="privacy"/>}<Footer setPage={setPage}/><BottomNav page={page} setPage={setPage}/><a className="floatWhats" href={whatsappText()} target="_blank"><MessageCircle/></a></>;
}

createRoot(document.getElementById('root')).render(<App />);
