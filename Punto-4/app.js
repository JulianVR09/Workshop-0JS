document.addEventListener('DOMContentLoaded', ()=>{
  const Api_url = 'https://api.escuelajs.co/api/v1/products';
  const productscontainer = document.getElementById('productscontainer');
  const searchInput = document.getElementById('searchInput');
  const categoryfilter = document.getElementById('categoryfilter');

  
});

const fetchProducts = async () => {
  try {
    const response = await fetch(Api_url);
    const products = await response.json();
    displayProducts(products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    productoscontainer.innerHTML = '<p>Error fetching products</p>'
    return [];
  };
};

const displayProducts = (products) => {
  productoscontainer.innerHTML = '';
  products.forEach(e => {
    const productsElement = document.createElement('DIV');
    productsElement.innerHTML = `
    <img src="${e.image[0]}" alt="${e.title}">
      <h2>${e.name}</h2>
      <p>Precio: ${e.price}</p>
      <p>Categoría: ${e.category}</p>
    `;
    productoscontainer.appendChild(productsElement);
  });
};

const fetchCategories = async () => {
  try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const categories = await response.json();
      categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categoryFilter.appendChild(option);
      });
  } catch (error) {
      console.error('Error al obtener categorías:', error);
  }
};

const filterProducts = async () => {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const products = await fetchProducts();

  let filteredProducts = products;

  if (searchValue) {
      filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchValue)
      );
  }

  if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => 
          product.category.id == selectedCategory
      );
  }

  displayProducts(filteredProducts);
};


searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);


fetchProducts();
fetchCategories();
