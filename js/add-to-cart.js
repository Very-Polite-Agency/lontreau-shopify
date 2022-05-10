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
        updateCartItemsTotal();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
    }

  });
});

function notify( $products = [] ) {
  if ( $products ) {
    $products.forEach( product => {
      alert( `${product.title} added to cart!` );
    });
  }
}

function getCartItemsCount( $products = [] ) {
  let config = {
    method: 'get',
    url: window.Shopify.routes.root + 'cart.js',
  };
  axios( config ).then(function (response) {
    updateCartItemsCount( response.data.item_count );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
}

function updateCartItemsCount( $count = 0 ) {
  ( document.querySelectorAll('.js--cart-items-total') || [] ).forEach( item => {
    item.innerHTML = `(${$count})`;
    if ( $count > 0 ) {
      item.classList.add('has-items');
    } else {
      item.classList.remove('has-items');
    }
  });
}

