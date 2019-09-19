/* eslint-disable camelcase */
const axios = require('axios');

/**
 * @typedef {{
 *  EUR: Number,
 *  USD: Number,
 *  RUB: Number
 * }} ExchangeRate
 */

/**
 * Получение курса обмена к Рублю
 * @return {ExchangeRate}
 * @private
 */
async function getExchangeRateFrom_cbr_xml_daily() {
  try {
    const { data } = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');

    return {
      EUR: data.Valute.EUR.Value,
      USD: data.Valute.USD.Value,
      RUB: 1,
    };
  } catch (e) {
    return e;
  }
}

/**
 * Возвращает функцию замыкания для кэширования.
 *
 * @return {Function}
 */
exports.getCalculatePriceByOneCurrency = () => {
  let cachedRate = {
    // test fix \\
    // data: getExchangeRateFrom_cbr_xml_daily(),
    // expiresIn: new Date().getTime() + (10 * 60 * 1000), // через 10 минут
  };

  /**
   * @param {String} currency     тип валюты
   * @param {Number} priceOfGood  количество денег
   *
   * @return {ExchangeRate}
   */
  return async (currency, priceOfGood) => {
    const timestamp = new Date().getTime();

    const isTimestampExpired = cachedRate.expiresIn && cachedRate.expiresIn < timestamp;
    // update cachedRate
    if (!cachedRate.data || isTimestampExpired) {
      cachedRate = {
        data: await getExchangeRateFrom_cbr_xml_daily(),
        expiresIn: timestamp + (10 * 60 * 1000), // через 10 минут
      };
    }

    const RUB = currency === 'RUB' ? priceOfGood : priceOfGood * cachedRate.data[currency];

    return {
      EUR: RUB / cachedRate.data.EUR,
      RUB,
      USD: RUB / cachedRate.data.USD,
    };
  };
};
