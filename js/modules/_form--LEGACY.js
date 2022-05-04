//////////////////////////////////////////////////////////
////  Forms
//////////////////////////////////////////////////////////

const Forms = (() => {

  let debug = false;
  let info = { name : 'Forms', version : '2.1' };

  let tools = new Tools();
  let customer = new Customer();
  let messages = {
    error: {
      429: "Too many attempts to recover password. Please try again later.",
    },
    success: {
      password_recover: "We've sent you an email with a link to update your password.",
      register_account: "Thanks for registering! You will be redirected shortly."
    },
  };

  //////////////////////////////////////////////////////////
  ////  Check if Field is Valid
  //////////////////////////////////////////////////////////

  const isFieldValid = ( $field = false ) => {

    console.log( 'isFieldValid() start' );

    let value = '';
    let isValid = false;
    let name = $field.name || 'no-name';
    let type = $field.type || 'no-type';
    let nodeName = $field.nodeName || 'no-node-name';

    switch ( nodeName ) {
      case 'INPUT':
        switch ( type ) {

          case 'email':
            if ( validator.isEmail( $field.value ) ) {
              isValid = true;
            }
            break;

          case 'radio':
            break;

          case 'tel':
            if ( validator.isMobilePhone( $field.value ) ) {
              isValid = true;
            }
            break;

          case 'password':
          case 'text':
            if ( ! validator.isEmpty( $field.value ) ) {
              isValid = true;
            }
            break;

        }
        break;
      case 'TEXTAREA':
        if ( ! validator.isEmpty( $field.value ) ) {
          isValid = true;
        }
        break;
    }

    if ( isValid ) {
      tools.removeClass( 'error', [ $field.closest('.form__field') ] );
    } else {
      tools.addClass( 'error', [ $field.closest('.form__field') ] );
    }

    console.log( { type, name, nodeName, isValid } );
    console.log( 'isFieldValid() finish' );

    return isValid;

  };

  //////////////////////////////////////////////////////////
  ////  Check if Form is Valid
  //////////////////////////////////////////////////////////

  const isFormValid = ( $form = false ) => {

    let isValid = true;
    let requiredFields = $form.querySelectorAll('.required') || [];

    for ( let i = 0; i < requiredFields.length; i++ ) {
      console.log( 'isFormValid() loop count' + i );
      if ( !isFieldValid( requiredFields[i] ) ) {
        isValid = false;
      }
    }

    return isValid;

  };

  //////////////////////////////////////////////////////////
  ////  Check for Spam
  //////////////////////////////////////////////////////////

  const hasSpam = ( $form = false ) => {

    let rudeFields = $form.querySelectorAll('input.rude') || [];

    for ( let i = 0; i < rudeFields.length; i++ ) {
      if ( rudeFields[i].value ) {
        return true;
      }
    }

    return false;

  };

  //////////////////////////////////////////////////////////
  ////  Hide Form Area
  //////////////////////////////////////////////////////////

  const hideFormMain = ( $form = false, $callback = false ) => {

    let formMain = $form.querySelector('.form__main') || false;

    if ( formMain ) {
      anime({
        targets: formMain,
        opacity: 0,
        delay: 250,
        duration: 500,
        easing: 'easeInOutCirc',
        begin: function(anim) {},
        complete: function(anim) {
          formMain.style.display = 'none';
          $callback( $form );
        }
      });
    }

  };

  //////////////////////////////////////////////////////////
  ////  Show Form Area
  //////////////////////////////////////////////////////////

  const showFormSuccess = ( $form = false ) => {

    let formSuccess = $form.querySelector('.form__success') || false;

    if ( formSuccess ) {
      formSuccess.style.display = 'block';
      anime({
        targets: formSuccess,
        opacity: 1,
        delay: 250,
        duration: 750,
        endDelay: 0,
        easing: 'easeInOutCirc',
        begin: function(anim) {},
        complete: function(anim) {}
      });
    }

  };

  //////////////////////////////////////////////////////////
  ////  Submit Form via Axios
  //////////////////////////////////////////////////////////

  const submitForm = ( $form = false, $redirectURL = false ) => {

    let formAction = $form.action || false;
    let formData = new FormData( $form );

    console.log( { formData, $form } );

    if ( formAction && formData ) {

      axios.post( formAction, formData )
      .then(function (response) {

        if ( debug ) console.log( 'submitForm() Success', formAction, response );

        setTimeout(function(){
          switch( formAction ) {
            case 'https://optimilife.com/account/recover':
              $form.innerHTML = `<div class='rte' style='text-align: center;'><p>${ messages.success.password_recover }</p></div>`;
              break;
            case 'https://optimilife.com/account':
              $form.innerHTML = `<div class='rte' style='text-align: center;'><p>${ messages.success.register_account }</p></div>`;
              setTimeout(function(){
                window.location.replace("https://optimilife.com/account/login");
              }, 2500 );
              break;
            default:
              hideFormMain( $form, showFormSuccess );
              break;
          }
        }, 500 );

      })
      .catch(function (error) {

        if ( debug ) console.log( 'submitForm() Error', error.response );

        setTimeout(function(){

          $form.querySelectorAll('.form__row.intro').forEach( element => {
            element.remove();
          });

          $form.querySelectorAll('.form__row.error-status').forEach( element => {
            element.innerHTML = `<p>${ messages.error[ error.response.status ] }</p>`;
            element.style.display = 'block';
          });

        }, 500 );

      });

    }

  };

  //////////////////////////////////////////////////////////
  ////  Initialize
  //////////////////////////////////////////////////////////

  const init = () => {
    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );

      document.querySelectorAll('.js--validate-me [type="submit"]').forEach( button => {

        button.addEventListener('click', ( event ) => {

          event.preventDefault();

          let form = button.closest( 'form' );
          let formRedirectURL = false;
          let formValid = isFormValid( form );
          let formHasSpam = hasSpam( form );

          if ( debug ) console.log( `${info.name}.init()`, { formValid, formHasSpam } );

          if ( formValid && !formHasSpam ) {
            submitForm( form, formRedirectURL );
          }

        });

      });

    if ( debug ) console.log( `${info.name}.init() Finished` );
  };

  //////////////////////////////////////////////////////////
  ////  Returned Methods
  //////////////////////////////////////////////////////////

  return {
    info,
    init
  };

});
