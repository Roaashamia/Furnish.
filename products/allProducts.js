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
const listOfProducts = document.getElementById('listOfProducts');
const paginationContainer = document.getElementById('pagination');

let currentPage = 1;
const limit = 10;
let totalProducts = 0;
let totalPages = 0;

async function getData(page = 1) {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();
    totalProducts = data.total;
    totalPages = Math.ceil(totalProducts / limit);
    return data.products;
}

function createProductElement(product) {
    const container = document.createElement('div');
    container.className = "flex flex-col w-[300px] border border-[#eee] min-h-[410px] rounded-2xl shadow-md hover:shadow-[0_0_6px_#6b2400] transition duration-300";

    const img = document.createElement('img');
    img.className = "w-auto h-52 py-4 mx-auto cursor-pointer object-cover object-center rounded-t-2xl max-w-full";
    img.src = product.images[0];
    img.addEventListener('click', () => {
        window.location.href = `./details.html?id=${product?.id}`;
    });

    const content = document.createElement('div');
    content.className = "flex flex-col justify-between rounded-xl flex-1 p-5 gap-2";

    const title = document.createElement('h2');
    title.className = "text-primary text-xl font-bold capitalize";
    title.innerText = product.title;

    const desc = document.createElement('p');
    desc.className = "text-sm text-text leading-relaxed overflow-hidden text-ellipsis line-clamp-2";
    desc.innerText = product.description;

    const actionContainer = document.createElement('div');
    actionContainer.className = "flex items-center justify-between mt-2";

    const price = document.createElement('span');
    price.className = "text-amber-400 font-semibold text-lg";
    price.innerText = `${product.price} $`;

    const buttons = document.createElement('div');
    buttons.className = "flex items-center gap-3";

    const btnCart = document.createElement('button');
    btnCart.innerText = "Add to Cart";
    btnCart.className = "p-2 rounded-full border text-secondary text-sm font-bold border-border hover:bg-third hover:border-third hover:text-secondary transition";
    btnCart.addEventListener('click', () => handleAddToCart(product));

    const btnFav = document.createElement('button');
    btnFav.innerText = "♡";
    btnFav.className = "p-2 rounded-full border border-third text-secondary bg-third hover:bg-primary font-bold hover:border-primary hover:text-background transition";
    btnFav.addEventListener('click', () => handleAddToFav(product));

    buttons.appendChild(btnCart);
    buttons.appendChild(btnFav);

    actionContainer.appendChild(price);
    actionContainer.appendChild(buttons);

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(actionContainer);

    container.appendChild(img);
    container.appendChild(content);

    return container;
}

function renderProducts(products) {
    listOfProducts.innerHTML = "";
    products.forEach(p => {
        const el = createProductElement(p);
        listOfProducts.appendChild(el);
    });
    renderPagination();
}

function renderPagination() {
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        pageBtn.className = `px-3 py-1 border cursor-pointer rounded-xl ${i === currentPage ? 'bg-primary text-white' : 'bg-white text-black'}`;
        pageBtn.addEventListener('click', () => loadPage(i));
        paginationContainer.appendChild(pageBtn);
    }
}

async function loadPage(page) {
    currentPage = page;
    const data = await getData(page);
    renderProducts(data);
}

loadPage(1);
