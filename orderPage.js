
document.addEventListener('DOMContentLoaded', () => {
    displayOrderCart();
    document.getElementById('orderForm').addEventListener('submit', (event) => {
        event.preventDefault();
        processOrder();
    });
});

function displayOrderCart() {
    const cartData = JSON.parse(localStorage.getItem('cartData'));
    if (cartData) {
        const tbody = document.querySelector('#orderCart tbody');
        let total = 0;

        cartData.forEach(item => {
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
}

function processOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postalCode').value;
    const cardNo = document.getElementById('cardNo').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Check if all details are given nd calculate the delivery date
    if (name && email && phone && address && city && postalCode && cardNo && expiryDate && cvv){
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2);
        const newDeliveryDate = deliveryDate.toDateString();

        alert(`Thankyou for your purchase, ${name}! \nYour order will be delivered on ${newDeliveryDate}.`);
        document.getElementById('orderForm').reset();
    }
    else{
        alert('Please fill in all fields.');
    }
}