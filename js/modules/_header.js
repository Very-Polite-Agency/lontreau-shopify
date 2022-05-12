//////////////////////////////////////////////////////////
////  Header
//////////////////////////////////////////////////////////

const Header = (() => {

  let debug = false;
  let info = { name : 'Header', version : '1.0' };
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  ABC
  //////////////////////////////////////////////////////////

  const abc = () => {

    let headerNavigation = document.querySelector('.header__navigation') || false;
    let headerNavigationOffset = headerNavigation.getBoundingClientRect() || {};
    let headerNavigationOffsetLeft = headerNavigationOffset.left || 0;
    let headerSubnavigation = headerNavigation.querySelectorAll('.sub-navigation__main') || [];

    if ( headerNavigationOffsetLeft ) {
      headerSubnavigation.forEach( item => {
        item.style.left = headerNavigationOffsetLeft + 'px';
      });
    }

  };

  //////////////////////////////////////////////////////////
  ////  Hover
  //////////////////////////////////////////////////////////

  const hover = () => {

    ( document.querySelectorAll('.sub-navigation') || [] ).forEach( subnav => {
      subnav.addEventListener('mouseenter', event => {
        console.log( event );
      });
    });

    ( document.querySelectorAll('.sub-navigation') || [] ).forEach( subnav => {
      subnav.addEventListener('mouseleave', event => {
        console.log( event );
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
