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
    addProductToCartFromButton( button );
  });
});

if ( true ) {
  insertNotificationMarkupIntoBody(createNotificationMarkup());
}

function createNotificationMarkup( $product = {} ) {

  let version = '1.1';
  let blockName = 'notification';
  let variantID = $product.hasOwnProperty('variant_id') ? $product.variant_id : 123456789;
  let image = $product.hasOwnProperty('featured_image') ? $product.featured_image.url : '';
  let productTitle = $product.hasOwnProperty('product_title') ? $product.product_title : 'Defense Barrier';


//       let imageSrc = product.featured_image.url || ''
//       let image = new Image();
//
//       image.addEventListener('load', function() {
//         console.log('loaded');
//         showNotification( product );
//       });
//
//       image.src = imageSrc;


  return `<div class="${blockName} ${blockName}--add-to-cart" id="${blockName}--add-to-cart--${variantID}">
      <div class="${blockName}__layout">
        <div class="${blockName}__media">
          <div class="${blockName}__background-image lazyload lazyload-item lazyload-item--image lazyload-item--background" data-bg="${image}"></div>
        </div>
        <div class="${blockName}__content">
          <div class="${blockName}__message label--primary">Added to Cart! v.${version}</div>
          <div class="${blockName}__product-title">${productTitle}</div>
        </div>
      </div>
      <button type="button">x</button>
    </div>`;

};

function notify( $products = [] ) {
  if ( $products ) {
    $products.forEach( product => {
      // let markup = createNotificationMarkup( product );
      // insertNotificationMarkupIntoBody( markup );
      alert(`${product.title} Added to Cart!`);
    });
  }
};

function getCartItemsCount() {
  let config = {
    method: 'get',
    url: window.Shopify.routes.root + 'cart.js'
  };
  axios( config ).then(function (response) {
    console.log( response );
    printCartItemsCount( response.data.item_count );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
};

function printCartItemsCount( $count = 0 ) {
  ( document.querySelectorAll('.js--cart-items-total') || [] ).forEach( item => {
    item.innerHTML = `(${$count})`;
    if ( $count > 0 ) {
      item.classList.add('has-items');
    } else {
      item.classList.remove('has-items');
    }
  });
};

function updateCartItemsCount() {
  getCartItemsCount();
};

function addProductToCartFromButton( $button = false ) {

  let variantID = parseInt( $button.dataset.variantId ) || 123456;
  let quantity = parseInt( $button.dataset.quantity ) || 1;
  let image = $button.dataset.featuredImage || '';
  let config = {
    method: 'post',
    url: window.Shopify.routes.root + 'cart/add.js',
    headers: { 'Content-Type': 'application/json' },
    data: { 'items': [{ 'id': variantID, 'quantity': quantity }] }
  };

  axios( config ).then(function (response) {
    notify( response.data.items );
    updateCartItemsCount();
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

};

function insertNotificationMarkupIntoBody( $markup = false ) {
  if ( $markup ) document.body.insertAdjacentHTML( "beforeend", $markup );
};

