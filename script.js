// Frontend MVP: catalog with filters, search, and simple lead form (localStorage only)
let cars = [
  { id:1, make:'Toyota', model:'Camry', year:2020, price:21000, image:'https://images.unsplash.com/photo-1524648310150-2e8b1f15f3a0', description:'Седан, отличный ухоженный салон', mileage: 45000, location:'Москва', status:'Доступен' },
  { id:2, make:'Tesla', model:'Model 3', year:2021, price:38950, image:'https://images.unsplash.com/photo-1549921296-3ecb3f8b3b3d', description:'Электромобиль, полный набор опций', mileage: 12000, location:'Москва', status:'Доступен' },
  { id:3, make:'Mercedes', model:'E-Class', year:2019, price:32000, image:'https://images.unsplash.com/photo-1600585154340-9abbd0e12a2a', description:'Комфорт, кожа, панорамная крыша', mileage: 60000, location:'Москва', status:'Продано' },
  { id:4, make:'BMW', model:'3 Series', year:2018, price:27000, image:'https://images.unsplash.com/photo-1511918984145-48de785d8b6a', description:'Спорт и роскошь', mileage: 78000, location:'Москва', status:'Доступен' },
];

function renderCatalog(list){
  const container = document.getElementById('catalog-grid');
  container.innerHTML = '';
  list.forEach(car => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}" onerror="this.src='https://placehold.co/600x400?text=No+Photo'"> 
      <div class="info">
        <h3>${car.make} ${car.model} ${car.year}</h3>
        <p class="desc">${car.description}</p>
        <p>Пробег: ${car.mileage} км • Локация: ${car.location} • Статус: ${car.status}</p>
        <p class="price">${car.price.toLocaleString()} ₽</p>
        <button class="btn" onclick="openLeadModal(${car.id})">Оставить заявку</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function getUniqueMakes(){
  const makes = new Set(cars.map(c => c.make));
  return Array.from(makes).sort();
}

function populateMakeFilter(){
  const sel = document.getElementById('filter-make');
  if(!sel) return;
  getUniqueMakes().forEach(m => {
    const o = document.createElement('option');
    o.value = m;
    o.textContent = m;
    sel.appendChild(o);
  });
}

function applyFilters(){
  const make = document.getElementById('filter-make').value;
  const modelQuery = document.getElementById('search-model').value.toLowerCase();
  const yearMin = parseInt(document.getElementById('year-min').value) || 0;
  const yearMax = parseInt(document.getElementById('year-max').value) || 9999;
  const priceMin = parseInt(document.getElementById('price-min').value) || 0;
  const priceMax = parseInt(document.getElementById('price-max').value) || Infinity;
  
  const filtered = cars.filter(c => {
    if(make && c.make !== make) return false;
    if(yearMin && c.year < yearMin) return false;
    if(yearMax && c.year > yearMax) return false;
    if(c.price < priceMin || c.price > priceMax) return false;
    if(modelQuery && !(`${c.make} ${c.model}`.toLowerCase().includes(modelQuery))) return false;
    return true;
  });
  renderCatalog(filtered);
}

function clearFilters(){
  document.getElementById('filter-make').value = '';
  document.getElementById('search-model').value = '';
  document.getElementById('year-min').value = '';
  document.getElementById('year-max').value = '';
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';
  renderCatalog(cars);
}

function openLeadModal(carId){
  document.getElementById('lead-modal').style.display = 'flex';
  document.getElementById('lead-name').value = '';
  document.getElementById('lead-phone').value = '';
  // store car id if needed for backend
  window.__lead_car = carId;
  return false;
}

function closeLeadModal(){
  document.getElementById('lead-modal').style.display = 'none';
}

function submitLead(e){
  e.preventDefault();
  const name = document.getElementById('lead-name').value;
  const phone = document.getElementById('lead-phone').value;
  if(!name || !phone){ alert('Пожалуйста, заполните ФИО и телефон'); return false; }
  const lead = { name, phone, car_id: window.__lead_car, date: new Date().toISOString() };
  const leads = JSON.parse(localStorage.getItem('car_leads') || '[]');
  leads.push(lead);
  localStorage.setItem('car_leads', JSON.stringify(leads));
  closeLeadModal();
  alert('Спасибо! Ваша заявка принята.');
  return false;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(cars);
  populateMakeFilter();
  document.getElementById('filter-make').addEventListener('change', applyFilters);
  document.getElementById('search-model').addEventListener('input', applyFilters);
  document.getElementById('year-min').addEventListener('change', applyFilters);
  document.getElementById('year-max').addEventListener('change', applyFilters);
  document.getElementById('price-min').addEventListener('change', applyFilters);
  document.getElementById('price-max').addEventListener('change', applyFilters);
  document.getElementById('clear-filters').addEventListener('click', clearFilters);
  document.querySelectorAll('[data-action="openLeadModal"]').forEach(b => b.addEventListener('click', () => openLeadModal(null)));
  document.querySelectorAll('[data-action="closeLeadModal"]').forEach(b => b.addEventListener('click', closeLeadModal));
});
