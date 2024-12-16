document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.getElementById("product");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartTableBody.innerHTML = ""; 
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemSubtotal = parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity;
            subtotal += itemSubtotal;

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

        subtotalElement.textContent = `₱ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `₱ ${subtotal.toFixed(2)}`;
    }

    window.addEventListener("storage", () => {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
        renderCart();
    });

    cartTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            renderCart(); 
        }
    });

    renderCart();
});
