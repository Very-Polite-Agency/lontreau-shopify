//////////////////////////////////////////////////////////
////  Stepper
//////////////////////////////////////////////////////////

const Stepper = (() => {

  let debug = false;
  let info = { name : 'Stepper', version : '1.0' };

  //////////////////////////////////////////////////////////
  ////  On Click, Update Stepper Input
  //////////////////////////////////////////////////////////

  const onClickUpdateStepperInput = () => {
    ( document.querySelectorAll('.js--update-stepper-input') || [] ).forEach( button => {
      button.addEventListener('click', event => {

        console.log( 'onClickUpdateStepperInput clicked!', button );

        let stepper = button.closest('.stepper') || false;
        let stepperInput = stepper.querySelector('.stepper__input') || false;

        if ( stepperInput ) {

          let max = parseInt(stepperInput.max) || 9999;
          let quantity = parseInt(stepperInput.value);

          if ( button.classList.contains('increase') ) {
            quantity = ++quantity;
          } else {
            quantity = --quantity;
          }

          stepperInput.value = ( quantity > 0 ) ? quantity : 0;

          updateStepperButtonsState( stepper, quantity, max );

        }

      });
    });
  };

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const updateStepperButtonsState = ( $stepper = false, $quantity = 0, $max = 9999 ) => {

    let stepperBtnDecrease = $stepper.querySelector('.stepper__button.decrease') || false;
    let stepperBtnIncrease = $stepper.querySelector('.stepper__button.increase') || false;

    if ( stepperBtnDecrease && stepperBtnIncrease ) {
      if ( $quantity == 0 ) {
        stepperBtnDecrease.disabled = true;
        stepperBtnIncrease.disabled = false;
      } else if ( $quantity > 0 && $quantity < $max ) {
        stepperBtnDecrease.disabled = false;
        stepperBtnIncrease.disabled = false;
      } else {
        stepperBtnDecrease.disabled = false;
        stepperBtnIncrease.disabled = true;
      }
    }

  }

  //////////////////////////////////////////////////////////
  ////  Init
  //////////////////////////////////////////////////////////

  const init = ( $options = false ) => {
    if ( debug ) console.log( `${info.name}.init() v.${info.version} Started` );
    onClickUpdateStepperInput();
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
