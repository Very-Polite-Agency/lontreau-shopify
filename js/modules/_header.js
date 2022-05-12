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

    ( document.querySelectorAll('.navigation__item.has-links') || [] ).forEach( item => {

      let abc = item.querySelector('.sub-navigation__main') || false;
      let offset = item.getBoundingClientRect() || {};
      let offsetLeft = offset.left || 0;

      if ( abc && offsetLeft ) {
        abc.style.left = offsetLeft + 'px';
      }

    });

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
