//////////////////////////////////////////////////////////
////  Sizing
//////////////////////////////////////////////////////////

const Sizing = (() => {

  let debug = false;
  let info = { name : 'Sizing', version : '1.0' };

  let tools = new Tools();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Set Header Total Height to CSS Var
  //////////////////////////////////////////////////////////

  const setViewportHeightTotalCSSVariable = () => {
    let height = window.innerHeight;
    if ( height ) tools.setCSSVariable( 'theme-viewport-height--total', height + 'px' );
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    tools.setHeaderHeightTotalCSSVariable();
    setViewportHeightTotalCSSVariable();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          tools.setHeaderHeightTotalCSSVariable();
          setViewportHeightTotalCSSVariable();
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
