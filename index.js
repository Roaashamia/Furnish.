const listOfProducts = document.querySelector("#main-list");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("flex");
    sidebar.classList.add("hidden");
});

async function getData() {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    console.log(data.products);
    return data.products;
}
function createProductElement(product) {
    try {
        const ProductContainerElement = document.createElement('div');
        ProductContainerElement.className =
            "flex flex-col w-[300px] border border-[#eee] min-h-[410px]   rounded-2xl shadow-md hover:shadow-[0_0_6px_#6b2400]  transition duration-300";

        const ProductImageElement = document.createElement('img');
        ProductImageElement.className =
            "w-auto h-52 py-4 mx-auto cursor-pointer object-cover object-center rounded-t-2xl max-w-full";
        ProductImageElement.src = product.images[0];

        const ProductContent = document.createElement('div');
        ProductContent.className = "flex flex-col justify-between rounded-xl flex-1 p-5 gap-2";

        const ProductTitleElement = document.createElement('h2');
        ProductTitleElement.className =
            "text-primary text-xl font-bold capitalize";
        ProductTitleElement.innerText = product.title;

        const ProductDescElement = document.createElement('p');
        ProductDescElement.className =
            "text-sm text-text leading-relaxed  overflow-hidden text-ellipsis  line-clamp-2";
        ProductDescElement.innerText = product.description;

        // السعر + الأزرار
        const ProductContainerActionElementWithPrice = document.createElement('div');
        ProductContainerActionElementWithPrice.className =
            "flex items-center justify-between mt-2";

        const ProductPriceElement = document.createElement('span');
        ProductPriceElement.className = "text-amber-400 font-semibold text-lg";
        ProductPriceElement.innerText = `${product.price} $`;

        const ProductContainerActionElement = document.createElement('div');
        ProductContainerActionElement.className = "flex items-center gap-3";

        const ProductButtonAddToCart = document.createElement('button');
        ProductButtonAddToCart.innerText = "Add to Cart";
        ProductButtonAddToCart.className =
            "p-2 rounded-full border  text-secondary text-sm font-bold  border-border hover:bg-third hover:border-third hover:text-secondary transition";
        ProductButtonAddToCart.addEventListener('click', () => handleAddToCart(product));
        const ProductButtonAddToFav = document.createElement('button');
        ProductButtonAddToFav.innerText = "♡";
        ProductButtonAddToFav.className =
            "p-2 rounded-full border border-third text-secondary bg-third hover:bg-primary font-bold hover:border-primary hover:text-background transition";
        ProductButtonAddToFav.addEventListener('click', () => handleAddToFav(product));

        ProductContainerActionElement.appendChild(ProductButtonAddToCart);
        ProductContainerActionElement.appendChild(ProductButtonAddToFav);

        ProductContainerActionElementWithPrice.appendChild(ProductPriceElement);
        ProductContainerActionElementWithPrice.appendChild(ProductContainerActionElement);

        ProductContent.appendChild(ProductTitleElement);
        ProductContent.appendChild(ProductDescElement);
        ProductContent.appendChild(ProductContainerActionElementWithPrice);

        ProductContainerElement.appendChild(ProductImageElement);
        ProductContainerElement.appendChild(ProductContent);
        ProductImageElement.addEventListener('click', () => {
            const url = `./products/details.html?id=${product?.id}`;
            window.location.href = url;
        })
        return ProductContainerElement;
    } catch (error) {
        console.error(error);
        return null;
    }
}


function renderProducts(products) {
    products.forEach(p => {
        const productElement = createProductElement(p);
        listOfProducts.appendChild(productElement);
    });
}

async function main() {
    const data = await getData();
    renderProducts(data);
}

main();
