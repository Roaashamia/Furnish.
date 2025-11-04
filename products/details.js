const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function getData() {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("error 404");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function main() {
    const product = await getData();
    renderProductDetails(product);
}
main();

function renderProductDetails(product) {
    const container = document.getElementById('product-container');

    if (!product) {
        container.innerHTML = `
      <div class="text-center text-red-600 text-xl w-full py-20">
        عذرًا، هذا المنتج غير موجود.
      </div>`;
        return;
    }

    container.innerHTML = `
    <div class="flex flex-col md:flex-row items-center gap-10 w-full md:w-10/12 lg:w-9/12">

      <!-- الصورة -->
      <div class="flex-1 flex flex-col items-center">
        <img id="mainImage" 
             src="${product.images?.[0]}" 
             alt="${product.title}" 
             class="rounded-2xl drop-shadow-2xl w-full max-w-md object-cover mb-4">
        <div id="thumbnailsContainer" class="flex flex-wrap justify-center gap-2"></div>
      </div>

      <!-- التفاصيل -->
      <div class="flex-1 flex flex-col gap-4 text-text">
        <span class="inline-block border border-accent text-accent text-sm px-3 py-1 rounded-full capitalize w-fit">
          ${product.category}
        </span>

        <h1 class="text-3xl md:text-4xl font-bold text-primary">${product.title}</h1>
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-bold text-accent">$${product.price}</span>
          <span class="text-sm line-through text-secondary">
            $${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
          </span>
          <span class="text-sm text-red-600">${product.discountPercentage}% off</span>
        </div>

        <p class="text-text leading-relaxed">${product.description}</p>

        <div class="flex flex-wrap gap-3 text-sm mt-2">
          <span class="bg-third px-3 py-1 rounded-md">⭐ ${product.rating}</span>
          <span class="bg-third px-3 py-1 rounded-md">📦 ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          <span class="bg-third px-3 py-1 rounded-md">🏷️ ${product.brand}</span>
        </div>

        <button class="mt-6 bg-primary text-background font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-all w-fit">
          Buy Now
        </button>

        <div class="mt-4 text-sm text-text border-t border-border pt-3 flex flex-col gap-1">
          <span><strong>SKU:</strong> ${product.sku}</span>
          <span><strong>Return policy:</strong> ${product.returnPolicy}</span>
          <span><strong>Shipping:</strong> ${product.shippingInformation}</span>
          <span><strong>Warranty:</strong> ${product.warrantyInformation}</span>
        </div>
      </div>

    </div>
  `;

    // الصور المصغّرة
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    product.images.forEach(img => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = product.title;
        thumb.className = 'w-20 h-20 object-cover rounded-md cursor-pointer border border-border hover:border-accent transition-all';
        thumb.addEventListener('click', () => {
            document.getElementById('mainImage').src = img;
        });
        thumbnailsContainer.appendChild(thumb);
    });
}
