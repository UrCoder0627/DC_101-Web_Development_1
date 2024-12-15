document.addEventListener("DOMContentLoaded", () => {
    let cartButtons = document.querySelectorAll(".cart-button");

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            let productBox = button.closest(".product-box");
            let productName = productBox.querySelector("h4").textContent;
            let productPrice = productBox.querySelector(".price").textContent;
            let productImage = productBox.querySelector(".product-image").getAttribute("src");

            let product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            // Retrieve the cart from localStorage or initialize an empty array
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if the product already exists in the cart
            let existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }

            // Save the updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${product.name} has been added to your cart!`);
        });
    });
});
