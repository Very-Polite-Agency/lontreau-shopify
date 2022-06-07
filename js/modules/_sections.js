//////////////////////////////////////////////////////////
////  Sections
//////////////////////////////////////////////////////////

const Sections = (() => {

  let debug = false;
  let info = { name : 'Sections', version : '1.0' };

  let tools = new Tools();
  let breakpoints = new Breakpoints();
  let throttled = false;

  //////////////////////////////////////////////////////////
  ////  Set Header Total Height to CSS Var
  //////////////////////////////////////////////////////////

  const setfiftyFiftyFramedVrWidth = () => {

    let blockElement = '.fifty-fifty-framed';
    let viewportWidth = window.innerWidth;
    let offset = 60;

    ( document.querySelectorAll(`${blockElement}`) || [] ).forEach( element => {

      let elementHeight = element.offsetHeight || false;
      let vr = element.querySelector(`${blockElement}__vr`) || false;
      let content = element.querySelector(`${blockElement}__content`) || false;
      let contentVerticalPadding = tools.getPadding(content).getTop() + tools.getPadding(content).getBottom();

      if ( debug ) console.log( vr, contentVerticalPadding );

      if ( viewportWidth < breakpoints.sizes.lg ) {
        if ( vr && elementHeight && contentVerticalPadding ) {
          vr.style.width = (elementHeight - contentVerticalPadding) + 'px';
        }
      } else {
        vr.style.width = ( elementHeight - ( 2 * offset )) + 'px';
      }

    });

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

    setfiftyFiftyFramedVrWidth();

    // ---------------------------------------- On resize, execute functions
    window.addEventListener( 'resize', function(e) {
      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          setfiftyFiftyFramedVrWidth();
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
