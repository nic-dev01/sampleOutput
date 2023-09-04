let quantityInputs = document.querySelectorAll('.quantity-input');

quantityInputs.forEach(input => {
    let productName = input.dataset.productName;
    let productPrice = parseFloat(input.dataset.productPrice);

    let decreaseButton = input.nextElementSibling.nextElementSibling;
    let increaseButton = input.nextElementSibling;

    decreaseButton.addEventListener('click', () => {
        let quantity = parseInt(input.value);
        if (quantity > 0) {
            quantity--;
            input.value = quantity;
            updateTotal(productName, -productPrice);
        }
    });

    increaseButton.addEventListener('click', () => {
        let quantity = parseInt(input.value);
        quantity++;
        input.value = quantity;
        updateTotal(productName, productPrice);
    });
});


function updateTotal(productName, price) {
    let cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(cartItem => {
        let itemName = cartItem.querySelector('.cart-item-details h5').textContent;
        if (itemName === productName) {
            let quantity = parseInt(cartItem.querySelector('.quantity').textContent);
            let totalPriceElement = cartItem.querySelector('.cart-item-details p');
            let currentTotal = parseFloat(totalPriceElement.textContent.replace('PHP ', ''));
            currentTotal += price;
            totalPriceElement.textContent = `PHP ${currentTotal.toFixed(2)}`;

            if (quantity === 0) {
                cartItem.parentNode.removeChild(cartItem);
            }
        }
    });
}

let addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        let productName = button.dataset.productName;
        let productPrice = parseFloat(button.dataset.productPrice);
        let quantityInput = button.previousElementSibling;
        let quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            let totalPrice = quantity * productPrice;
            let cart = document.querySelector('.cart');

            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            let cartItemDetails = document.createElement('div');
            cartItemDetails.classList.add('cart-item-details');

            let itemName = document.createElement('h5');
            itemName.textContent = productName;

            let itemPrice = document.createElement('p');
            itemPrice.textContent = `PHP ${totalPrice.toFixed(2)}`;

            let itemQuantity = document.createElement('span');
            itemQuantity.classList.add('quantity');
            itemQuantity.textContent = quantity;

            
            cartItemDetails.appendChild(itemName);
            cartItemDetails.appendChild(itemPrice);
            cartItemDetails.appendChild(itemQuantity);

            cartItem.appendChild(cartItemDetails);
            cart.appendChild(cartItem);

            
            updateTotalAmount(); 
        }
    });
});

function updateTotalAmount() {
    let cartItems = document.querySelectorAll('.cart-item');
    let totalAmount = 0;

    cartItems.forEach(cartItem => {
        let itemPrice = cartItem.querySelector('.cart-item-details p').textContent;
        let price = parseFloat(itemPrice.replace('PHP ', ''));
        let quantity = parseInt(cartItem.querySelector('.quantity').textContent);
        totalAmount += price * quantity;
    });

    let totalAmountElement = document.querySelector('.total-amount');
    totalAmountElement.textContent = `Total: PHP ${totalAmount.toFixed(2)}`;
}
