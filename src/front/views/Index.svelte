<script>
  import { getAllGoods } from '../api/good';

  import { 
    basket as basketPopupStore, 
    result as resultPopupStore 
  }  from '../store/popups.js';

  import Good from '../components/Good.svelte'
  import SendBtn from '../components/SendBtn.svelte'
  import Header from '../components/Header.svelte'
  import LayoutPupup from '../components/LayoutPupup.svelte'
  import BasketSlotInPopup from '../components/BasketSlotInPopup.svelte'
  import ResultSlotInPopup from '../components/ResultSlotInPopup.svelte'

  let isOpenBasketPopup;
  let isOpenResultPopup;

  basketPopupStore.subscribe(value => {
		isOpenBasketPopup = value;
  });
  resultPopupStore.subscribe(value => {
		isOpenResultPopup = value;
  });

  let openResult = false;

  let goods = {
    data: [],
    isLoaded: false,
    isError: false
  };

  let goodsisLoaded = true;
  
  getAllGoods()
    .then((data) => {
      goods.data = data;
      goods.isLoaded = true;
      
    }).catch((e) => {
      console.log(e);
      goods.isLoaded = true;
      goods.isError = true;
    });
  
</script>

<section class="content">
  <Header titleName=Товары />

  <div class="content__items">
    {#each goods.data as good}
      <Good bind:good class="content__item" />
      {:else}
      {#if !goods.isLoaded}
        <h2 class="content__plug">Загрузка...</h2>
        {:else if goods.isError}
          <h2 class="content__plug">Ошибка при загрузке товара. Подробности в консоли</h2>
        {:else}
          <h2 class="content__plug">Товаров нет</h2>
      {/if}
    {/each}
  </div>
  <div><!-- div wrapper for IE11 flex fix -->
  {#if goods.isLoaded && !goods.isError}
    <SendBtn class="content__send-btn"/>
  {/if}
  </div>
</section>

<LayoutPupup class={isOpenBasketPopup ? 'popup_open' : ''} onCloseClick={() => (basketPopupStore.set(false))}>
  <BasketSlotInPopup/>
</LayoutPupup>

{#if isOpenResultPopup}
<LayoutPupup class={'popup_open'} onCloseClick={() => (resultPopupStore.set(false))}>
  <ResultSlotInPopup/>
</LayoutPupup>
{/if}

<style lang="scss">
.content {
  display: flex;
  height: 85%;

  flex-direction: column
}

.content__items {
  display: flex;
  
  flex-wrap: wrap;
}

.content__plug {
  margin: auto;
}

.content__title {
  text-align: center;
}

/* https://github.com/sveltejs/svelte/issues/2870#issuecomment-532648965 */
:global(.content__send-btn) {
  margin: auto;
  margin-bottom: 0;
}

@media (min-width: 1301px) {
  :global(.content__item) {
    margin-right: 80px;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}

@media (max-width: 1300px) {
  .content__items {
    justify-content: space-around;
  }

  .content__items {
    padding-top: 30px;
    order: 1;
  }
  
  :global(.content__send-btn) {
    margin-right: 0;
  }

  :global(.content__item) {
    width: 40%;
  }
}
</style>
