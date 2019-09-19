<script>
  import { result as resultPopupStore }  from '../store/popups.js';
  import basketStore from '../store/basket.js';

  let basketObject = {
    /*
      [_id]: {name, price, quantity, count_in_basket}
    */
  };

  basketStore.subscribe(value => {
    basketObject = value
  });
</script>

<button class="btn {$$props.class}" type="button" on:click={() => (resultPopupStore.set(true))}>Подсчитать</button>

<style lang="scss">
.btn {
  display: block;
  padding: 10px 20px;
  max-width: 400px;

  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;

  background-color: rgb(54, 115, 255);
  border: none;
  border-radius: 10px;
  box-shadow: 0 0px 5px 2px rgba(0, 0, 0, 0);

  transition: box-shadow 0.3s;

  cursor: pointer;

  &:hover {
    box-shadow: 0 5px 5px 2px rgba(0, 0, 0, 0.3);
  }
}

</style>
