
document.addEventListener('DOMContentLoaded', initializeCart);

const cart = [];

function initializeCart() {
    document.querySelectorAll('.addToCart').forEach(button => {
        button.addEventListener('click', handleAddToCartClick);
    });
    document.getElementById('saveFavourites').addEventListener('click', saveFavoriteOrder);
    document.getElementById('applyFavourites').addEventListener('click', applyFavoriteOrder);
    document.getElementById('buyNow').addEventListener('click', nextPage);
    document.getElementById('clearCart').addEventListener('click', clearCart);
}

// Function to update the cart when items are added
function handleAddToCartClick(event) {
    const itemElement = event.target.closest('.item');
    const itemName = itemElement.querySelector('p').textContent;
    const itemPrice = parseFloat(itemElement.querySelector('p:nth-of-type(2)').textContent.replace(' LKR', ''));
    const itemQuantity = parseFloat(itemElement.querySelector('.numIn').value);

    if (itemQuantity > 0) {
        addItemToCart(itemName, itemPrice, itemQuantity);
        updateCartTable();
    }
}

function addItemToCart(name, price, quantity) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } 
    else {
        cart.push({ name, price, quantity });
    }
}

function updateCartTable() {
    const tbody = document.querySelector('.cart tbody');
    tbody.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} LKR</td>
            <td>${item.quantity}</td>
            <td>${itemTotal.toFixed(2)} LKR</td>
        `;
        tbody.appendChild(row);
    });

    // Add a final row for the total
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)} LKR</strong></td>
    `;
    tbody.appendChild(totalRow);
}

// Function to save order in the local storage
function saveFavoriteOrder() {
    localStorage.setItem('favoriteOrder', JSON.stringify(cart));
    alert('Favorite order saved!');
}

// Function to apply the favourite order from local storage
function applyFavoriteOrder() {
    const favoriteOrder = JSON.parse(localStorage.getItem('favoriteOrder'));
    if (favoriteOrder) {
        favoriteOrder.forEach(item => addItemToCart(item.name, item.price, item.quantity));
        updateCartTable();
        alert('Favorite order applied!');
    } 
    else {
        alert('No favorite order found.');
    }
}

// Function to clear the cart
function clearCart() {
    cart.length = 0;
    updateCartTable();
}

// Function to go to the next page
function nextPage() {
    if (cart.length > 0) {
        alert('Thank you for your purchase!');
        localStorage.setItem('cartData', JSON.stringify(cart));
        clearCart();
        window.location.href = 'orderPage.html';
    } 
    else {
        alert('Your cart is empty.');
    }
}
