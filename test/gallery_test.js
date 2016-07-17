import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactShallowRenderer from 'react-addons-test-utils';
import Gallery from '../app/gallery';

var subject, renderer;
renderer = ReactShallowRenderer.createRenderer();

context('Given a Gallery with a manifest of five things and a batch size of 2', function(){
  var manifest = [
    {}, {}, {}, {}, {}
  ];

  before(function(){
    renderer.render(<Gallery
      manifest={manifest}
      batchSize={2}
    />);
    subject = renderer.getRenderOutput();
  });

  it('renders a GalleryLayout', function(){
    expect(subject.type.displayName).to.eq('GalleryLayout');
  });

  it('renders a manifest of 2 things', function(){
  console.log(subject);
    expect(subject.props.manifest.length).to.eq(2);
  });

  //context('when imageLoaded is called once', function(){
  //  before(function(){
  //    subject.props.imageLoaded();
  //  });

  //  it('renders a manifest of 4 things', function(){
  //    console.log(subject);
  //    expect(subject.props.manifest.length).to.eq(2);
  //  });
  //});
});
