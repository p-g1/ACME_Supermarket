var assert = require('assert');
var { Basket, pricingRules } = require('../ACME_Supermarket');

describe('Basket: FR1, SR1, FR1, CF1', function() {
    it('should return £19.34', function() {
        var basket = new Basket(pricingRules);
        basket.add("FR1");
        basket.add("SR1");
        basket.add("FR1");
        basket.add("CF1");
        var test = basket.total();
      assert.equal(test, "£19.34");
    });
  });

  describe('Basket: FR1, FR1', function() {
    it('should return £3.11', function() {
        var basket = new Basket(pricingRules);
        basket.add("FR1");
        basket.add("FR1");
        var test = basket.total();
      assert.equal(test, "£3.11");
    });
  });

  describe('Basket: FR1', function() {
    it('should return £3.11', function() {
        var basket = new Basket(pricingRules);
        basket.add("FR1");
        var test = basket.total();
      assert.equal(test, "£3.11");
    });
  });

  describe('Basket: SR1, SR1, FR1, SR1', function() {
    it('should return £16.61', function() {
        var basket = new Basket(pricingRules);
        basket.add("SR1");
        basket.add("SR1");
        basket.add("FR1");
        basket.add("SR1");
        
        var test = basket.total();
      assert.equal(test, "£16.61");
    });
  });
