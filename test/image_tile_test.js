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

context('Given a rendered image tile with an image url and a download url', function(){
  var firstTile;

  before(function(){
    firstTile = TestUtils.renderIntoDocument(
      <ImageTile imageUrl="foo.com" downloadUrl="apple" />
    ); 
  });

  it('has an image tag with the provided url', function(){
    expect(attributes_from('img', firstTile).src).to.equal('foo.com');
  });
  
  describe('the link attributes', function(){
    var attributes;

    before(function(){
      attributes = attributes_from('a', firstTile);
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
  
  context('given a second tile with a different image url', function(){
    var secondTile;

    before(function(){
      secondTile = TestUtils.renderIntoDocument(
        <ImageTile imageUrl="bar.com" downloadUrl="pear" />
      ); 
    });

    it('has an image tag with the new url', function(){
      expect(attributes_from('img', secondTile).src).to.equal('bar.com');
    });

    describe('the link attributes', function(){
      var attributes;

      before(function(){
        attributes = attributes_from('a', secondTile);
      });

      it('has a link with a download attribute', function(){
        expect(attributes.download).to.equal('true');
      });

      it('has a _blank target', function(){
        expect(attributes.target).to.equal('_blank');
      });

      it('has a link with an href', function(){
        expect(attributes.href).to.equal('pear');
      });
    });
  });
});

