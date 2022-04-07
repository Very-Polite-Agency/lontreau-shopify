//////////////////////////////////////////////////////////
////  Mobile Menu
//////////////////////////////////////////////////////////

const MobileMenu = (() => {

  let debug = false;
  let info = { name : 'MobileMenu', version : '1.0' };

  let tools = new Tools();
  let elements = tools.getArrayOfElementsByTag();

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
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {
    if ( debug ) console.log( `${info.name}.init() Started` );
    toggleMobileMenu();
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
