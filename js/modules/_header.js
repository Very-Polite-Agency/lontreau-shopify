//////////////////////////////////////////////////////////
////  Header
//////////////////////////////////////////////////////////

const Header = (() => {

  let debug = false;
  let info = { name : 'Header', version : '1.0' };
  let throttled = false;
  let timeout;
  let subTimeout;
  let timeoutValue = 10000000;

  //////////////////////////////////////////////////////////
  ////  ABC
  //////////////////////////////////////////////////////////

  const abc = () => {

    // let headerNavigationWidth = mainNavigation.offsetWidth || 0;
    // let headerNavigationOffset = mainNavigation.getBoundingClientRect() || {};
    // let headerNavigationOffsetLeft = mainNavigation.left || 0;

    let navigation = {
      element: document.querySelector('.header__main-navigation') || false,
    };
    let subnaviation = {
      main: navigation.element.querySelectorAll('.sub-navigation__main') || [],
      media: navigation.element.querySelectorAll('.sub-navigation__media') || [],
      wrapper: navigation.element.querySelectorAll('.sub-navigation__wrapper') || []
    };

    if ( navigation.element ) {
      navigation.width = navigation.element.offsetWidth || 0;
      navigation.offsetLeft = navigation.element.getBoundingClientRect().left || 0;
      if ( navigation.width && subnaviation.wrapper ) {
        subnaviation.wrapper.forEach( wrapper => {
          wrapper.style.width = navigation.width + 'px';
        });
      }
    }

  };

  //////////////////////////////////////////////////////////
  ////  Hover
  //////////////////////////////////////////////////////////

  const hover = () => {

    let links = ( document.querySelectorAll('.header .navigation__item.has-links') || [] );

    links.forEach( item => {
      item.addEventListener('mouseenter', event => {
        clearTimeout(timeout);
        links.forEach( item => { item.classList.remove('sub-navigation-active'); });
        item.classList.add('sub-navigation-active');
        item.closest('.header').classList.add('sub-navigation-active');
      });
    });

    links.forEach( item => {
      item.addEventListener('mouseleave', event => {
        timeout = setTimeout(function(){
          item.classList.remove('sub-navigation-active');
          item.closest('.header').classList.remove('sub-navigation-active');
        }, timeoutValue);
      });
    });

    ( document.querySelectorAll('.header .sub-navigation__link') || [] ).forEach( item => {
      item.addEventListener('mouseenter', event => {

        let image = item.dataset.featuredImage || false;
        let element = item.closest('.sub-navigation').querySelector('.sub-navigation__background-image') || false;

        if ( image ) {
          element.dataset.bg = image;
        }

      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Subnavigation Hover
  //////////////////////////////////////////////////////////

  const hoverSubNavigation = () => {

    let links = ( document.querySelectorAll('.header .sub-navigation__item.has-links') || [] );

    links.forEach( item => {
      item.addEventListener('mouseenter', event => {
        clearTimeout(subTimeout);
        links.forEach( item => { item.classList.remove('sub-sub-navigation-active'); });
        item.classList.add('sub-sub-navigation-active');
        let subSubNavigationID = item.dataset.subSubNavId || '';
        let subSubNavigation = document.getElementById('subSubNavigationID');
      });
    });


  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    abc();
    hover();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {

          abc();
          throttled = false;

        });
        throttled = true;
      }
    });

    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
  };

});
