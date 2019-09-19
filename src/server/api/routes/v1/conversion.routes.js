const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/conversion.controller');
const validation = require('../../validations/conversion.validation');

const router = express.Router();


router
  .route('/')
  /**
   * @api {post} v1/conversion сумма цен товаров в разных валютах
   * @apiDescription Получение суммы цен товаров из массива товаров отображенную в разных валютах
   * @apiVersion 1.0.0
   * @apiName Conversion
   *
   * @apiParam  {String}                [_id]     id товара из mongoDB
   * @apiParam  {Number{1-}}            [count]   Количество штук
   *
   * @apiSuccess {String}  RUB      Сумма товаров в рублях
   * @apiSuccess {String}  EUR      Сумма товаров в евро
   * @apiSuccess {String}  USD      Сумма товаров в долларах
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(validation.conversionPOST), controller.calculate);

module.exports = router;
