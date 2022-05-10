const onClickUpdateCartLineQty = () => {
  ( document.querySelectorAll('.js--line-item-quantity-update') || [] ).forEach( button => {
    button.addEventListener('click', event => {

      let inputID = button.dataset.targetId || '';
      let input = document.getElementById(inputID) || false;

      if ( input ) {

        let max = parseInt(input.max) || 9999;
        let quantity = parseInt(input.value);

        if ( button.classList.contains('increase') ) {
          quantity = ++quantity;
        } else {
          quantity = --quantity;
        }

        input.value = ( quantity > 0 ) ? quantity : 0;

        updateCartLineQtyButtonState( quantity, max, button );

      }

    });
  });
};

const updateCartLineQtyButtonState = ( $quantity = 0, $max = 1, $button = false ) => {

  let stepper = $button.closest('.stepper') || false;
  let btnDecrease = stepper.querySelector('button.decrease') || false;
  let btnIncrease = stepper.querySelector('button.increase') || false;

  if ( btnDecrease && btnIncrease ) {
    if ( $quantity == 0 ) {
      btnDecrease.disabled = true;
      btnIncrease.disabled = false;
    } else if ( $quantity > 0 && $quantity < $max ) {
      btnDecrease.disabled = false;
      btnIncrease.disabled = false;
    } else {
      btnDecrease.disabled = false;
      btnIncrease.disabled = true;
    }
  }

}

onClickUpdateCartLineQty();
