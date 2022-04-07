//////////////////////////////////////////////////////////
////  Theme
//////////////////////////////////////////////////////////

const Theme = (() => {

  const debug = false;
  const info = { name : 'Theme', version : '1.0' };

  let currentTime = new Date();

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $modules = [] ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
      $modules.forEach(( module ) => {
        module.init();
      });
    if ( debug ) {
      console.log( '================================================' );
      console.log( 'Theme Updated ::', currentTime.toLocaleString('en-US') );
      console.log( '================================================' );
    }
    if ( debug ) console.log( `${info.name}.init() Finished` );

  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init
  };

})();
