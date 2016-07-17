import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import GalleryLayout from '../app/gallery_layout';
import ReactShallowRenderer from 'react-addons-test-utils';

var callback = function(){};

var getRenderedGalleryLayout = function(manifest){
  var renderer = ReactShallowRenderer.createRenderer();
  renderer.render(
    <GalleryLayout manifest={manifest} imageLoaded={callback} />
  );
  return renderer.getRenderOutput();
};

context('Given a rendered GalleryLayout', function(){
  var subject;

  context('with no images in its manifest', function(){
    before(function(){
      subject = getRenderedGalleryLayout([]);
    });

    it('is empty', function(){
      expect(subject.props.children).to.be.empty;
    });
  });

  context('with one image in its manifest', function(){
    before(function(){
      subject = getRenderedGalleryLayout([{
        full: 'blah.jpg',
        thumb: 'foo.gif'
      }]);
    });

    it('has one ImageTile', function(){
      expect(subject.props.children.length).to.equal(1);
    });

    it('instantiates the ImageTile with the manifest settings', function(){
      expect(subject.props.children[0].props.full).to.equal('blah.jpg');
      expect(subject.props.children[0].props.thumb).to.equal('foo.gif');
    });

    it('passes the imageLoaded callback to it', function(){
      expect(subject.props.children[0].props.onLoad).to.equal(callback);
    });
  });

  context('with two images in the manifest', function(){
    before(function(){
      subject = getRenderedGalleryLayout([{
        full: 'apple',
        thumb: 'red'
      }, {
        full: 'pear',
        thumb: 'green'
      }]);
    });

    it('has two elements ImageTiles', function(){
      expect(subject.props.children.length).to.equal(2);
    });

    context('the first tile', function(){
      var firstTile;

      before(function(){
        firstTile = subject.props.children[0];
      });

      it('has full from the full setting in the manifest', function(){
        expect(firstTile.props.full).to.equal('apple');
      });

      it('has thumb from the full setting in the manifest', function(){
        expect(firstTile.props.thumb).to.equal('red');
      });

      it('is not passed an onLoad callback', function(){
        expect(firstTile.props.onLoad).to.equal(undefined);
      });
    });

    context('the second tile', function(){
      var secondTile;

      before(function(){
        secondTile = subject.props.children[1];
      });

      it('has full from the full setting in the manifest', function(){
        expect(secondTile.props.full).to.equal('pear');
      });

      it('has thumb from the full setting in the manifest', function(){
        expect(secondTile.props.thumb).to.equal('green');
      });

      it('is passed an onLoad callback', function(){
        expect(secondTile.props.onLoad).to.equal(callback);
      });
    });
  });
});
