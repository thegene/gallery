import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactShallowRenderer from 'react-addons-test-utils';
import Gallery from '../app/gallery';

var subject, renderer;
renderer = ReactShallowRenderer.createRenderer();

var renderAgain = function(){
  subject = renderer.getRenderOutput();
}

context('Given a Gallery with a manifest of five things and a batch size of 2', function(){
  var manifest = [
    {}, {}, {}, {}, {}
  ];

  before(function(){
    renderer.render(<Gallery
      manifest={manifest}
      batchSize={2}
    />);
    renderAgain();
  });

  it('renders a GalleryLayout', function(){
    expect(subject.type.displayName).to.eq('GalleryLayout');
  });

  it('renders a manifest of 2 things', function(){
    expect(subject.props.manifest.length).to.eq(2);
  });

  context('when imageLoaded is called once', function(){
    before(function(){
      subject.props.imageLoaded();
      renderAgain();
    });

    it('renders a manifest of 4 things', function(){
      expect(subject.props.manifest.length).to.eq(4);
    });

    context('when imageLoaded is called a second time', function(){
      before(function(){
        subject.props.imageLoaded();
        renderAgain();
      });

      it('renders a manifest of 5 things', function(){
        expect(subject.props.manifest.length).to.eq(5);
      });
    });
  });
});
