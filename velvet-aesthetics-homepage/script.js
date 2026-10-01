const services = [
  {id:'lip', name:'Lip Enhancement', category:'Aesthetics', key:'aesthetics', description:'Subtle definition and shape designed around your natural features.', price:150, duration:'30 min', image:'assets/lip-enhancement.jpg'},
  {id:'skin', name:'Skin Booster', category:'Aesthetics', key:'aesthetics', description:'A skin-focused treatment for a smoother, fresher appearance.', price:180, duration:'45 min', image:'assets/skin-booster.jpg'},
  {id:'signature', name:'Signature Teeth Whitening', category:'Teeth Whitening', key:'whitening', description:'A professional whitening treatment for a brighter-looking smile.', price:99, duration:'60 min', image:'assets/signature-whitening.jpg'},
  {id:'advanced', name:'Advanced Teeth Whitening', category:'Teeth Whitening', key:'whitening', description:'Our more comprehensive whitening experience.', price:149, duration:'75 min', image:'assets/advanced-whitening.jpg'},
  {id:'cheek', name:'Cheek Enhancement', category:'Aesthetics', key:'aesthetics', description:'Thoughtful contour and definition, tailored to you.', price:180, duration:'30 min', image:'assets/cheek-enhancement.jpg'},
  {id:'anti', name:'Anti-Wrinkle Treatment', category:'Aesthetics', key:'aesthetics', description:'A considered approach to a refreshed, rested appearance.', price:180, duration:'30 min', image:'assets/anti-wrinkle.jpg'},
  {id:'topup', name:'Whitening Top-Up', category:'Teeth Whitening', key:'whitening', description:'A simple way to keep your smile looking its best.', price:75, duration:'30 min', image:'assets/category-whitening.jpg'}
];
let cart = [];
const $ = s => document.querySelector(s);
const featured = services.slice(0,4), secondary = services.slice(4);
function card(s){return `<article class="service-card"><div class="service-image"><img src="${s.image}" alt="${s.name}" loading="lazy"><span class="service-tag">${s.category}</span></div><h3>${s.name}</h3><p>${s.description}</p><div class="service-meta"><span>From £${s.price}</span><span>${s.duration||'45 min'}</span></div><div class="service-bottom"><strong class="price">£${s.price}${s.name==='Anti-Wrinkle Treatment'?' from':''}</strong><button class="add-btn" data-add="${s.id}">Add to cart</button></div></article>`}
function renderGrids(filter='all'){
  const list = featured.filter(s=>filter==='all'||s.key===filter);
  $('#featuredGrid').innerHTML = list.map(card).join('');
  $('#secondaryGrid').innerHTML = secondary.map(card).join('');
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add)));
}
function addToCart(id){const found=cart.find(x=>x.id===id); if(found) found.qty++; else cart.push({id,qty:1}); const button=document.querySelector(`[data-add="${id}"]`); if(button){button.textContent='Added ✓';button.classList.add('added');setTimeout(()=>{button.textContent='Add to cart';button.classList.remove('added')},1300)} renderCart(); openCart(); const count=$('#cartCount');count.classList.remove('count-pop');void count.offsetWidth;count.classList.add('count-pop'); const t=$('#toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800)}
function renderCart(){
  const count=cart.reduce((a,x)=>a+x.qty,0); $('#cartCount').textContent=count; $('#drawerCount').textContent=`(${count})`;
  if(!cart.length){$('#cartItems').innerHTML='<div class="empty-cart"><span>✦</span><p>Your cart is waiting<br>for something beautiful.</p><a href="#treatments" id="browseLink">Browse treatments</a></div>'; $('#cartSubtotal').textContent='£0'; return}
  let total=0; $('#cartItems').innerHTML=cart.map(item=>{const s=services.find(x=>x.id===item.id); total+=s.price*item.qty; return `<div class="cart-item"><img src="${s.image}" alt=""><div><h4>${s.name}</h4><p>${s.category} · Qty ${item.qty}</p><strong>£${s.price*item.qty}</strong></div><button class="remove" data-remove="${s.id}" aria-label="Remove ${s.name}">×</button></div>`}).join('');
  $('#cartSubtotal').textContent=`£${total}`; document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);renderCart()});
}
function openCart(){$('#cartDrawer').classList.add('open');$('#overlay').classList.add('open');document.body.style.overflow='hidden'}
function closeCart(){$('#cartDrawer').classList.remove('open');$('#overlay').classList.remove('open');document.body.style.overflow=''}
renderGrids(); renderCart();
$('#cartTrigger').onclick=openCart; $('#closeCart').onclick=closeCart; $('#overlay').onclick=closeCart;
$('#browseLink')?.addEventListener('click',closeCart); $('#checkoutBtn').onclick=()=>alert('Checkout is coming soon — your selection has been saved.');
$('#menuToggle').onclick=()=>$('#mobileMenu').classList.toggle('open'); document.querySelectorAll('.mobile-menu a').forEach(a=>a.onclick=()=>$('#mobileMenu').classList.remove('open'));
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderGrids(b.dataset.filter)});
const track=$('#testimonialTrack'), progress=$('#testimonialProgress'); let testimonialIndex=0; function moveTestimonial(dir){testimonialIndex=(testimonialIndex+dir+3)%3; track.scrollTo({left:track.children[testimonialIndex].offsetLeft-track.offsetLeft,behavior:'smooth'});progress.textContent=`0${testimonialIndex+1} / 03`} $('#nextTestimonial').onclick=()=>moveTestimonial(1);$('#prevTestimonial').onclick=()=>moveTestimonial(-1);
const heroSlides=[...document.querySelectorAll('.hero-slide')], heroDots=[...document.querySelectorAll('.hero-dots span')]; let heroIndex=0; function showHeroSlide(index){heroSlides[heroIndex].classList.remove('active');heroDots[heroIndex].classList.remove('active');heroIndex=index%heroSlides.length;heroSlides[heroIndex].classList.add('active');heroDots[heroIndex].classList.add('active')} heroDots.forEach((dot,index)=>dot.addEventListener('click',()=>showHeroSlide(index))); setInterval(()=>showHeroSlide(heroIndex+1),7000);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
