//////////////////////////////////////////////////////////
////  Gliders
//////////////////////////////////////////////////////////

const Gliders = (() => {

  let debug = false;
  let info = { name : 'Gliders', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let gliders = {};
  let targets = '.js--glider';
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Get Gliders
  //////////////////////////////////////////////////////////

  const getGliders = () => {
    return document.querySelectorAll( targets ) || [];
  };

  //////////////////////////////////////////////////////////
  ////  Glider Options
  //////////////////////////////////////////////////////////

  const gliderOptions = ( $customOptions = false ) => {

    let options = {
      animationTimingFunc: 'ease-in-out',
      animationDuration: 280,
      autoplay: 3200,
      breakpoints: {
        // up to 9999
        9999: {
          perView: 1,
          peek: 90
        },
        // up to 992
        991: {
          perView: 1,
          peek: 50
        },
      },
      hoverpause: true,
      perView: 1,
      type: 'carousel',
      rewind: true,
      throttle: 50,
      gap: 12,
    };

    if ( $customOptions && (typeof $customOptions == "object") ) {
      options = { ...options, ...$customOptions };
    }

    return options;

  };

  //////////////////////////////////////////////////////////
  ////  Set Gliders
  //////////////////////////////////////////////////////////

  const setGliders = () => {

    let gliderElements = getGliders();

    for( let i = 0; i < gliderElements.length; i++ ) {

      let element = gliderElements[i];
      let id = element.id;
      let style = element.dataset.glideStyle || 'not-set';
      let desktopOnly = element.dataset.glideDesktopOnly === 'true' || false;
      let mobileOnly = element.dataset.glideMobileOnly === 'true' || false;
      let gap = element.dataset.glideGap === 'true' || false;
      let options = gliderOptions();

      gliders[id] = {
        desktopOnly: desktopOnly,
        glider: false,
        element: element,
        id: id,
        active: false,
        style: style,
        mobileOnly: mobileOnly,
        gap: gap,
      };

      switch ( style ) {

        case 'carousel-education-detailed': {
          options = gliderOptions({
            autoplay: 0,
            breakpoints: {
              9999: {
                focusAt: 0,
                gap: 32,
                peek: { before: 0, after: 175 },
                perView: 5,
              },
              1599: {
                focusAt: 0,
                gap: 32,
                peek: { before: 0, after: 150 },
                perView: 4,
              },
              1299: {
                focusAt: 0,
                gap: 32,
                peek: { before: 0, after: 125 },
                perView: 3,
              },
              991: {
                // up to 992
                focusAt: 0,
                gap: 32,
                peek: { before: 0, after: 100 },
                perView: 2,
              },
              767: {
                // up to 768
                focusAt: 0,
                gap: 32,
                peek: { before: 0, after: 75 },
                perView: 1,
              },
              575: {
                // up to 576
                focusAt: 0,
                perView: 1,
              }
            },
            gap: 0,
            peek: 0,
          });
          break;
        }
        case 'carousel-education-minimal': {
          options = gliderOptions({
            breakpoints: {
              9999: {
                // up to 1400
                focusAt: 'center',
                gap: 72,
                peek: 0,
                perView: 11,
              },
              1599: {
                // up to 1400
                focusAt: 'center',
                gap: 62,
                peek: 0,
                perView: 9,
              },
              1399: {
                // up to 1400
                focusAt: 'center',
                gap: 52,
                peek: 0,
                perView: 7,
              },
              1199: {
                // up to 1200
                focusAt: 'center',
                gap: 42,
                peek: 0,
                perView: 6,
              },
              991: {
                // up to 992
                focusAt: 'center',
                gap: 32,
                peek: 0,
                perView: 5,
              },
              767: {
                // up to 768
                focusAt: 'center',
                gap: 32,
                peek: { before: 55, after: 55 },
                perView: 4,
              },
              575: {
                // up to 576
                focusAt: 'center',
                gap: 32,
                peek: { before: 35, after: 35 },
                perView: 3,
              },
              400: {
                // up to 576
                focusAt: 'center',
                gap: 32,
                peek: { before: 15, after: 15 },
                perView: 1,
              },
            },
            gap: 32,
            peek: 0,
          });
          break;
        }
        case 'product-gallery': {
          options = gliderOptions({
            breakpoints: {},
            gap: 32,
          });
          break;
        }
      }

      if ( gap ) {
        options.gap = 10;
      }

      gliders[id].options = options;

    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize Gliders
  //////////////////////////////////////////////////////////

  const initGliders = () => {

    if ( debug ) console.log( 'initGliders started' );

    let windowWidth = window.innerWidth;

    for ( let key in gliders ) {

      let glider = gliders[key];

      if ( glider.mobileOnly ) {
        if ( windowWidth > breakpoints.sizes.lg ) {
          toggleGliderByID( glider.id, false, glider.options );
    	  } else {
          toggleGliderByID( glider.id, true, glider.options );
        }
      } else if ( glider.desktopOnly ) {
        if ( windowWidth >= breakpoints.sizes.lg ) {
          toggleGliderByID( glider.id, true, glider.options );
    	  } else {
          toggleGliderByID( glider.id, false, glider.options );
        }
      } else {
        toggleGliderByID( glider.id, true, glider.options );
      }

    }

    if ( debug ) console.log( 'initGliders finished' );

  };

  //////////////////////////////////////////////////////////
  ////  Toggle Glider by ID
  //////////////////////////////////////////////////////////

  const toggleGliderByID = ( $id = false, $enable = true, $options = {} ) => {

    if ( $id ) {

      let glider = gliders[$id];

      if ( $enable ) {
        if ( glider.active === false ) {

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
          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].next') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('>');
              glide.update();
            });
          });

          ( document.querySelectorAll('[data-target="#' + glider.id + '"].prev') || [] ).forEach( button => {
            button.addEventListener('click', function () {
              glide.go('<');
              glide.update();
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


        }
      } else {
        if ( glider.active === true ) {
          glider.glider.destroy();
          glider.element.querySelector( '.glide__track' ).style.height = 'auto';
          glider.active = false;
          gliders[$id] = glider;
        }
      }

    }

  };

  //////////////////////////////////////////////////////////
  ////  Subnavigation Controls
  //////////////////////////////////////////////////////////

  const subnavigationControls = () => {

    let targets = '.product__campaign-gallery-subnavigation-item';
    let targetElements = document.querySelectorAll('.product__campaign-gallery-subnavigation-item') || [];

    function updateGalleryByIndex( $target = false ){
      let galleryID = $target.getAttribute('data-gallery-id') || false;
      let selectedIndex = $target.getAttribute('data-gallery-item-index') || false;
      let glider = gliders[galleryID];
      if ( glider.active ) {
        glider.glider.go( '=' + selectedIndex );
      }
    }

    targetElements.forEach((target) => {
      target.addEventListener( 'click', function(){
        updateGalleryByIndex( target );
      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Update Glider Height
  //////////////////////////////////////////////////////////

  const updateGliderHeight = ( $glideElement = false ) => {

    if ( debug ) console.log( `updateGliderHeight() Started!` );

    if ( $glideElement ) {

      let activeSlide = $glideElement.querySelector( '.glide__slide--active' ) || false;
      let track = $glideElement.querySelector( '.glide__track' ) || false;

      if ( activeSlide && track ) {
        let activeSlideHeight = activeSlide.offsetHeight;
        let trackHeight = track.offsetHeight;
        if ( trackHeight != activeSlideHeight ) {
          track.style.height = activeSlideHeight + 'px';
          AOS.refresh();
        }
      }

    }

    if ( debug ) console.log( `updateGliderHeight() Finished!` );

  };

  //////////////////////////////////////////////////////////
  ////  Update Subnavigation
  //////////////////////////////////////////////////////////

  const updateGliderSubnavigation = ( $gliderObject = false, $index = false ) => {
    if ( $gliderObject ) {
      if ( debug ) console.log( 'updateGliderSubnavigation', $gliderObject );
      let elementSubnavigationItems = document.querySelectorAll( '[data-gallery-id="glide--product-campaign-gallery"]' ) || [];
      if ( elementSubnavigationItems.length ) {
        for (let i = 0; i < elementSubnavigationItems.length; i++) {
          let element = elementSubnavigationItems[i];
          let elementIndex = parseInt( element.getAttribute('data-gallery-item-index') );
          tools.removeClass( 'active', [ element ] );
          if ( $index === elementIndex ) {
            tools.addClass( 'active', [ element ] );
          }
        }
      }

    }
  }

  //////////////////////////////////////////////////////////
  ////  Public Method | Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    setGliders();
    initGliders();

    window.addEventListener('resize', function(e){
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          initGliders();
          throttled = false;
        });
        throttled = true;
      }
    });

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
    gliderOptions,
    gliders
  };

});
