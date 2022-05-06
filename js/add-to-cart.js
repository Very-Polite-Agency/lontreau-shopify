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
  button.addEventListener('click', event => {

    event.preventDefault();

    let variantID = parseInt(button.dataset.variantId) || false;
    let quantity = parseInt(button.dataset.quantity) || 1;
    let config = {
      method: 'post',
      url: window.Shopify.routes.root + 'cart/add.js',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'items': [{ 'id': variantID, 'quantity': quantity }]
      }
    };

    if ( variantID ) {
      axios( config ).then(function (response) {
        notify( response.data.items );
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    }

    console.log({ variantID, quantity });

  });
});

function notify( $products = [] ) {
  if ( $products ) {
    $products.forEach( product => {
      alert( `${product.title} added to cart!` );
    });
  }
}

