// add to cart.js
import { addToCart, logCartItems } from './cart.js';

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for adding items to cart
    document.querySelectorAll('.ajax_add_to_cart').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            let itemId = this.dataset.product_id;
            let productTitle = this.getAttribute('aria-label').replace('Add “', '').replace('” to your cart', '');
            let productPrice = parseFloat(this.dataset.product_price);
            let productImage = this.dataset.product_image;
            let productQuantity = parseInt(this.dataset.quantity);

            let product = {
                id: itemId,
                name: productTitle,
                price: productPrice,
                quantity: productQuantity,
                image: productImage
            };

            addToCart(product);

            // Update button UI
            console.log('Adding product to cart:', product);
            this.classList.add('added');
            this.textContent = 'Added to Cart';

            if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('added_to_cart')) {
                let viewCartLink = document.createElement('a');
                viewCartLink.href = 'pages/my-accounts/cart.html';  // Replace with your actual cart URL
                viewCartLink.classList.add('added_to_cart');
                viewCartLink.textContent = 'View Cart';
                this.parentNode.insertBefore(viewCartLink, this.nextSibling);
            }

            logCartItems();
            
        });
    });

});
