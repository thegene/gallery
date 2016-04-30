var expect = require('chai').expect;
var path = require('path');

var getRelativeUrl = function(abs){
  return abs.split('dist/')[1];
}

context('When visiting the gallery page', function(){
  before(function(){
    browser.url('file:///home/thegene/projects/gallery/dist/index.html');
  });

  it('has a title', function(){
    expect(browser.getTitle()).to.equal('Gallery');
  });

  it('has two image tiles', function(){
    expect(browser.elements('.ImageTile').value.length).to.equal(2);
  });

  context('when we examine the first image tile', function(){
    var firstTile;

    before(function(){
      firstTile = browser.element('.ImageTile:nth-of-type(1)');
    });

    it('has a link with the full attribute as href', function(){
      expect(
        getRelativeUrl(firstTile
          .element('a')
          .getAttribute('href')))
        .to.equal('full/A&G%20Wedding-1031.jpg');
    });

    it('has an image with the thumb attribute as href', function(){
      expect(
        getRelativeUrl(firstTile
          .element('img')
          .getAttribute('src')))
        .to.equal('thumb/A&G%20Wedding-1031.jpg');
    });
  });

  context('when we examine the second image tile', function(){
    var firstTile;

    before(function(){
      firstTile = browser.element('.ImageTile:nth-of-type(2)');
    });

    it('has a link with the full attribute as href', function(){
      expect(
        getRelativeUrl(firstTile
          .element('a')
          .getAttribute('href')))
        .to.equal('full/A&G%20Wedding-1053.jpg');
    });

    it('has an image with the thumb attribute as href', function(){
      expect(
        getRelativeUrl(firstTile
          .element('img')
          .getAttribute('src')))
        .to.equal('thumb/A&G%20Wedding-1053.jpg');
    });
  });
});
