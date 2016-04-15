import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ImageTile from '../app/image_tile';

jsdom();

var element_in_tile = function(tag, tile){
  return TestUtils.findRenderedDOMComponentWithTag(tile, tag);
}

var attributes_from = function(element){
  var attributes = {};
  for (var v in element.attributes){
    var attr = element.attributes[v];
    if (attr.name){
      attributes[attr.name] = attr.value;
    }
  }
  return attributes;
}

context('Given a rendered image tile with an image url', function(){
  var firstTile;

  before(function(){
    firstTile = TestUtils.renderIntoDocument(
      <ImageTile imageUrl="foo.com" />
    ); 
  });

  it('has an image tag with the provided url', function(){
    expect(
      element_in_tile('img', firstTile)
        .getAttribute('src')
    ).to.equal('foo.com');
  });
  
  describe('the link attributes', function(){
    var attributes;

    before(function(){
      attributes = attributes_from(
        element_in_tile('a', firstTile)
      );
    });

    it('has a link with a download attribute', function(){
      expect(attributes.download).to.equal('true');
    });

    it('has a _blank target', function(){
      expect(attributes.target).to.equal('_blank');
    });
  });
  
  context('given a second tile with a different image url', function(){
    var secondTile;

    before(function(){
      secondTile = TestUtils.renderIntoDocument(
        <ImageTile imageUrl="bar.com" />
      ); 
    });

    it('has an image tag with the new url', function(){
      expect(
        element_in_tile('img', secondTile)
          .getAttribute('src')
      ).to.equal('bar.com');
    });
  });
});

