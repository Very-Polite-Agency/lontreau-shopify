//////////////////////////////////////////////////////////
////  Modals
//////////////////////////////////////////////////////////

const Modals = (() => {

  let debug = false;
  let info = { name : 'Modals', version : '2.5' };

  //////////////////////////////////////////////////////////
  ////  Close Modal
  //////////////////////////////////////////////////////////

  const onClickCloseModal = () => {
    document.querySelectorAll( '.button[data-micromodal-close]' ).forEach( button => {
      button.addEventListener( 'click', () => {
        let modal = button.closest('.modal') || false;
        let modalID = modal.id;
        if ( debug ) console.log( 'onClickCloseModal', modalID );
        if ( modalID ) toggleModalVisibility( modalID, 'close' );
      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Open Modal
  //////////////////////////////////////////////////////////

  const onClickOpenModal = () => {
    document.querySelectorAll( '.js--open-modal' ).forEach( button => {
      button.addEventListener( 'click', () => {
        let modalID = button.dataset.targetModalId || false;
        if ( debug ) console.log( 'onClickOpenModal', modalID );
        if ( modalID ) toggleModalVisibility( modalID, 'show' );
      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Toggle Modal Visibility
  //////////////////////////////////////////////////////////

  const toggleModalVisibility = ( $targetElementID = '', $method = 'show', $delay = 0 ) => {

    let modal = document.getElementById( $targetElementID ) || false;
    let acceptedMethods = [ 'show', 'close' ].includes( $method );

    if ( debug ) console.log( { $targetElementID, $method, $delay, modal, acceptedMethods } );

    if ( modal && acceptedMethods ) {
      setTimeout(function(){
        MicroModal[$method]( $targetElementID, {
          onShow: function( modal ) {},
          onClose: function( modal ) {},
          awaitCloseAnimation: true,
          disableScroll: true,
        });
      }, $delay );
    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {
    onClickOpenModal();
    onClickCloseModal();
  };

  //////////////////////////////////////////////////////////
  ////  Returned
  //////////////////////////////////////////////////////////

  return {
    debug,
    info,
    init,
    toggleModalVisibility,
  };

});
