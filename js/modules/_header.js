//////////////////////////////////////////////////////////
////  Header
//////////////////////////////////////////////////////////

const Header = (() => {

  let debug = false;
  let info = { name : 'Header', version : '1.0' };
  let throttled = false;
  let timeout;
  let subTimeout;
  let timeoutValue = 1000;

  //////////////////////////////////////////////////////////
  ////  ABC
  //////////////////////////////////////////////////////////

  const setSubnavigationWidthFromNavigationWidth = () => {

    // let headerNavigationWidth = mainNavigation.offsetWidth || 0;
    // let headerNavigationOffset = mainNavigation.getBoundingClientRect() || {};
    // let headerNavigationOffsetLeft = mainNavigation.left || 0;

    let navigation = document.getElementById('header__navigation') || false;
    let subNaviation = {
      main: navigation.querySelectorAll('.sub-navigation') || [],
      list: navigation.querySelectorAll('.sub-navigation__list') || [],
      wrapper: navigation.querySelectorAll('.sub-navigation__wrapper') || [],
    };

    if ( navigation ) {
      navigation.width = navigation.offsetWidth || 0;
      navigation.offsetLeft = navigation.getBoundingClientRect().left || 0;
      if ( navigation && subNaviation.wrapper ) {
        subNaviation.wrapper.forEach( element => {
          element.style.width = navigation.width + 'px';
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

      // ---------------------------------------- Mouse Enter
      item.addEventListener('mouseenter', event => {
        clearTimeout(timeout);
        links.forEach( item => { item.classList.remove('sub-navigation-active'); });
        item.classList.add('sub-navigation-active');
        item.closest('.header').classList.add('sub-navigation-active');
      });

      // ---------------------------------------- Mouse Leave
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
  ////  Navigation Hover
  //////////////////////////////////////////////////////////

  const hoverNavigation = () => {

    let links = ( document.querySelectorAll('.header .navigation__item.has-links') || [] );

    links.forEach( link => {
      // ---------------------------------------- Mouse Enter
      link.addEventListener('mouseenter', event => {
        clearTimeout(timeout);
        links.forEach( link => link.classList.remove('active') );
        link.classList.add('active');
      });
      // ---------------------------------------- Mouse Leave
      link.addEventListener('mouseleave', event => {
        timeout = setTimeout(function(){
          link.classList.remove('active');
        }, timeoutValue);
      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Sub-navigation Hover
  //////////////////////////////////////////////////////////

  const hoverSubNavigation = () => {

    let links = ( document.querySelectorAll('.header .sub-navigation__item.has-links') || [] );

    links.forEach( link => {
      // ---------------------------------------- Mouse Enter
      link.addEventListener('mouseenter', event => {
        clearTimeout(subTimeout);
        links.forEach( link => link.classList.remove('active') );
        link.classList.add('active');
      });
      // ---------------------------------------- Mouse Leave
      link.addEventListener('mouseleave', event => {
        subTimeout = setTimeout(function(){
          link.classList.remove('active');
        }, timeoutValue);
      });
    });

  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    setSubnavigationWidthFromNavigationWidth();
    hoverNavigation();
    hoverSubNavigation();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          setSubnavigationWidthFromNavigationWidth();
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
