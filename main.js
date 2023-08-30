// Function to handle adding a product to the cart
function addToCart(productName, productPrice) {
    // Create a new cart item
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
        <div class="cart-item-details">
            <h5>${productName}</h5>
            <p>${productPrice}</p>
        </div>
        <button class="btn btn-danger btn-sm remove-btn">Remove</button>
    `;
    
    // Add the cart item to the cart
    let cart = document.querySelector(".cart");
    cart.appendChild(cartItem);
    
    // Add event listener to remove button
    let removeButton = cartItem.querySelector(".remove-btn");
    removeButton.addEventListener("click", () => {
        cart.removeChild(cartItem);
    });
}

// Add event listeners to all "Add to Cart" buttons
let addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        let productName = button.dataset.productName;
        let productPrice = button.dataset.productPrice;
        addToCart(productName, productPrice);
    });
});

