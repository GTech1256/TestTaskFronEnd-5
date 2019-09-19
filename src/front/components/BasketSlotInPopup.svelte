<script>
  import basketStore from '../store/basket.js';

  let basketObject = {
    /*
      [_id]: {name, price, quantity, count_in_basket}
    */
  };

  basketStore.subscribe(value => {
    basketObject = value
  });
  

  function removeGoodFromBasketStore(item) {
    return () => {
      basketObject[item._id].count_in_basket--

      if (basketObject[item._id].count_in_basket === 0) {
        delete basketObject[item._id];
      }

      basketStore.set(basketObject);
    }
  }
</script>


{#each Object.values(basketObject) as item (item._id)}
  <div class="basket__item">
    <p class="basket__item-name" title="{ item.name }">
      { item.name }
    </p>
    <p>
      в корзине { item.count_in_basket } шт.
    </p>
    <button class="basket__remove-btn" type="button" on:click={removeGoodFromBasketStore(item)}>Удалить из корзины</button>
</div>
{:else}
<p>Корзина пуста</p>
{/each}


<style lang="scss">

.basket__item {
  display: flex;

  justify-content: space-between;
}

.basket__remove-btn {
  cursor: pointer;
}

.basket__item-name {
  width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
