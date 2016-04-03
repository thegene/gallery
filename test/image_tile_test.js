var jsdom = require('mocha-jsdom');
var expect = require('expect');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

context('Given a rendered image tile with an image url', function(){
  jsdom();

  before(function(){
    var imageUrl = 'foo.com';

    var ImageTile = TestUtils.renderIntoDocument(
      React.createElement('div', { imageUrl: imageUrl })
    );
  });

  it('has an image tag with the provided url', function(){
    expect(TestUtils.findRenderedDomComponentWithTag(ImageTile, 'img').getAttribute('src'))
      .toBe('foo.com');
  });
});

