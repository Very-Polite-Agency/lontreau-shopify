//////////////////////////////////////////////////////////
////  Mobile Menu
//////////////////////////////////////////////////////////

const MobileMenu = (() => {

  let debug = false;
  let info = { name : 'MobileMenu', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let elements = tools.getArrayOfElementsByTag();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Toggle Mobile Menu
  //////////////////////////////////////////////////////////

  const toggleMobileMenu = () => {
    ( document.querySelectorAll('.js--mobile-menu-trigger') || [] ).forEach( trigger => {
      trigger.addEventListener('click',() => {
        tools.toggleClass( 'mobile-menu--active', elements );
        trigger.classList.toggle( 'is-active' );
      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Close Mobile Menu
  //////////////////////////////////////////////////////////

  const closeMobileMenu = () => {
    ( document.querySelectorAll('.js--mobile-menu-trigger') || [] ).forEach( trigger => {
      trigger.classList.remove( 'is-active' );
    });
    tools.removeClass( 'mobile-menu--active', elements );
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {
    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    toggleMobileMenu();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          if ( window.innerWidth >= breakpoints.sizes.lg ) {
            closeMobileMenu();
          }
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
