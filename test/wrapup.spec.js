var _ = require('underscore');
var Browser = require('zombie');
var assert = require('chai').assert;

var indexBrowser = new Browser();
var portfolioBrowser = new Browser();

const indexServer = 'http://localhost:7777/index.html';
const portfolioServer = 'http://localhost:7777/portfolio.html';

var indexStyleHTML, portfolioStyleHTML;

describe('Week 3 Wrap Up', function(){

  before(function(done) {
    indexBrowser.visit(indexServer, done);
  });

  before(function(done){
    portfolioBrowser.visit(portfolioServer, done);
  });

  it('should have the same style for index and portfolio', function(done) {    
    var elements = {
      "body": ['background', 'color', 'padding', 'font-family'], 
      "header": ['font-size', 'font-weight'], 
      "#all-contents": ['max-width', 'margin'], 
      "nav": ['background', 'margin', 'margin-bottom', 'display'], 
      "nav header": ['display', 'color', 'align-items', 'flex'], 
      "nav ul": ['list-style-image'], 
      "nav li": ['display', 'padding'], 
      "nav a": ['text-decoration', 'color'], 
      "main": ['background', 'display'], 
      "[class=sidebar]": ['margin-right', 'padding'], 
      "[class=sidebar] img": ['width'],
      "[class=content]": ['flex', 'padding'],
      "[class=interests] header": ['font-size']
    };    
      
    indexStyleHTML = indexBrowser.html("style");
    portfolioStyleHTML = portfolioBrowser.html("style");
    
    var indexElementStyleMap = {};
    var portfolioElementStyleMap = {};
    
    var startIndex, endIndex, styleString, styleArray;
    
    for (var element in elements) {
      // get start and end index for each style block within portfolio.html <style> </style>
      var addElementStyle = function (styleMap, html) {
        startIndex = html.indexOf(element); 
        styleString = html.substring(startIndex);

        endIndex = styleString.indexOf("}")+1;
        styleString = styleString.substring(styleString.indexOf("{"), endIndex);
        
        styleArray = styleString.split(";");
        styleMap[element] = {};
  
        for (var i = 0; i < styleArray.length - 1; i++) {
          styleArray[i] = styleArray[i].replace("\n", "");
          styleArray[i] = styleArray[i].replace("undefined", "");
          styleArray[i] = styleArray[i].replace("{", "");
          styleArray[i] = styleArray[i].replace("}", "");
          styleArray[i] = styleArray[i].trim();
  
          var rule = styleArray[i].split(":");
          styleMap[element][rule[0].trim()] = rule[1].trim();
        }
        html = html.substring(0, startIndex) + html.substring(endIndex);
      };

      if (indexStyleHTML.includes(element) && portfolioStyleHTML.includes(element)) {
        addElementStyle(indexElementStyleMap, indexStyleHTML);
        addElementStyle(portfolioElementStyleMap, portfolioStyleHTML);
      }
    };
    
    var indexValue, portfolioValue;
    for (var element in elements) {
      if (indexStyleHTML.includes(element) && portfolioStyleHTML.includes(element)) {
        elements[element].forEach(function(property){
          indexValue = indexElementStyleMap[element][property];
          portfolioValue = portfolioElementStyleMap[element][property];
          assert.equal(indexValue, portfolioValue, 
            "Index " + element + " has style: " + property + ": " + indexValue + "\n" + 
            "Portfolio " + element + " has style: " + property + ": " + portfolioValue + "\n");
        });
      }
    }
    
    done();
  });
});
