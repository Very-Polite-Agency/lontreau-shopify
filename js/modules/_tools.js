//////////////////////////////////////////////////////////
////  Tools
//////////////////////////////////////////////////////////

const Tools = (() => {

  const debug = false;
  const info = { name : 'Tools', version : '1.0' };

  //////////////////////////////////////////////////////////
  ////  Get Local Storage Value by Key
  //////////////////////////////////////////////////////////

  const getLocalStorageValueByKey = ( $key ) => {
    return localStorage.getItem( $key );
  }

  //////////////////////////////////////////////////////////
  ////  Get Elemetn Padding
  //////////////////////////////////////////////////////////

  const getPadding = ( $element ) => {

		let style = $element.currentStyle || window.getComputedStyle($element);
    let result = {
      getLeft: function() {
        return parseInt(style.paddingLeft);
      },
      getTop: function() {
        return parseInt(style.paddingTop);
      },
      getRight: function() {
        return parseInt(style.paddingRight);
      },
      getBottom: function() {
        return parseInt(style.paddingBottom);
      }
    }

  	return result;

  }

  //////////////////////////////////////////////////////////
  ////  Set Local Storage Value
  //////////////////////////////////////////////////////////

  const setLocalStorage = ( $key, $value ) => {
    localStorage.setItem( $key, $value );
  }

  //////////////////////////////////////////////////////////
  ////  Set Total Header Height to CSS Variable
  //////////////////////////////////////////////////////////

  const setHeaderHeightTotalCSSVariable = () => {
    let headerHeight = getElementHeightByTag('header') || false;
    if ( headerHeight ) setCSSVariable( 'theme-header-height--total', headerHeight + 'px' );
  };


  //////////////////////////////////////////////////////////
  ////  Get Element Height by Tag
  //////////////////////////////////////////////////////////

  const getElementHeightByTag = ( $tag = '' ) => {
    let element = document.getElementsByTagName( $tag )[0] || false;
    if ( element ) {
      return element.offsetHeight;
    }
    return 0;
  };

  //////////////////////////////////////////////////////////
  ////  Get Main Elements
  /////////////////////////////////////////////////////////

  const getArrayOfElementsByTag = ( $elements = [ 'body', 'footer', 'header', 'main' ] ) => {
    let filteredElements = $elements.filter( tag => { return document.getElementsByTagName( tag )[0] } ) || [];
    return filteredElements.map( tag => document.getElementsByTagName( tag )[0] ) || [];
  };

  //////////////////////////////////////////////////////////
  ////  Add Class
  //////////////////////////////////////////////////////////

  const addClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.add( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Remove Class
  //////////////////////////////////////////////////////////

  const removeClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.remove( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Toggle Class
  //////////////////////////////////////////////////////////

  const toggleClass = ( $class = '', $elements = [] ) => {
    if ( $class && $elements.length ) {
      for( let i = 0; i < $elements.length; i++ ) {
        if ( $elements[i] ) {
          $elements[i].classList.toggle( $class );
        }
      }
    }
  };

  //////////////////////////////////////////////////////////
  ////  Set CSS Variable
  //////////////////////////////////////////////////////////

  const setCSSVariable = ( $id = '', $value = '' ) => {
    if ( $id && $value ) {
      document.documentElement.style.setProperty( '--' + $id, $value );
    }
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    addClass,
    getLocalStorageValueByKey,
    getPadding,
    getElementHeightByTag,
    getArrayOfElementsByTag,
    removeClass,
    setCSSVariable,
    setLocalStorage,
    setHeaderHeightTotalCSSVariable,
    toggleClass
  };

});
