const products = [
  {id:1,title:"Classic Lamp",category:"home",price:29.99,rating:4.2,desc:"Warm LED lamp"},
  {id:2,title:"Noise-Cancel Headphones",category:"audio",price:129.99,rating:4.7,desc:"Comfort + clarity"},
  {id:3,title:"Ceramic Mug",category:"kitchen",price:12.5,rating:4.1,desc:"Handmade finish"},
  {id:4,title:"Bluetooth Speaker",category:"audio",price:59.99,rating:4.4,desc:"Portable & loud"},
  {id:5,title:"Desk Plant (Small)",category:"home",price:9.99,rating:4.3,desc:"Air-cleaning succulent"},
  {id:6,title:"Premium Chef Knife",category:"kitchen",price:79.99,rating:4.8,desc:"Precision steel"},
  {id:7,title:"Ergonomic Mouse",category:"tech",price:39.99,rating:4.5,desc:"Comfort for long work"},
  {id:8,title:"Travel Backpack",category:"travel",price:89.99,rating:4.6,desc:"Organized storage"},
];

const categorySel = document.getElementById('category');
const maxPrice = document.getElementById('maxPrice');
const sortBy = document.getElementById('sortBy');
const searchProd = document.getElementById('searchProd');
const grid = document.getElementById('grid');

function init(){
  const cats = Array.from(new Set(products.map(p=>p.category)));
  cats.forEach(c=>{
    const op = document.createElement('option');
    op.value = c; op.textContent = c[0].toUpperCase()+c.slice(1);
    categorySel.appendChild(op);
  });
  render();
}

function render(){
  let out = [...products];
  const cat = categorySel.value;
  const max = parseFloat(maxPrice.value);
  const q = (searchProd.value || '').toLowerCase();

  if(cat && cat !== 'all') out = out.filter(p => p.category === cat);
  if(!isNaN(max)) out = out.filter(p => p.price <= max);
  if(q) out = out.filter(p => (p.title + ' ' + p.desc).toLowerCase().includes(q));

  const sort = sortBy.value;
  if(sort === 'price-asc') out.sort((a,b)=>a.price-b.price);
  if(sort === 'price-desc') out.sort((a,b)=>b.price-a.price);
  if(sort === 'rating-desc') out.sort((a,b)=>b.rating-b.rating);

  grid.innerHTML = out.map(p => `
    <article class="product">
      <h4>${escape(p.title)}</h4>
      <div class="meta">${p.category} • Rating: ${p.rating}</div>
      <p class="muted">${escape(p.desc)}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
        <div class="price">$${p.price.toFixed(2)}</div>
        <a class="btn" href="#">Details</a>
      </div>
    </article>
  `).join('') || '<div class="muted">No products match your filters.</div>';
}

function escape(s){ return s ? s.replaceAll('<','&lt;').replaceAll('>','&gt;') : ''; }

categorySel.addEventListener('change', render);
maxPrice.addEventListener('input', render);
sortBy.addEventListener('change', render);
searchProd.addEventListener('input', render);

init();
