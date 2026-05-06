document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cars-grid');
  if (!grid) return;
  const items = [
    { id:1, make:'Toyota', model:'Camry', year:2020, price:21000, image:'https://images.unsplash.com/photo-1524648310150-2e8b1f15f3a0' },
    { id:2, make:'Tesla', model:'Model 3', year:2021, price:38950, image:'https://images.unsplash.com/photo-1549921296-3ecb3f8b3b3d' },
    { id:3, make:'Mercedes', model:'E-Class', year:2019, price:32000, image:'https://images.unsplash.com/photo-1600585154340-9abbd0e12a2a' }
  ];
  grid.innerHTML = items.map(i => `
    <div class="card">
      <img src="${i.image}" alt="${i.make} ${i.model}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%2280%22><rect width=%22180%22 height=%2280%22 fill=%22%23ddd%22/><text x=%2290%22 y=%2240%22 text-anchor=%22middle%22 fill=%22%23666%22 font-family=%22Arial%22 font-size=%2240%22>Фото</text></svg>'">
      <div class="info">
        <h3>${i.make} ${i.model} ${i.year}</h3>
        <p>Цена: ${i.price} ₽</p>
      </div>
    </div>
  `).join('');
});
