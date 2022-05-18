// @codekit-prepend quiet "../node_modules/validator/validator.min.js";
// @codekit-prepend quiet "../node_modules/@glidejs/glide/dist/glide.min.js";
// @codekit-prepend quiet "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// @codekit-prepend quiet "../node_modules/swiper/swiper-bundle.min.js";

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
// @codekit-prepend "./modules/_theme.js";
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

Theme.init([
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
]);

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 550,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});

// const swiper = document.querySelector('.swiper').swiper;
//
// // Now you can use all slider methods like
// swiper.slideNext();

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





//   var loadProductRecommendationsIntoSection = function() {
//     // Look for an element with class 'product-recommendations'
//     var productRecommendationsSection = document.querySelector(".product-recommendations");
//     if (productRecommendationsSection === null) { return; }
//     // Read product id from data attribute
//     var productId = productRecommendationsSection.dataset.productId;
//     // Read limit from data attribute
//     var limit = productRecommendationsSection.dataset.limit;
//     // Build request URL
//     // var requestUrl = "/recommendations/products?section_id=product-recommendations&limit="+limit+"&product_id="+productId;
//
//     var requestUrl = productRecommendationsSection.dataset.url || false;
//
//     // Create request and submit it using Ajax
//     var request = new XMLHttpRequest();
//     request.open("GET", requestUrl);
//     request.onload = function() {
//       if (request.status >= 200 && request.status < 300) {
//         var container = document.createElement("div");
//         container.innerHTML = request.response;
//         productRecommendationsSection.parentElement.innerHTML = container.querySelector(".product-recommendations").innerHTML;
//       }
//     };
//     request.send();
//     console.log('loadProductRecommendationsIntoSection()');
//   };
//   // If your section has theme settings, the theme editor
//   // reloads the section as you edit those settings. When that happens, the
//   // recommendations need to be fetched again.
//   // See https://help.shopify.com/en/themes/development/sections/integration-with-theme-editor
//   document.addEventListener("shopify:section:load", function(event) {
//     if (event.detail.sectionId === "product-recommendations") {
//       loadProductRecommendationsIntoSection();
//     }
//   });
//   // Fetching the recommendations on page load
//   loadProductRecommendationsIntoSection();
