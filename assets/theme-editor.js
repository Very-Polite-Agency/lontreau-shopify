document.addEventListener('shopify:block:select', function(event) {
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function() {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function(event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});
$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('collections-list-template', theme.FeaturedCollections);
  sections.register('collection-row-section', theme.CollectionRows);
  sections.register('collection-template', theme.Collection);
  sections.register('header-section', theme.HeaderSection);
  sections.register('list-collections-template', theme.ListCollections);
  sections.register('map-section', theme.Maps);
  sections.register('product-template', theme.Product);
  sections.register('slideshow-section', theme.SlideshowSection);
});