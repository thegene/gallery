expect = require('chai').expect;
path = require('path');

context('When visiting the gallery page', function(){
  before(function(){
    browser.url('file:///home/thegene/projects/gallery/dist/index.html');
  });

  it('has a title', function(){
    expect(browser.getTitle()).to.equal('Gallery');
  });

  it('has two images', function(){
    expect(browser.elements('img').value.length).to.equal(2);
  });
});
