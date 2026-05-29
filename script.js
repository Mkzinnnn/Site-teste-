// =========================
// CONFIGURAÇÕES
// =========================

const WHATSAPP_NUMBER = "5538991478923";

// =========================
// ELEMENTOS
// =========================

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const finishOrder = document.getElementById("finishOrder");

// =========================
// CARRINHO
// =========================

let cart = JSON.parse(
    localStorage.getItem("mmmDocesCart")
) || [];

// =========================
// SALVAR
// =========================

function saveCart() {
    localStorage.setItem(
        "mmmDocesCart",
        JSON.stringify(cart)
    );
}

// =========================
// ABRIR
// =========================

function openCart() {
    cartSidebar.classList.add("open");
    overlay.classList.add("show");
}

// =========================
// FECHAR
// =========================

function closeSidebar() {
    cartSidebar.classList.remove("open");
    overlay.classList.remove("show");
}

cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeSidebar
);

overlay.addEventListener(
    "click",
    closeSidebar
);

// =========================
// ADICIONAR
// =========================

document
.querySelectorAll(".add-cart")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);

            const existing =
                cart.find(
                    item =>
                    item.name === name
                );

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    name,
                    price,
                    quantity:1
                });

            }

            updateCart();
            saveCart();

            button.textContent =
                "✓ Adicionado";

            setTimeout(() => {

                button.textContent =
                "Adicionar";

            }, 1000);

        }
    );

});

// =========================
// QUANTIDADE
// =========================

function increase(index){

    cart[index].quantity++;

    updateCart();
    saveCart();
}

function decrease(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    updateCart();
    saveCart();
}

// =========================
// REMOVER
// =========================

function removeItem(index){

    cart.splice(index,1);

    updateCart();
    saveCart();
}

// =========================
// ATUALIZAR
// =========================

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item,index)=>{

        const subtotal =
            item.price *
            item.quantity;

        total += subtotal;

        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    R$ ${item.price.toFixed(2)}
                </p>

            </div>

            <div>

                <button
                onclick="decrease(${index})">
                -
                </button>

                <span>
                ${item.quantity}
                </span>

                <button
                onclick="increase(${index})">
                +
                </button>

                <br><br>

                <button
                onclick="removeItem(${index})"
                style="
                background:#ff5b5b;
                color:white;
                border:none;
                padding:5px 8px;
                border-radius:8px;
                cursor:pointer;
                ">
                Remover
                </button>

            </div>

        </div>

        `;
    });

    cartTotal.textContent =
        "R$ " +
        total.toFixed(2);

    cartCount.textContent =
        count;
}

// =========================
// FILTROS
// =========================

const filters =
document.querySelectorAll(
    ".filter"
);

const products =
document.querySelectorAll(
    ".product-card"
);

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(btn =>
                btn.classList.remove(
                    "active"
                )
            );

            filter.classList.add(
                "active"
            );

            const category =
                filter.dataset.category;

            products.forEach(
                product => {

                if(
                    category === "all"
                    ||
                    product.dataset.category === category
                ){

                    product.style.display =
                    "block";

                }else{

                    product.style.display =
                    "none";

                }

            });

        }
    );

});

// =========================
// WHATSAPP
// =========================

finishOrder.addEventListener(
    "click",
    () => {

        if(cart.length === 0){

            alert(
                "Seu carrinho está vazio."
            );

            return;
        }

        let total = 0;

        let message =
`🍰 *Pedido - Mmm... Doces!*%0A%0A`;

        cart.forEach(item=>{

            const subtotal =
            item.price *
            item.quantity;

            total += subtotal;

            message +=
`🍫 ${item.name}%0A`;

            message +=
`Qtd: ${item.quantity}%0A`;

            message +=
`Subtotal: R$ ${subtotal.toFixed(2)}%0A%0A`;

        });

        message +=
`💰 *Total: R$ ${total.toFixed(2)}*`;

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
            "_blank"
        );

    }
);

// =========================
// ANIMAÇÕES
// =========================

const observer =
new IntersectionObserver(
(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = 1;

            entry.target.style.transform =
            "translateY(0)";

        }

    });

},
{
    threshold:0.15
}
);

document
.querySelectorAll(
".product-card,.review-card,.stat-box"
)
.forEach(el=>{

    el.style.opacity = 0;

    el.style.transform =
    "translateY(40px)";

    el.style.transition =
    ".7s ease";

    observer.observe(el);

});

// =========================
// INICIAR
// =========================

updateCart();
