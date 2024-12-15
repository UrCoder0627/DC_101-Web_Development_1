// Automatically load and update the cart when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.getElementById("product");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    // Retrieve the cart from localStorage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render the cart items in the table
    function renderCart() {
        cartTableBody.innerHTML = ""; // Clear existing rows
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemSubtotal = parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity;
            subtotal += itemSubtotal;

            // Create table row for each cart item
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button class="remove-btn" data-index="${index}">&#10060;</button></td>
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>&#8369; ${itemSubtotal.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        // Update subtotal and total
        subtotalElement.textContent = `₱ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `₱ ${subtotal.toFixed(2)}`;
    }

    // Automatically update totals whenever the cart changes in localStorage
    window.addEventListener("storage", () => {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        renderCart();
    });

    // Remove item from the cart
    cartTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1); // Remove item from cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
            renderCart(); // Re-render the cart
        }
    });

    // Initial render
    renderCart();
});
