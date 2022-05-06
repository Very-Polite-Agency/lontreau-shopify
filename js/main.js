// @codekit-prepend quiet "../node_modules/validator/validator.min.js";
// @codekit-prepend quiet "../node_modules/@glidejs/glide/dist/glide.min.js";
// @codekit-prepend quiet "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// @codekit-prepend "./modules/_credits.js";
// @codekit-prepend "./modules/_breakpoints.js";
// @codekit-prepend "./modules/_forms.js";
// @codekit-prepend "./modules/_gliders.js";
// @codekit-prepend "./modules/_instagramFeed.js";
// @codekit-prepend "./modules/_mobileMenu.js";
// @codekit-prepend "./modules/_modals";
// @codekit-prepend "./modules/_scrolling.js";
// @codekit-prepend "./modules/_sections.js";
// @codekit-prepend "./modules/_sizing.js";
// @codekit-prepend "./modules/_theme.js";
// @codekit-prepend "./modules/_tools.js";

//////////////////////////////////////////////////////////////////////////////////////////
////  Execute Theme
//////////////////////////////////////////////////////////////////////////////////////////

let credits = new Credits();
let forms = new Forms();
let gliders = new Gliders();
let instagramFeed = new InstagramFeed();
let mobileMenu = new MobileMenu();
let sections = new Sections();
let scrolling = new Scrolling();
let sizing = new Sizing();
let tools = new Tools();

Theme.init([
  forms,
  gliders,
  instagramFeed,
  mobileMenu,
  sections,
  scrolling,
  sizing,
  credits,
]);

AOS.init({
  offset: 150,                // offset (in px) from the original trigger point
  delay: 0,                   // values from 0 to 3000, with step 50ms
  duration: 550,              // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out',      // default easing for AOS animations
});
