//////////////////////////////////////////////////////////
////  Forms
//////////////////////////////////////////////////////////

const Forms = (() => {

  let debug = true;
  let info = { name : 'Forms', version : '2.1' };

  let tools = new Tools();
  let maxMB = 25.0;
  let maxFiles = 4.0;
  let formFiles = [];
  let totalMD = 0.0;
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

    let value = $field.value || 'error';
    let isValid = false;
    let name = $field.name || 'no-name';
    let type = $field.type || 'no-type';
    let nodeName = $field.nodeName || 'no-node-name';

    switch ( nodeName ) {

      case 'INPUT':
        switch ( type ) {

          case 'checkbox':
            if ( $field.checked ) {
              isValid = true;
            }
            break;

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
            if ( ! validator.isEmpty( $field.value.trim() ) ) {
              isValid = true;
            }
            break;

        }
        break;

      case 'SELECT':
        if ( $field.value ) {
          isValid = true;
        }
        break;

      case 'TEXTAREA':
        if ( ! validator.isEmpty( $field.value.trim() ) ) {
          isValid = true;
        }
        break;

    }

    if ( isValid ) {
      tools.removeClass( 'error', [ $field.closest('.form__field') ] );
    } else {
      tools.addClass( 'error', [ $field.closest('.form__field') ] );
    }

    if ( debug ) console.log( { type, name, nodeName, isValid, value } );
    if ( debug ) console.log( 'isFieldValid() finish' );

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

    let elements = $form.querySelectorAll('input.rude') || [];

    for ( let i = 0; i < elements.length; i++ ) {
      if ( elements[i].value ) {
        return true;
      }
    }

    return false;

  };

  //////////////////////////////////////////////////////////
  ////  Check Form Files Under Size Limit
  //////////////////////////////////////////////////////////

  const underFileSizeLimit = ( $form = false ) => {

    if ( debug ) console.log( 'underFileSizeLimit() start' );

    let inputs = $form.querySelectorAll('input[type="file"]') || [];
    formFiles.length = 0;
    totalMB = 0;

    for ( let i = 0; i < inputs.length; i++ ) {

      let input = inputs[i];
      let field = input.closest('.field');
      let fieldErrorMessage = field.querySelector('.field__error-message') || false;
      let files = input.files || {};
      let message = '';
      for ( let key in files ) {
        totalMB += files[key].size || 0;
        if ( files[key].size ) {
          formFiles.push( files[key] );
        }
      }

      totalMB = totalMB/1024/1024;

      if ( totalMB > maxMB ) {
        message = `The current total file size (${totalMB.toFixed(1)}MB) is larger than the ${maxMB}.0MB limit`;
        field.classList.add( 'error' );
        if ( fieldErrorMessage ) fieldErrorMessage.innerHTML = message;
        return false;
      } else {
        if ( fieldErrorMessage ) fieldErrorMessage.innerHTML = message;
        field.classList.remove( 'error' );
      }

    }

    if ( debug ) console.log( 'underFileSizeLimit() end', { totalMB, maxMB });

    return true;

  };

  //////////////////////////////////////////////////////////
  ////  Check Form Files Under Count Limit
  //////////////////////////////////////////////////////////

  const underFileCountLimit = ( $form = false ) => {

    let totalFiles = 0;
    let inputs = $form.querySelectorAll('input[type="file"]') || [];

    for ( let i = 0; i < inputs.length; i++ ) {

      let files = inputs[i].files || {};
      totalFiles += files.length;

      if ( totalFiles > maxFiles ) {
        if ( debug ) console.log({ totalFiles });
        inputs[i].value = '';
        alert(`Too many files selected. The limit is ${maxFiles}.`);  // display string message
        return false;
      }

    }

    if ( debug ) console.log({ totalFiles });
    return true;

  }

  //////////////////////////////////////////////////////////
  ////  Submit Form via Axios
  //////////////////////////////////////////////////////////

  const submitForm = ( $form = false ) => {

    let formAction = $form.action || false;
    let formData = new FormData( $form );
    let redirectURL = $form.dataset.redirectUrl || false;
    let options = {
      headers: {
        processData: false,
        contentType: false,
      },
    };

    formFiles.forEach( ( file, index ) => {
      formData.append( 'additional_docs' , file );
    });

    $form.classList.add('posting');

    axios.post( formAction, formData, options )
      .then(( data ) => {
        if ( debug ) console.log( 'then() data :: ', data );
        if ( redirectURL ) {
          window.location.replace( redirectURL );
        }
      })
      .catch(( data ) => {
        console.log( 'catch() data :: ', data );
      }).finally(() => {
        $form.reset();
        setTimeout(() => {
          $form.classList.remove('posting');
        }, 2500 );
    });

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
          let formUnderFileSizeLimit = underFileSizeLimit( form );
          let formUnderFileCountLimit = underFileCountLimit( form );
          let formReadyForSubmission = ( formValid && !formHasSpam && formUnderFileSizeLimit && formUnderFileCountLimit ) ? true : false;

          if ( debug ) console.log( `${info.name}.init()`, { formValid, formHasSpam, formUnderFileSizeLimit, formUnderFileCountLimit, formReadyForSubmission } );

          if ( formReadyForSubmission ) {
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
