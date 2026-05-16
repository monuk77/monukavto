const cars = [
  { id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: '2 100 000', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3997f06c?auto=//format&fit=crop&w=600&q=80' },
  { id: 2, make: 'Tesla', model: 'Model 3', year: 2021, price: '3 800 000', image: 'https://images.unsplash.com/photo-1560958089-b8a19297335e?auto=format&fit=crop&w=600&q=80' },
  { id: 3, make: 'Mercedes', model: 'E-Class', year: 2019, price: '3 200 000', image: 'https://images.unsplash.com/photo-1618843479337-c5765336a608?auto=format&fit=crop&w=600&q=80' },
  { id: 4, make: 'BMW', model: 'M5', year: 2022, price: '7 500 000', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=//format&fit=crop&w=600&q=80' },
  { id: 5, make: 'Audi', model: 'Q7', year: 2018, price: '4 100 000', image: 'https://images.unsplash.com/photo-1541899481276-f7745753847b?auto=//format&fit=crop&w=600&q=80' },
  { id: 6, make: 'Porsche', model: '911', year: 2023, price: '12 000 000', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=//format&fit=crop&w=600&q=80' },
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cars-grid');
  const modal = document.getElementById('lead-modal');
  const closeBtn = document.getElementById('close-modal');
  const leadForm = document.getElementById('lead-form');
  const modalTitle = document.getElementById('modal-car-title');

  if (grid) {
    renderCars(grid);
  }

  function renderCars(container) {
    container.innerHTML = cars.map(car => `
      <div class="car-card">
        <img src="${car.image}" alt="${car.make} ${car.model}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect width=%22300%22 height=%22200%22 fill=%22%23ddd%22/><text x=%22150%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23666%22 font-family=%22Arial%22 font-size=%2220%22>Фото недоступно</text></svg>'">
        <div class="info">
          <h3>${car.make} ${car.model}</h3>
          <p>Год: ${car.year}</p>
          <p class="price">${car.price} ₽</p>
          <button class="btn" onclick="openModal('${car.make} ${car.model}')">Оставить заявку</button>
        </div>
      </div>
    `).join('');
  }

  window.openModal = (title) => {
    if (modal) {
      modal.style.display = 'flex';
      if (modalTitle) modalTitle.textContent = `Заявка на ${title}`;
    }
  };

  if (closeBtn) {
    closeBtn.onclick = () => {
      if (modal) modal.style.display = 'none';
    };
  }

  if (leadForm) {
    leadForm.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name').value;
      const phone = document.getElementById('lead-phone').value;
      
      // MVP: Save to localStorage
      const leads = JSON.parse(localStorage.getItem('car_leads') || '[]');
      leads.push({ name, phone, date: new Date().toISOString() });
      localStorage.setItem('car_leads', JSON.stringify(leads));
      
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
      if (modal) modal.style.display = 'none';
      leadForm.reset();
    };
  }

  const sellForm = document.getElementById('sell-form');
  if (sellForm) {
    sellForm.onsubmit = (e) => {
      e.preventDefault();
      const car = document.getElementById('sell-car').value;
      const year = document.getElementById('sell-year').value;
      const price = document.getElementById('sell-price').value;
      const name = document.getElementById('sell-name').value;
      const phone = document.getElementById('sell-phone').value;
      
      const sellLeads = JSON.parse(localStorage.getItem('car_sell_leads') || '[]');
      sellLeads.push({ car, year, price, name, phone, date: new Date().toISOString() });
      localStorage.setItem('car_sell_leads', JSON.stringify(sellLeads));
      
      alert('Спасибо! Ваша заявка на продажу принята. Мы свяжемся с вами в ближайшее время для обсуждения деталей.');
      sellForm.reset();
    };
  }
});
