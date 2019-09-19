const express = require('express');
const controller = require('../../controllers/good.controller');

const router = express.Router();

router
  .route('/')
  /**
   * @api {post} v1/good товары
   * @apiDescription Получение товаров из базы данных
   * @apiVersion 1.0.0
   * @apiName Good
   *
   * @apiSuccess  {String}                [name]        Имя товара
   * @apiSuccess  {Number{1-}}            [quantity]    Количество штук
   * @apiSuccess  {String{RUB|USD|EUR}}   [currency]    Выбранная валюта
   * @apiSuccess  {Number{1-}}            [price]       Цена
   *
   */
  .get(controller.get);

module.exports = router;
