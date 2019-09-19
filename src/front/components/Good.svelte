<script>
  import basketStore from '../store/basket.js';

  let basketObject = {
    /*
      [_id]: {name, price, quantity, count_in_basket}
    */
  };

  basketStore.subscribe(value => {
		
  });
  
  // let basketArray = [];


  basketStore.subscribe(value => {
		basketObject = value;
  });
 

  let good = {
    _id: 0,
    name: '',
    price: {
      EUR: 0,
      RUB: 0,
      USD: 0,
    },
    quantity: 0
  }

  const choisedCurrency = 'RUB';

  $: localQuantity = good.quantity - (basketObject[good._id] ? basketObject[good._id].count_in_basket : 0);

  function addNewGoodInBasket() {
    if (basketObject[good._id]) {
      basketObject[good._id].count_in_basket++;
    } else {
      basketObject[good._id] = Object.assign({}, good, { count_in_basket: 1 });
    }

    basketStore.set(basketObject)
  }

  function getCurrencySymbol(currency) {
    switch (currency) {
      case 'USD':
        return '$'
      case 'EUR': 
        return '€'
      default:
        return '₽'
    }
  }

  export {
    good
  }
</script>

<article class="good {$$props.class} { localQuantity > 0 ? '' : 'good_out-of'}">
  <header class="good__header">
    <h2 class="good__title">{ good.name }</h2>
  </header>
  <div class="good__stats">
    <p class="good__text">
        <span class="good__text-wrap">
          Осталось:
        </span> 
        { localQuantity } шт.
      </p>
      <p class="good__text">
        <span class="good__text-wrap">
          Цена:
        </span> 
        { good.price[choisedCurrency].toFixed(2) } {getCurrencySymbol(choisedCurrency)}
      </p>
  </div>
  <footer class="good__footer">
    <button class="good__add-btn" on:click={addNewGoodInBasket}>Добавить в корзину</button>
  </footer>
</article>

<style lang="scss">
$border-color: rgba(0, 0, 0, 0.3);

.good {
  display: block;
  min-width: 250px;
  padding: 5px;
  margin-bottom: 20px;

  border: 1px solid $border-color;

  &_out-of {
    pointer-events: none;
    opacity: 0.5;
  }
}

.good__title {
  margin: auto;
  text-align: center;
}

.good__header {
  display: flex;
  min-height: 100px;
}

.good__stats {
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;

  position: relative;

  border-top: 1px solid $border-color;

  &::after {
    display: block;
    
    width: 2px;

    background-color: $border-color;

    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 50%;

    transform: translateX(-50%);

    content: "";
  }
}

.good__text {
  margin: 0;
  width: 45%;

  text-align: center;
}


.good__text-wrap {
  display: block;

  font-weight: bold;
}

.good__footer {
  display: flex;
  padding: 10px 0;
}

.good__add-btn {
  padding: 10px 15px;
  margin: auto;
  background-color: transparent;

  color: rgb(47, 184, 58);
  transition: background-color 0.3s, color 0.3s;
  text-transform: uppercase;

  border-radius: 2px;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: rgb(60, 211, 73);
    border-color: transparent;
  }

  &:active {
    background-color: rgb(11, 116, 16);
  }
}
</style>
