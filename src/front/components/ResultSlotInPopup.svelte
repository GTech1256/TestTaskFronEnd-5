<script>
  import { calculateConversion } from '../api/conversion.js';
  
  import basketStore from '../store/basket.js';

  let isError = false,
      isLoaded = false;

  let basketObject = {};

  basketStore.subscribe((value) => {
    basketObject = value;
  })

  let result = {
    USD: 0,
    RUB: 0,
    EUR: 0
  };

  calculateConversion(
    Object.values(basketObject).map(
      good => ({ _id: good._id, count: good.count_in_basket})
    )
  ).then(data => {
    result = data;
    isLoaded = true;
  }).catch(e => {
    console.log(e);
    isLoaded = true;
    isError = true;
  })

</script>

{#if !isLoaded}
  <p>Загрузка...</p>
{:else if isError}
  <p>Ошибка при загузке. Подробности в консоли</p>
{:else}
  <p>USD: {result.USD.toFixed(2)}</p>
  <p>RUB: {result.RUB.toFixed(2)}</p>
  <p>EUR: {result.EUR.toFixed(2)}</p>
{/if}
    
<style lang="scss">
</style>
