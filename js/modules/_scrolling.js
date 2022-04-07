//////////////////////////////////////////////////////////
////  Scrolling
//////////////////////////////////////////////////////////

const Scrolling = (() => {

	let debug = false;
	let info = { name : 'Scrolling', version : '1.0' };

  let tools = new Tools();
  let elements = tools.getArrayOfElementsByTag();

  let throttled = false;
  let scrollClasses = {
    atTop: 'scroll-position--at-top',
    scrolled: 'scroll-position--scrolled',
    scrollingDown: 'scroll-position--scrolling-down',
    scrollingUp: 'scroll-position--scrolling-up',
  };
  let scrollPosition = {
    current: window.pageYOffset || document.documentElement.scrollTop,
    initial: window.pageYOffset || document.documentElement.scrollTop,
    previous: window.pageYOffset || document.documentElement.scrollTop,
    down: false
  };

  //////////////////////////////////////////////////////////
  ////  Set Scroll State Classes by Scroll Position
  //////////////////////////////////////////////////////////

  const setScrollStateClassesByScrollPosition = ( $scrollPos = 0 ) => {

    // assign scroll direction
    scrollPosition.down = ( scrollPosition.current > scrollPosition.previous ) ? true : false;

    // set scrolling action state
    if ( $scrollPos > 15 ) {
      tools.addClass( scrollClasses.scrolled, elements );
    } else {
      tools.removeClass( scrollClasses.scrolled, elements );
    }

    // set scroll top position state
    if ( $scrollPos === 0 ) {
      tools.addClass( scrollClasses.atTop, elements );
    } else {
      tools.removeClass( scrollClasses.atTop, elements );
    }

    // set scroll direction down state
    if ( scrollPosition.down ) {
      tools.addClass( scrollClasses.scrollingDown, elements );
      tools.removeClass( scrollClasses.scrollingUp, elements );
    } else {
      tools.addClass( scrollClasses.scrollingUp, elements );
      tools.removeClass( scrollClasses.scrollingDown, elements );
    }

  };

  //////////////////////////////////////////////////////////
  ////  Element is in view
  //////////////////////////////////////////////////////////

  const elementIsInView = ( $element = false ) => {

    let viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    if ( $element ) {
      let bounding = $element.getBoundingClientRect();
      console.log( bounding );
    }

    return false;

  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {

    if ( debug ) console.log( `${info.name}.init() Started` );

    setScrollStateClassesByScrollPosition( scrollPosition.current );
    tools.setHeaderHeightTotalCSSVariable();

    // ---------------------------------------- On resize
    document.addEventListener( 'scroll', function(e) {

      scrollPosition.previous = scrollPosition.current;
      scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;

      if ( !throttled ) {
        window.requestAnimationFrame(function() {
          setScrollStateClassesByScrollPosition( scrollPosition.current );
          tools.setHeaderHeightTotalCSSVariable();
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
    init
  };

});
