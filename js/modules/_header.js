//////////////////////////////////////////////////////////
////  Header
//////////////////////////////////////////////////////////

const Header = (() => {

  let debug = false;
  let info = { name : 'Header', version : '1.0' };
  let throttled = false;
  let timeout;
  let subTimeout;
  let timeoutValue = 100000;

  //////////////////////////////////////////////////////////
  ////  ABC
  //////////////////////////////////////////////////////////

  const abc = () => {

    let headerNavigation = document.querySelector('.header__main-navigation') || false;
    let headerNavigationWidth = headerNavigation.offsetWidth || 0;
    let headerNavigationOffset = headerNavigation.getBoundingClientRect() || {};
    let headerNavigationOffsetLeft = headerNavigationOffset.left || 0;
    let headerSubnavigationMain = headerNavigation.querySelectorAll('.sub-navigation__main') || [];
    let headerSubnavigationMedia = headerNavigation.querySelectorAll('.sub-navigation__media') || [];

    if ( headerNavigationOffsetLeft ) {
      headerSubnavigationMain.forEach( item => {
        item.style.left = headerNavigationOffsetLeft + 'px';
      });
      headerSubnavigationMedia.forEach( item => {
        item.style.left = headerNavigationOffsetLeft + 'px';
        item.style.width = headerNavigationWidth + 'px';
      });
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
