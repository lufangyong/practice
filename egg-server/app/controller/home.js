'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '<h1>hi, egg server</h1>';
  }
}

module.exports = HomeController;
