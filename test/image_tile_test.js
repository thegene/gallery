import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ImageTile from '../app/image_tile';

jsdom();

var render_tile = function(imageUrl){
  return TestUtils.renderIntoDocument(
    <ImageTile imageUrl={imageUrl} />
  );
}

var image_in_tile = function(tile){
  return TestUtils.findRenderedDOMComponentWithTag(tile, 'img');
}

context('Given a rendered image tile with an image url', function(){
  var firstTile;

  before(function(){
    firstTile = render_tile('foo.com');
  });

  it('has an image tag with the provided url', function(){
    expect(
      image_in_tile(firstTile).getAttribute('src')
    ).toBe('foo.com');
  });

  context('given a second tile with a different image url', function(){
    var secondTile;

    before(function(){
      secondTile = render_tile('bar.com');
    });

    it('has an image tag with the new url', function(){
      expect(
        image_in_tile(secondTile).getAttribute('src')
      ).toBe('bar.com');
    });
  });
});

