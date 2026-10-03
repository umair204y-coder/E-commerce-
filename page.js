/* =========================================================
   VELORA — script.js
   Product catalogue, cart (localStorage), rendering helpers,
   and per-page interactive behaviour.
   ========================================================= */

/* ---------- Icon library (inline SVG strings, stroke = currentColor) ---------- */
const ICONS = {
  headphones: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 34v-2a24 24 0 0 1 48 0v2"/><rect x="6" y="32" width="12" height="18" rx="4"/><rect x="46" y="32" width="12" height="18" rx="4"/></svg>`,
  watch: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="18" y="18" width="28" height="28" rx="6"/><path d="M24 18v-8h16v8M24 46v8h16v-8M32 26v8l6 4"/></svg>`,
  camera: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="18" width="48" height="34" rx="5"/><path d="M22 18l4-8h12l4 8"/><circle cx="32" cy="35" r="10"/></svg>`,
  speaker: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="16" y="6" width="32" height="52" rx="8"/><circle cx="32" cy="24" r="6"/><circle cx="32" cy="44" r="9"/></svg>`,
  bag: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22h40l-3 34H15z"/><path d="M22 22v-6a10 10 0 0 1 20 0v6"/></svg>`,
  sunglasses: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="34" r="10"/><circle cx="46" cy="34" r="10"/><path d="M28 32h8M8 30l6-8h6M56 30l-6-8h-6"/></svg>`,
  keyboard: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="18" width="52" height="30" rx="5"/><path d="M14 28h4M24 28h4M34 28h4M44 28h4M14 36h28M46 36h4"/></svg>`,
  mouse: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="20" y="8" width="24" height="48" rx="12"/><path d="M32 8v18"/></svg>`,
  lamp: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12h36l-8 18H22z"/><path d="M32 30v20M20 56h24"/></svg>`,
  drone: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="32" cy="32" r="8"/><path d="M12 12l14 14M52 12L38 26M12 52l14-14M52 52L38 38"/><circle cx="12" cy="12" r="5"/><circle cx="52" cy="12" r="5"/><circle cx="12" cy="52" r="5"/><circle cx="52" cy="52" r="5"/></svg>`,
  wallet: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="16" width="48" height="34" rx="6"/><path d="M8 26h48"/><circle cx="44" cy="38" r="3"/></svg>`,
  bottle: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M26 8h12v10l6 8v28a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V26l6-8z"/><path d="M20 34h24"/></svg>`,
  backpack: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 26a14 14 0 0 1 28 0v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z"/><path d="M24 10h16v10H24zM22 38h20M26 26v8"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="14" height="11"/><path d="M15 9h4l3 4v4h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5z"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>`,
  headset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13a9 9 0 0 1 18 0"/><rect x="2" y="13" width="5" height="7" rx="2"/><rect x="17" y="13" width="5" height="7" rx="2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7.4 7-12.5A7 7 0 0 0 5 9.5C5 14.6 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.7 2z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  dumbbell: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="24" width="8" height="16" rx="2"/><rect x="50" y="24" width="8" height="16" rx="2"/><rect x="14" y="28" width="6" height="8"/><rect x="44" y="28" width="6" height="8"/><path d="M20 32h24"/></svg>`,
  bulb: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 26a10 10 0 1 1 20 0c0 5-3 7-4 10H26c-1-3-4-5-4-10z"/><path d="M26 44h12M28 50h8"/></svg>`,
  gamepad: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="20" width="48" height="26" rx="12"/><path d="M20 28v10M15 33h10"/><circle cx="42" cy="30" r="2.5"/><circle cx="48" cy="36" r="2.5"/></svg>`,
  coffeemaker: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22h30v20a8 8 0 0 1-8 8H22a8 8 0 0 1-8-8z"/><path d="M44 26h4a6 6 0 0 1 0 12h-4M22 12v6M32 12v6"/></svg>`,
  sneaker: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 42c0-6 6-10 12-14l10-8 6 6 12-2 12 10v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M28 20l4 8M18 42v-6M30 42v-6"/></svg>`,
  chair: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10v26h28V10"/><path d="M16 36h32l-4 18h-4l-1-8H25l-1 8h-4z"/></svg>`,
  tablet: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="6" width="36" height="52" rx="5"/><path d="M28 50h8"/></svg>`
};

/* ---------- Product catalogue ---------- */
let PRODUCTS = [
  { id:1,  name:"Aero Wireless Headphones",   cat:"Audio",        price:14999, old:18999, icon:"headphones", art:"art-1", rating:4.8, badge:"Sale",   desc:"Adaptive noise cancellation, 40-hour battery life, and plush memory-foam ear cushions built for all-day listening." },
  { id:2,  name:"Pulse Fitness Watch",        cat:"Wearables",    price:11499, old:null,  icon:"watch",      art:"art-2", rating:4.6, badge:"New",    desc:"Track heart rate, sleep and 20+ workouts with a always-on AMOLED display and 10-day battery." },
  { id:3,  name:"Frame X Mirrorless Camera",  cat:"Cameras",      price:89999, old:99999, icon:"camera",     art:"art-3", rating:4.9, badge:"Sale",   desc:"24MP sensor, in-body stabilization, and 4K60 video in a body light enough to carry everywhere." },
  { id:4,  name:"Orbit Smart Speaker",        cat:"Audio",        price:8999,  old:null,  icon:"speaker",    art:"art-4", rating:4.5, badge:null,     desc:"Room-filling 360° sound with voice assistant support and multi-room pairing." },
  { id:5,  name:"Nomad Leather Tote",         cat:"Bags",         price:6499,  old:7999,  icon:"bag",        art:"art-5", rating:4.7, badge:"Sale",   desc:"Full-grain leather tote with a padded 15-inch laptop sleeve and brass hardware." },
  { id:6,  name:"Horizon Polarized Shades",   cat:"Accessories",  price:3299,  old:null,  icon:"sunglasses", art:"art-6", rating:4.4, badge:null,     desc:"UV400 polarized lenses in a lightweight titanium frame that folds flat." },
  { id:7,  name:"Cascade Mechanical Keyboard",cat:"Computing",    price:9999,  old:12499, icon:"keyboard",   art:"art-1", rating:4.8, badge:"Sale",   desc:"Hot-swappable switches, per-key RGB, and a CNC aluminium frame for a satisfying typing feel." },
  { id:8,  name:"Glide Wireless Mouse",       cat:"Computing",    price:4499,  old:null,  icon:"mouse",      art:"art-2", rating:4.6, badge:null,     desc:"Ergonomic sculpted body with an 8000 DPI sensor and silent-click switches." },
  { id:9,  name:"Lumen Desk Lamp",            cat:"Home Tech",    price:5299,  old:null,  icon:"lamp",       art:"art-3", rating:4.5, badge:"New",    desc:"Tunable warm-to-cool LED with touch dimming and a wireless charging base." },
  { id:10, name:"Skyline Mini Drone",         cat:"Cameras",      price:24999, old:27999, icon:"drone",      art:"art-4", rating:4.7, badge:"Sale",   desc:"4K stabilized camera, 30-minute flight time, and one-tap cinematic shot modes." },
  { id:11, name:"Fold Slim Wallet",           cat:"Accessories",  price:2499,  old:null,  icon:"wallet",     art:"art-5", rating:4.3, badge:null,     desc:"RFID-blocking aluminium wallet that holds up to 10 cards plus cash." },
  { id:12, name:"Hydra Insulated Bottle",     cat:"Accessories",  price:1899,  old:2299,  icon:"bottle",     art:"art-6", rating:4.6, badge:"Sale",   desc:"Double-wall stainless steel bottle that keeps drinks cold for 24 hours." },
  { id:13, name:"Trek Everyday Backpack",     cat:"Bags",         price:7299,  old:null,  icon:"backpack",   art:"art-1", rating:4.8, badge:"New",    desc:"Water-resistant 22L backpack with a dedicated laptop compartment and USB charging port." },
  { id:14, name:"Aero Pro Earbuds",           cat:"Audio",        price:9499,  old:10999, icon:"headphones", art:"art-2", rating:4.7, badge:"Sale",   desc:"True-wireless earbuds with active noise cancellation and a compact charging case." },
  { id:15, name:"Pulse Lite Band",            cat:"Wearables",    price:5999,  old:null,  icon:"watch",      art:"art-3", rating:4.2, badge:null,     desc:"A lightweight fitness band with 14-day battery life and sleep tracking." },
  { id:16, name:"Beacon Portable Speaker",    cat:"Audio",        price:6799,  old:null,  icon:"speaker",    art:"art-4", rating:4.5, badge:"New",    desc:"Pocket-sized speaker with 12-hour playtime and IP67 water resistance." },
  { id:17, name:"Brew Master Coffee Maker",   cat:"Kitchen Tech", price:13499, old:15999, icon:"coffeemaker",art:"art-5", rating:4.6, badge:"Sale",   desc:"Programmable drip coffee maker with a built-in grinder and thermal carafe that keeps coffee hot for hours." },
  { id:18, name:"Flex Adjustable Dumbbells",  cat:"Fitness",      price:16999, old:null,  icon:"dumbbell",   art:"art-6", rating:4.7, badge:"New",    desc:"Space-saving adjustable dumbbell pair, 5–25kg per side, with a quick-turn weight selector dial." },
  { id:19, name:"Tablet Air 11-inch",         cat:"Computing",    price:64999, old:69999, icon:"tablet",     art:"art-1", rating:4.8, badge:"Sale",   desc:"Slim 11-inch tablet with a bright display, all-day battery, and stylus support for notes and sketching." },
  { id:20, name:"Zenith Pro Controller",      cat:"Gaming",       price:8999,  old:null,  icon:"gamepad",    art:"art-2", rating:4.6, badge:"New",    desc:"Wireless controller with customizable back paddles, hall-effect sticks, and 20-hour battery life." },
  { id:21, name:"Aura Smart Bulb Kit",        cat:"Smart Home",   price:4999,  old:5999,  icon:"bulb",       art:"art-3", rating:4.4, badge:"Sale",   desc:"Pack of 3 color-changing smart bulbs, controllable by app or voice, with schedules and scenes." },
  { id:22, name:"Stride Running Shoes",       cat:"Fitness",      price:8499,  old:null,  icon:"sneaker",    art:"art-4", rating:4.5, badge:null,     desc:"Breathable knit running shoes with responsive cushioning built for daily training miles." },
  { id:23, name:"Comfort Ergo Chair",         cat:"Home Tech",    price:28999, old:32999, icon:"chair",      art:"art-5", rating:4.7, badge:"Sale",   desc:"Fully adjustable mesh-back office chair with lumbar support for long work sessions." },
  { id:24, name:"Pulse Pro Smartwatch",       cat:"Wearables",    price:18999, old:null,  icon:"watch",      art:"art-6", rating:4.8, badge:"New",    desc:"Premium smartwatch with GPS, blood-oxygen tracking, and a scratch-resistant sapphire face." },
  { id:25, name:"Voyage Travel Duffel",       cat:"Bags",         price:7999,  old:9499,  icon:"backpack",   art:"art-1", rating:4.6, badge:"Sale",   desc:"Weekend duffel with a separate shoe compartment and durable water-resistant fabric." },
  { id:26, name:"Clarity Blue-Light Glasses", cat:"Accessories",  price:2799,  old:null,  icon:"sunglasses", art:"art-2", rating:4.3, badge:null,     desc:"Lightweight frames with blue-light filtering lenses for screen-heavy workdays." }
];

const CUSTOM_PRODUCTS = [
  { id:101, name:"Lumina Pro Mirrorless Camera", cat:"Cameras", price:89999, old:104999, icon:"camera", art:"art-3", rating:4.8, badge:"New", desc:"A full-featured mirrorless camera with a sharp sensor, fast autofocus, and a compact body for travel and everyday photography.", image:"https://cdn.mos.cms.futurecdn.net/bGxbZsNRh3JGtjiaqWVFgR.jpg", stock:12 },
  { id:102, name:"Aura Compact Camera", cat:"Cameras", price:4999, old:null, icon:"camera", art:"art-5", rating:4.6, badge:"New", desc:"A practical compact camera with a clean design for everyday photography and travel.", image:"https://th.bing.com/th/id/OIP.C-zzuRZvCh5i-Mg3EXtPuQHaHa?w=182&h=183&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", stock:20 }
];

PRODUCTS = PRODUCTS.concat(CUSTOM_PRODUCTS);
const CURATED_PRODUCTS = PRODUCTS.slice();
let CATS = [...new Set(PRODUCTS.map(p=>p.cat))];

const PRODUCTS_API = "https://dummyjson.com/products?limit=100";
const CATEGORY_ICONS = {
  beauty:"bulb", fragrances:"bottle", furniture:"chair", groceries:"bag",
  "home-decoration":"lamp", "kitchen-accessories":"coffeemaker", laptops:"tablet",
  "mens-shirts":"bag", "mens-shoes":"sneaker", "mens-watches":"watch", "mobile-accessories":"tablet",
  motorcycle:"drone", "skin-care":"bulb", smartphones:"tablet", "sports-accessories":"dumbbell",
  sunglasses:"sunglasses", tablets:"tablet", tops:"bag", vehicle:"drone", "womens-bags":"bag",
  "womens-dresses":"bag", "womens-jewellery":"watch", "womens-shoes":"sneaker", "womens-watches":"watch"
};

function titleCase(value){
  return value.split("-").map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
}

function normalizeProduct(product){
  const price = Math.round(product.price * 280);
  const old = product.discountPercentage ? Math.round(price / (1 - product.discountPercentage / 100)) : null;
  return {
    id: 1000 + product.id,
    name: product.title,
    cat: titleCase(product.category),
    price,
    old,
    icon: CATEGORY_ICONS[product.category] || "bag",
    art: `art-${(product.id % 6) + 1}`,
    rating: Number(product.rating.toFixed(1)),
    badge: product.discountPercentage >= 10 ? "Sale" : product.id <= 8 ? "New" : null,
    desc: product.description,
    image: product.thumbnail,
    stock: product.stock
  };
}

async function loadProducts(){
  try{
    const response = await fetch(PRODUCTS_API);
    if(!response.ok) throw new Error(`Product API returned ${response.status}`);
    const data = await response.json();
    const liveProducts = data.products.map(normalizeProduct);
    if(!liveProducts.length) throw new Error("Product API returned no products");
    PRODUCTS = CURATED_PRODUCTS.concat(liveProducts);
    CATS = [...new Set(PRODUCTS.map(p=>p.cat))];
  }catch(error){
    console.warn("Live products unavailable; using the local catalogue.", error);
  }
}

/* ---------- Helpers ---------- */
function money(n){ return "PKR " + n.toLocaleString("en-PK"); }
function getParam(name){ return new URLSearchParams(window.location.search).get(name); }
function iconSVG(key,color){ return ICONS[key] || ""; }
function starRow(rating){
  let s = "";
  for(let i=0;i<5;i++){ s += ICONS.star; }
  return `<span class="product-rating">${s}<span>${rating}</span></span>`;
}

/* ---------- Cart (localStorage) ---------- */
const CART_KEY = "velora_cart_v1";
function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id, qty=1){
  const cart = getCart();
  const existing = cart.find(i=>i.id===id);
  if(existing){ existing.qty += qty; } else { cart.push({id, qty}); }
  saveCart(cart);
  showToast("Item added to your cart");
}
function removeFromCart(id){
  saveCart(getCart().filter(i=>i.id!==id));
  if(document.getElementById("cartTableBody")) renderCartPage();
}
function updateQty(id, qty){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(item){ item.qty = Math.max(1, qty); }
  saveCart(cart);
  if(document.getElementById("cartTableBody")) renderCartPage();
}
function cartTotalCount(){
  return getCart().reduce((sum,i)=>sum+i.qty,0);
}
function cartSubtotal(){
  const cart = getCart();
  return cart.reduce((sum,i)=>{
    const p = PRODUCTS.find(p=>p.id===i.id);
    return p ? sum + p.price*i.qty : sum;
  },0);
}
function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el=>{ el.textContent = cartTotalCount(); });
}

/* ---------- Wishlist (localStorage, simple toggle) ---------- */
const WISH_KEY = "velora_wish_v1";
function getWish(){ try{ return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }catch(e){ return []; } }
function toggleWish(id, btn){
  let wish = getWish();
  if(wish.includes(id)){ wish = wish.filter(w=>w!==id); btn.classList.remove("active"); }
  else{ wish.push(id); btn.classList.add("active"); }
  localStorage.setItem(WISH_KEY, JSON.stringify(wish));
}

/* ---------- Toast ---------- */
function showToast(msg){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `${ICONS.check}<span></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector("span").textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>toast.classList.remove("show"), 2400);
}

/* ---------- Product card renderer ---------- */
function productCardHTML(p){
  const wish = getWish().includes(p.id) ? "active" : "";
  return `
  <div class="product-card">
    <div class="product-media ${p.art}" style="color:var(--accent)">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <button class="wish-btn ${wish}" aria-label="Add to wishlist" onclick="toggleWish(${p.id}, this)">${ICONS.heart}</button>
      <a href="product.html?id=${p.id}">${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : iconSVG(p.icon)}</a>
    </div>
    <div class="product-info">
      <span class="product-cat">${p.cat}</span>
      <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      ${starRow(p.rating)}
      <div class="product-bottom">
        <span class="price">${money(p.price)}${p.old ? `<span class="old">${money(p.old)}</span>` : ""}</span>
        <button class="add-btn" aria-label="Add to cart" onclick="addToCart(${p.id})">${ICONS.plus}</button>
      </div>
    </div>
  </div>`;
}

function renderGrid(containerId, items){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = items.map(productCardHTML).join("");
}

/* ---------- Header / nav shared behaviour ---------- */
function initHeader(){
  updateCartCount();
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if(toggle && nav){
    toggle.addEventListener("click", ()=> nav.classList.toggle("open"));
  }
  // header search -> shop page
  const searchInput = document.querySelector(".search-box input");
  if(searchInput){
    searchInput.addEventListener("keydown", e=>{
      if(e.key === "Enter" && searchInput.value.trim()){
        window.location.href = "shop.html?q=" + encodeURIComponent(searchInput.value.trim());
      }
    });
  }
  // newsletter forms (no backend — just confirm)
  document.querySelectorAll(".newsletter-form").forEach(form=>{
    form.addEventListener("submit", e=>{
      e.preventDefault();
      showToast("Thanks — you're subscribed!");
      form.reset();
    });
  });
}

/* ---------- HOME PAGE ---------- */
function initHomePage(){
  const bestsellers = [...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0,8);
  renderGrid("bestsellerGrid", bestsellers);
  const newArrivals = PRODUCTS.filter(p=>p.badge==="New").slice(0,4);
  renderGrid("newArrivalGrid", newArrivals.length ? newArrivals : PRODUCTS.slice(0,4));
}

/* ---------- SHOP PAGE ---------- */
let shopState = { cats:new Set(), sort:"featured", max:100000, q:"" };
function initShopPage(){
  const q = getParam("q");
  if(q) shopState.q = q.toLowerCase();

  const catWrap = document.getElementById("catFilters");
  if(catWrap){
    catWrap.innerHTML = CATS.map(c=>`
      <label class="filter-option">
        <input type="checkbox" value="${c}" onchange="onShopFilterChange(this)">
        ${c}
      </label>`).join("");
  }
  const priceRange = document.getElementById("priceRange");
  const priceOut = document.getElementById("priceRangeVal");
  if(priceRange){
    priceRange.addEventListener("input", ()=>{
      shopState.max = Number(priceRange.value);
      priceOut.textContent = money(shopState.max);
      applyShopFilters();
    });
  }
  const sortSel = document.getElementById("sortSelect");
  if(sortSel){
    sortSel.addEventListener("change", ()=>{ shopState.sort = sortSel.value; applyShopFilters(); });
  }
  const searchBox = document.getElementById("shopSearch");
  if(searchBox){
    searchBox.value = shopState.q;
    searchBox.addEventListener("input", ()=>{ shopState.q = searchBox.value.toLowerCase(); applyShopFilters(); });
  }
  applyShopFilters();
}
function onShopFilterChange(input){
  if(input.checked) shopState.cats.add(input.value);
  else shopState.cats.delete(input.value);
  applyShopFilters();
}
function applyShopFilters(){
  let items = PRODUCTS.filter(p=>{
    const catOk = shopState.cats.size === 0 || shopState.cats.has(p.cat);
    const priceOk = p.price <= shopState.max;
    const searchOk = !shopState.q || p.name.toLowerCase().includes(shopState.q) || p.cat.toLowerCase().includes(shopState.q);
    return catOk && priceOk && searchOk;
  });
  if(shopState.sort === "price-low") items.sort((a,b)=>a.price-b.price);
  else if(shopState.sort === "price-high") items.sort((a,b)=>b.price-a.price);
  else if(shopState.sort === "rating") items.sort((a,b)=>b.rating-a.rating);

  renderGrid("shopGrid", items);
  const countEl = document.getElementById("resultCount");
  if(countEl) countEl.textContent = `${items.length} product${items.length!==1?"s":""} found`;
  if(items.length === 0){
    document.getElementById("shopGrid").innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:60px 0; color:var(--muted);">No products match your filters. Try widening your search.</p>`;
  }
}

/* ---------- PRODUCT DETAIL PAGE ---------- */
function initProductPage(){
  const id = Number(getParam("id")) || PRODUCTS[0].id;
  const p = PRODUCTS.find(p=>p.id===id) || PRODUCTS[0];

  document.title = p.name + " — VELORA";
  document.getElementById("pdCat").textContent = p.name;
  if(document.getElementById("pdCatLabel")) document.getElementById("pdCatLabel").textContent = p.cat;
  document.getElementById("pdTitle").textContent = p.name;
  document.getElementById("pdRating").innerHTML = starRow(p.rating) + `<span style="margin-left:8px;color:var(--muted)">(128 reviews)</span>`;
  document.getElementById("pdPrice").innerHTML = money(p.price) + (p.old ? `<span class="old">${money(p.old)}</span>` : "");
  document.getElementById("pdDesc").textContent = p.desc;
  if(document.getElementById("tabDescText")) document.getElementById("tabDescText").textContent = p.desc + " Every VELORA product ships quality-checked and backed by our 1-year limited warranty.";
  document.getElementById("pdMainMedia").className = "pd-gallery-main " + p.art;
  document.getElementById("pdMainMedia").innerHTML = p.image ? `<img src="${p.image}" alt="${p.name}">` : iconSVG(p.icon);
  document.getElementById("pdMainMedia").style.color = "var(--accent)";
  document.querySelectorAll(".thumb").forEach((t,i)=>{
    t.className = "thumb" + (i===0 ? " active" : "");
    t.innerHTML = p.image ? `<img src="${p.image}" alt="${p.name}">` : iconSVG(p.icon);
    t.style.color = "var(--accent)";
    t.onclick = ()=>{ document.querySelectorAll(".thumb").forEach(x=>x.classList.remove("active")); t.classList.add("active"); };
  });
  document.getElementById("specCat").textContent = p.cat;
  document.getElementById("specSku").textContent = "VLR-" + String(p.id).padStart(4,"0");

  let qty = 1;
  const qtyEl = document.getElementById("qtyVal");
  document.getElementById("qtyMinus").onclick = ()=>{ qty = Math.max(1, qty-1); qtyEl.textContent = qty; };
  document.getElementById("qtyPlus").onclick = ()=>{ qty += 1; qtyEl.textContent = qty; };
  document.getElementById("addToCartBtn").onclick = ()=> addToCart(p.id, qty);
  document.getElementById("buyNowBtn").onclick = ()=>{ addToCart(p.id, qty); window.location.href = "cart.html"; };

  const wishBtn = document.getElementById("pdWishBtn");
  if(getWish().includes(p.id)) wishBtn.classList.add("active");
  wishBtn.onclick = ()=> toggleWish(p.id, wishBtn);

  // related products: same category, excluding current
  const related = PRODUCTS.filter(r=>r.cat===p.cat && r.id!==p.id).slice(0,4);
  renderGrid("relatedGrid", related.length ? related : PRODUCTS.filter(r=>r.id!==p.id).slice(0,4));

  // tabs
  document.querySelectorAll(".tab-head").forEach(head=>{
    head.addEventListener("click", ()=>{
      document.querySelectorAll(".tab-head").forEach(h=>h.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(pnl=>pnl.classList.remove("active"));
      head.classList.add("active");
      document.getElementById(head.dataset.tab).classList.add("active");
    });
  });
}

/* ---------- CART PAGE ---------- */
function renderCartPage(){
  const cart = getCart();
  const body = document.getElementById("cartTableBody");
  const emptyState = document.getElementById("cartEmpty");
  const cartWrap = document.getElementById("cartFilled");
  if(!body) return;

  if(cart.length === 0){
    if(cartWrap) cartWrap.style.display = "none";
    if(emptyState) emptyState.style.display = "block";
    return;
  }
  if(cartWrap) cartWrap.style.display = "";
  if(emptyState) emptyState.style.display = "none";

  body.innerHTML = cart.map(item=>{
    const p = PRODUCTS.find(p=>p.id===item.id);
    if(!p) return "";
    return `
    <tr>
      <td>
        <div class="cart-item-info">
          <div class="cart-thumb ${p.art}" style="color:var(--accent)">${iconSVG(p.icon)}</div>
          <div>
            <strong>${p.name}</strong>
            <span>${p.cat}</span><br>
            <a href="#" class="remove-link" onclick="removeFromCart(${p.id});return false;">Remove</a>
          </div>
        </div>
      </td>
      <td>${money(p.price)}</td>
      <td>
        <div class="qty-control">
          <button onclick="updateQty(${p.id}, ${item.qty-1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${p.id}, ${item.qty+1})">+</button>
        </div>
      </td>
      <td><strong>${money(p.price*item.qty)}</strong></td>
    </tr>`;
  }).join("");

  const subtotal = cartSubtotal();
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shipping;
  document.getElementById("sumSubtotal").textContent = money(subtotal);
  document.getElementById("sumShipping").textContent = shipping === 0 ? "Free" : money(shipping);
  document.getElementById("sumTotal").textContent = money(total);
}

function initCartPage(){
  renderCartPage();
  const promoBtn = document.getElementById("promoBtn");
  if(promoBtn){
    promoBtn.addEventListener("click", ()=>{
      const val = document.getElementById("promoInput").value.trim().toUpperCase();
      if(val === "VELORA10"){ showToast("Promo applied — 10% off at checkout"); }
      else if(val){ showToast("That promo code isn't valid"); }
    });
  }
}

/* ---------- CHECKOUT PAGE ---------- */
function initCheckoutPage(){
  const cart = getCart();
  const listEl = document.getElementById("checkoutItems");
  if(listEl){
    listEl.innerHTML = cart.map(item=>{
      const p = PRODUCTS.find(p=>p.id===item.id);
      if(!p) return "";
      return `<div class="order-review-item"><span>${p.name} × ${item.qty}</span><span>${money(p.price*item.qty)}</span></div>`;
    }).join("") || `<p style="color:var(--muted);font-size:.85rem;">Your cart is empty.</p>`;
  }
  const subtotal = cartSubtotal();
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shipping;
  if(document.getElementById("coSubtotal")) document.getElementById("coSubtotal").textContent = money(subtotal);
  if(document.getElementById("coShipping")) document.getElementById("coShipping").textContent = shipping === 0 ? "Free" : money(shipping);
  if(document.getElementById("coTotal")) document.getElementById("coTotal").textContent = money(total);

  document.querySelectorAll(".pay-option").forEach(opt=>{
    opt.addEventListener("click", ()=>{
      document.querySelectorAll(".pay-option").forEach(o=>o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input").checked = true;
    });
  });

  const form = document.getElementById("checkoutForm");
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      if(cart.length === 0){ showToast("Your cart is empty"); return; }
      if(!form.checkValidity()){ form.reportValidity(); return; }
      document.getElementById("checkoutFormsWrap").style.display = "none";
      document.getElementById("orderSuccess").style.display = "block";
      const orderNum = "VLR" + Math.floor(100000 + Math.random()*899999);
      document.getElementById("orderNumber").textContent = orderNum;
      saveCart([]);
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }
}

/* ---------- FAQ PAGE ---------- */
function initFaqPage(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    item.querySelector(".faq-q").addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("open"));
      if(!isOpen) item.classList.add("open");
    });
  });
  document.querySelectorAll(".faq-cat-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      document.querySelectorAll(".faq-cat-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      document.querySelectorAll(".faq-item").forEach(item=>{
        item.style.display = (cat === "all" || item.dataset.cat === cat) ? "" : "none";
      });
    });
  });
}

/* ---------- CONTACT PAGE ---------- */
function initContactPage(){
  const form = document.getElementById("contactForm");
  if(form){
    form.addEventListener("submit", e=>{
      e.preventDefault();
      showToast("Message sent — we'll reply within 24 hours");
      form.reset();
    });
  }
}

/* ---------- Init on DOM ready ---------- */
document.addEventListener("DOMContentLoaded", async ()=>{
  initHeader();
  await loadProducts();
  const page = document.body.dataset.page;
  if(page === "home") initHomePage();
  if(page === "shop") initShopPage();
  if(page === "product") initProductPage();
  if(page === "cart") initCartPage();
  if(page === "checkout") initCheckoutPage();
  if(page === "faq") initFaqPage();
  if(page === "contact") initContactPage();
});