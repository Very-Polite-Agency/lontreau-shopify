//////////////////////////////////////////////////////////
////  Header
//////////////////////////////////////////////////////////

const Header = (() => {

  let debug = false;
  let info = { name : 'Header', version : '1.0' };
  let throttled = false;
  let timeout = {
    navigation: null,
    subNavigation: null,
    duration: 500
  };

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
  ////  Navigation Hover
  //////////////////////////////////////////////////////////

  const hoverNavigation = () => {

    let links = ( document.querySelectorAll('.header .navigation__item.has-links') || [] );

    links.forEach( link => {

      // ---------------------------------------- Mouse Enter
      link.addEventListener('mouseenter', event => {
        clearTimeout(timeout.navigation);
        links.forEach( link => link.classList.remove('active') );
        link.classList.add('active');
      });

      // ---------------------------------------- Mouse Leave
      link.addEventListener('mouseleave', event => {
        timeout.navigation = setTimeout(function(){
          link.classList.remove('active');
        }, timeout.duration);
      });

    });

  };

  //////////////////////////////////////////////////////////
  ////  Sub-navigation Hover
  //////////////////////////////////////////////////////////

  const hoverSubNavigation = () => {

    let links = ( document.querySelectorAll('.header .sub-navigation__item') || [] );

    links.forEach( link => {

      // ---------------------------------------- Mouse Enter
      link.addEventListener('mouseenter', event => {

        if ( link.classList.contains('has-links') ) {
          clearTimeout(timeout.subNavigation);
          links.forEach( link => link.classList.remove('active') );
          link.classList.add('active');
        }

        let image = link.dataset.featuredImage || '';
        let backgroundElement = link.closest('.sub-navigation').querySelector('.sub-navigation__background') || false;
        backgroundElement.dataset.bg = ( backgroundElement && image ) ? image : '';

      });

      // ---------------------------------------- Mouse Leave
      link.addEventListener('mouseleave', event => {
        if ( link.classList.contains('has-links') ) {
          timeout.subNavigation = setTimeout(function(){
            link.classList.remove('active');
          }, timeout.duration - 250 );
        }
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
