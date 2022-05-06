// let formData = {
//  'items': [
//     {
//       'id': 36110175633573,
//       'quantity': 1
//     }
//   ]
// };

// fetch(window.Shopify.routes.root + 'cart/add.js', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(formData)
// })
// .then(response => {
//   return response.json();
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
  trigger.addEventListener('click', event => {

    event.preventDefault();

    let variantID = button.dataset.variantId || false;
    let quantity = button.dataset.quantity || 1;

    console.lgo({ variantID, quantity });

  });
});

