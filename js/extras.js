 function createProductMarkup( $product = {} ) {

    let blockName = '{{ section_name }}';
    let variantID = $product.hasOwnProperty('variant_id') ? $product.variant_id : 123456789;
    let image = $product.hasOwnProperty('featured_image') ? $product.featured_image.url : '';
    let productTitle = $product.hasOwnProperty('product_title') ? $product.product_title : 'Defense Barrier';

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


  }


  let glide = new Glide( '#' + glider.id, $options );
          let eventsToWatch = [ 'build.after', 'run.after' ]; // recently removed 'run'

          glide.on( 'mount.after', function(event) {

            glider.glider = glide;
            glider.active = true;
            gliders[$id] = glider;

            setTimeout( () => {
              console.log( 'mounted', glide )
              glide.update();
            }, 250 );

          });

          glide.on( eventsToWatch, function() {

            setTimeout( () => updateGliderHeight( glider.element ), 100 );

            if ( 'soul' === glider.style ) {

              let activeSlideImage = glider.element.querySelector('.glide__slide--active .soul__item-image') || false;
              let button = glider.element.querySelector('.glide__button') || false;

              if ( activeSlideImage && button ) {
                let imageHeight = activeSlideImage.offsetHeight;
                let buttonHeight = button.offsetHeight;
                let offset = ( imageHeight - buttonHeight ) / 2;
                glider.element.querySelectorAll('.glide__button').forEach((button) => {
                  button.style.top = offset + 'px';
                });
              }

            }

          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].next') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('>');
            });
          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].prev') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('<');
            });
          });

//           ( document.querySelectorAll('[data-target="#' + glider.id + '"].bullet') || [] ).forEach( button => {
//             button.addEventListener('click', function () {
//
//               let pattern = button.dataset.glideDir || '';
//               if ( pattern ) {
//                 glide.go( pattern );
//               }
//
//             });
//           });

          glide.mount();
