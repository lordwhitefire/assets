// epiphany_handle_add_to_cart.js
import { addToCart, logCartItems } from './cart.js';
import { products } from './products.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('epiphany_handle_add_to_cart.js loaded successfully');

    // Function to handle adding the product and updating the UI
    function handleAddToCart(event) {
        event.preventDefault();
        event.stopImmediatePropagation();  // Ensure no other handlers can override

        console.log('Button clicked, preventing form submission.');

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // Find the product that matches the ID
        const product = products.find(product => product.id === productId);

        // Extract the quantity from the form's input field
        const quantityInput = document.querySelector('input[name="quantity"]');
        const quantity = parseInt(quantityInput.value, 10) || 1; // Default to 1 if input is invalid

        // Check if the product was found
        if (product) {
            let itemId = product.id;
            let productTitle = product.name;
            let productPrice = product.price;
            let productImage = product.image.datathumb;
            let productQuantity = quantity;

            let productData = {
                id: itemId,
                name: productTitle,
                price: productPrice,
                quantity: productQuantity,
                image: productImage
            };

            addToCart(productData);

            // Update button UI
            console.log('Adding product to cart:', productData);
            logCartItems();
            // Create a new div with the exact HTML content
            const messageDiv = document.createElement('div');
            messageDiv.className = 'woocommerce-message';
            messageDiv.role = 'alert';
            messageDiv.innerHTML = `
                <a href="https://lordwhitefire.github.io/assets/" class="button wc-forward">View cart</a>
                “${productTitle}” has been added to your cart.
            `;

            // Find the woocommerce_breadcrumb element
            const breadcrumbDiv = document.querySelector('.woocommerce-breadcrumb');

            // Check if breadcrumbDiv exists before trying to insert
            if (breadcrumbDiv) {
                // Insert the messageDiv after the breadcrumbDiv
                breadcrumbDiv.parentNode.insertBefore(messageDiv, breadcrumbDiv.nextSibling);
            } else {
                console.error('Breadcrumb element not found');
            }
        } else {
            console.error('Product not found');
        }
    }

    // Add event listener to the span element with id "singles"
    const addToCartSpan = document.querySelector('#singles');

    if (addToCartSpan) {
        addToCartSpan.addEventListener('click', handleAddToCart);
    } else {
        console.error('Add to Cart span not found');
    }
});
