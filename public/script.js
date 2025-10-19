// ---------- Global Cart ----------
let cart = [];

// ---------- Fetch food items from backend ----------
async function loadFoods() {
    const foodList = document.getElementById('food-list');
    if (!foodList) return;

    try {
        const res = await fetch('/api/foods');
        const foods = await res.json();

        foods.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-card';
            div.innerHTML = `
                <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p>Price: Rs.${item.price}</p>
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            `;
            foodList.appendChild(div);
        });
    } catch (err) {
        console.error('[FRONTEND] Error loading foods:', err);
        foodList.innerHTML = '<p>Failed to load food items.</p>';
    }
}

// ---------- Add item to cart ----------
function addToCart(name, price) {
    let found = cart.find(i => i.name === name);
    if (found) found.qty++;
    else cart.push({ name, price, qty: 1 });

    alert(`${name} added to cart`);
    updateCart();
}

// ---------- Remove item from cart ----------
function removeItem(name) {
    cart = cart.filter(i => i.name !== name);
    updateCart();
}

// ---------- Update Cart Display ----------
function updateCart() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('price-summary');
    if (!container || !summary) return;

    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach(i => {
        subtotal += i.price * i.qty;
        container.innerHTML += `
            <div>
                ${i.name} Rs.${i.price} x ${i.qty}
                <button onclick="removeItem('${i.name}')">🗑</button>
            </div>
        `;
    });

    const delivery = 50;
    const total = subtotal + delivery;
    summary.innerHTML = `Subtotal: Rs.${subtotal} <br> Delivery: Rs.${delivery} <br> Total: Rs.${total}`;
}

// ---------- Checkout ----------
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: this['name'].value,
            mobile: this['mobile'].value,
            city: this['city'].value,
            zipcode: this['zipcode'].value,
            address: this['address'].value,
            delivery: this['delivery'].value || 'Deliver Now',
            payment: this['payment'].value || 'Cash on delivery',
            cart: cart
        };

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            alert('Order Confirmed! ' + data.message);

            cart = [];
            updateCart();
            window.location.href = 'index.html'; // go back to home
        } catch (err) {
            console.error('[FRONTEND] Checkout error:', err);
            alert('Failed to place order.');
        }
    });
}

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', () => {
    loadFoods();
    updateCart();
});
