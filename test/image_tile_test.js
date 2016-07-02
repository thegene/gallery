import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ImageTile from '../app/image_tile';

jsdom();

var attributes_from = function(tag, tile){
  var element = TestUtils.findRenderedDOMComponentWithTag(tile, tag);

  var attributes = {};
  for (var v in element.attributes){
    var attr = element.attributes[v];
    if (attr.name){
      attributes[attr.name] = attr.value;
    }
  }
  return attributes;
}

var findImg = function(tile){
  return TestUtils.findRenderedDOMComponentWithTag(tile, 'img');
}

var renderTile = function(props){
  return TestUtils.renderIntoDocument(<ImageTile {...props} />);
}

context('Given a rendered image tile with an image url and a download url', function(){
  var tile;

  var callCount = 0;
  var callbackTrack = function(){
    callCount++;
  };

  before(function(){
    tile = renderTile({
      imageUrl: "foo.com",
      downloadUrl: "apple",
      onLoad: callbackTrack
    });
  });

  it('has an image tag with the provided url', function(){
    expect(attributes_from('img', tile).src).to.equal('foo.com');
  });

  context('when the img is loaded', function(){

    it('calls the onLoad callback', function(){
      TestUtils.Simulate.load(findImg(tile));
      expect(callCount).to.equal(1);
    });
 
  });

  describe('the link attributes', function(){
    var attributes;

    before(function(){
      attributes = attributes_from('a', tile);
    });

    it('has a link with a download attribute', function(){
      expect(attributes.download).to.equal('true');
    });

    it('has a _blank target', function(){
      expect(attributes.target).to.equal('_blank');
    });

    it('has a link with an href', function(){
      expect(attributes.href).to.equal('apple');
    });
  });
  
});

