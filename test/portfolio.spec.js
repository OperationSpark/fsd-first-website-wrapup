var _ = require('underscore');
var Browser = require('zombie');
var browser = new Browser();

const indexServer = 'http://localhost:7777/index.html';
const portfolioServer = 'http://localhost:7777/portfolio.html';

describe('Week 3 Wrap Up', function(){

  beforeEach(function(done) {
    browser.visit(server, done);
  });

  it('should have basic layout', function(done){
    browser.assert.elements('head', 1);
    browser.assert.elements('head > title', 1);
    browser.assert.elements('body', 1);
    browser.assert.elements('nav', 1);
    browser.assert.elements('main', 1);
    done();
  });

  it('should have basic layout for nav tag', function(done){
    browser.assert.elements('nav > header', 1);
    browser.assert.elements('nav > ul', 1);
    browser.assert.elements('nav > ul > li', 2);
    browser.assert.elements('nav > ul > li > a', 2);
    done();
  });

  it('should have basic layout for main tag', function(done){
    browser.assert.elements('main > div.content', 1);
    browser.assert.elements('main > div.content > h1', 1);
    browser.assert.elements('main > div.content > ul#portfolio', 1);
    done();
  });
});
