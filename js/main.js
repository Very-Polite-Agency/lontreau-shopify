// @codekit-prepend quiet "../node_modules/validator/validator.min.js";
// @codekit-prepend quiet "../node_modules/@glidejs/glide/dist/glide.min.js";
// @codekit-prepend quiet "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// @codekit-prepend quiet "../node_modules/swiper/swiper-bundle.min.js";
// @codekit-prepend quiet "../node_modules/notyf/notyf.min.js";

// @codekit-prepend "./modules/_credits.js";
// @codekit-prepend "./modules/_breakpoints.js";
// @codekit-prepend "./modules/_forms.js";
// @codekit-prepend "./modules/_gliders.js";
// @codekit-prepend "./modules/_header.js";
// @codekit-prepend "./modules/_instagramFeed.js";
// @codekit-prepend "./modules/_mobileMenu.js";
// @codekit-prepend "./modules/_modals";
// @codekit-prepend "./modules/_scrolling.js";
// @codekit-prepend "./modules/_sections.js";
// @codekit-prepend "./modules/_sizing.js";
// @codekit-prepend "./modules/_stepper.js";
// @codekit-prepend "./modules/_tools.js";

//////////////////////////////////////////////////////////////////////////////////////////
////  Execute Theme
//////////////////////////////////////////////////////////////////////////////////////////

let credits = new Credits();
let forms = new Forms();
let gliders = new Gliders();
let header = new Header();
let instagramFeed = new InstagramFeed();
let mobileMenu = new MobileMenu();
let sections = new Sections();
let scrolling = new Scrolling();
let sizing = new Sizing();
let stepper = new Stepper();
let tools = new Tools();

[
  forms,
  gliders,
  header,
  instagramFeed,
  mobileMenu,
  sections,
  scrolling,
  sizing,
  stepper,
  credits,
].forEach(( module ) => { module.init(); });

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 550,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
  once: true,
});

var swiperThumbs = new Swiper(".swiper-thumbs", {
  autoHeight: false,
  breakpoints: {
    992: {
      spaceBetween: 10
    },
    1400: {
      spaceBetween: 16
    }
  },
  loop: false,
  slidesPerView: 5,
  spaceBetween: 8
})

var swiper = new Swiper(".swiper-main", {
  autoHeight: true,
  loop: true,
  pagination: {
    clickable: true,
    el: ".product__gallery-main-pagination"
  },
  slidesPerView: 1,
  spaceBetween: 20,
  thumbs: {
    swiper: swiperThumbs
  }
});

let notificationsObj = {};
let nofiticationsArr = [];

( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    addProductToCartFromButton( button );
  });
});

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
    notifyUser( response.data.items );
    updateCartItemsCount();
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

};


function notifyUser( $products = [] ) {
  if ( $products ) {
    $products.forEach( (product, index) => {

      let notyf = new Notyf({
        dismissible: true,
        duration: 0,
        position: {
          x: 'right',
          y: 'top',
        },
        types: [
          {
            type: 'info',
            background: 'transparent',
            icon: false
          }
        ]
      });

      notyf.open({
        type: 'info',
        message: renderNotificationMarkup( product )
      });

      // notyf.success(`${product.product_title} Added to cart!`);


//       let n = new Notyf({
//         callbacks: {
//           beforeShow: function() {},
//           onShow: function() {},
//           afterShow: function() {},
//           onClose: function() {},
//           afterClose: function() {},
//           onHover: function() {},
//           onTemplate: function() {
//             this.barDom.innerHTML = '<div class="my-custom-template noty_body">' + product.product_title + '<div>';
//           }
//         },
//         layout: 'topRight',
//         text: product.product_title,
//         theme: 'mint',
//         timeout: '4000',
//         type: 'success',
//       });
//
//       n.show();

      // nofiticationsArr.push(n);

      console.log( 'notifyUser ::', { product, index, nofiticationsArr });

      // document.getElementById(`add-to-cart-notification`).innerHTML = renderNotificationMarkup( product );
      // setTimeout(function(){
      //   document.getElementById(`add-to-cart-notification`).classList.add('active');
      //   setTimeout(function(){
      //     // document.getElementById(`add-to-cart-notification`).classList.remove('active');
      //   }, 4500);
      // }, 500);


    });
  }
};

function renderNotificationMarkup( $product = {} ) {

  let version = '1.1';
  let blockName = 'notyf';
  let image = $product.hasOwnProperty('featured_image') ? $product.featured_image.url : '';
  let productTitle = $product.hasOwnProperty('product_title') ? $product.product_title : 'Defense Barrier';

  return `
    <div class="${blockName}__layout">
      <div class="${blockName}__media">
        <div class="${blockName}__background-image lazyload lazyload-item lazyload-item--image lazyload-item--background" data-bg="${image}"></div>
      </div>
      <div class="${blockName}__content">
        <div class="${blockName}__confirmation-message label--primary">Added to Cart!</div>
        <div class="${blockName}__product-title body-copy--regular">${productTitle}</div>
      </div>
    </div>
  `;

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
  let config = {
    method: 'get',
    url: window.Shopify.routes.root + 'cart.js'
  };
  axios( config ).then(function (response) {
    printCartItemsCount( response.data.item_count );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
};
