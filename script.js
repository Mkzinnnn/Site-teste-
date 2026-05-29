// =========================
// CONFIGURAÇÕES
// =========================

const WHATSAPP = "5538991478923";

// =========================
// ELEMENTOS
// =========================

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const finishOrder = document.getElementById("finishOrder");

// =========================
// CARRINHO
// =========================

let cart = [];

// =========================
// ABRIR / FECHAR
// =========================

function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
}

function closeCartSidebar() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartSidebar);
overlay.addEventListener("click", closeCartSidebar);

// =========================
// ADICIONAR PRODUTO
// =========================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(
            item => item.name === name
        );

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name,
                price,
                quantity: 1
            });

        }

        updateCart();

        button.innerText = "Adicionado ✓";

        setTimeout(() => {
            button.innerText = "Adicionar";
        }, 1000);

    });

});

// =========================
// REMOVER ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

// =========================
// ALTERAR QUANTIDADE
// =========================

function increase(index) {

    cart[index].quantity++;

    updateCart();

}

function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}

// =========================
// ATUALIZAR CARRINHO
// =========================

function updateCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;

        cartItemsContainer.innerHTML += `
        
        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <p>
                    R$ ${item.price.toFixed(2)}
                </p>

            </div>

            <div style="text-align:right">

                <button onclick="decrease(${index})">
                    ➖
                </button>

                <span style="margin:0 8px">
                    ${item.quantity}
                </span>

                <button onclick="increase(${index})">
                    ➕
                </button>

                <br><br>

                <button
                    onclick="removeItem(${index})"
                    style="
                    background:#ff4d4d;
                    color:white;
                    border:none;
                    padding:5px 8px;
                    border-radius:6px;
                    cursor:pointer;
                    ">
                    Remover
                </button>

            </div>

        </div>

        `;
    });

    cartTotal.innerText =
        "R$ " + total.toFixed(2);

    cartCount.innerText =
        totalItems;

}

// =========================
// FILTROS
// =========================

const filters =
document.querySelectorAll(".filter");

const products =
document.querySelectorAll(".product-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        filter.classList.add("active");

        const category =
            filter.dataset.category;

        products.forEach(product => {

            if (
                category === "all" ||
                product.dataset.category === category
            ) {

                product.style.display =
                    "block";

            } else {

                product.style.display =
                    "none";

            }

        });

    });

});

// =========================
// FINALIZAR PEDIDO
// =========================

finishOrder.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }

    let message =
`🍬 *Pedido - Mmm... Doces!*%0A%0A`;

    let total = 0;

    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        message +=
`• ${item.name}%0A`;

        message +=
`Quantidade: ${item.quantity}%0A`;

        message +=
`Subtotal: R$ ${subtotal.toFixed(2)}%0A%0A`;

    });

    message +=
`💰 *Total: R$ ${total.toFixed(2)}*`;

    const url =
`https://wa.me/${WHATSAPP}?text=${message}`;

    window.open(
        url,
        "_blank"
    );

});

// =========================
// EFEITO HEADER
// =========================

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");

    if (window.scrollY > 20) {

        header.style.boxShadow =
        "0 5px 25px rgba(0,0,0,.12)";

    } else {

        header.style.boxShadow =
        "0 2px 15px rgba(0,0,0,.08)";

    }

});

// =========================
// ANIMAÇÃO DE ENTRADA
// =========================

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = 1;
            entry.target.style.transform =
            "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

document
.querySelectorAll(".product-card")
.forEach(card => {

    card.style.opacity = 0;
    card.style.transform =
    "translateY(30px)";

    card.style.transition =
    "all .6s ease";

    observer.observe(card);

});
