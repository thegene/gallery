import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactShallowRenderer from 'react-addons-test-utils';

import Gallery from '../app/gallery';

context('Given a Gallery with a manifest of five things and a batch size of 2', function(){
  var manifest = [
    {}, {}, {}, {}, {}
  ];

  var subject;
  before(function(){
    var renderer = ReactShallowRenderer.createRenderer();
    renderer.render(
      <Gallery manifest={manifest} batchSize={2} />
    );
    subject = renderer.getRenderOutput();
  });

  it('renders a GalleryLayout', function(){
    expect(subject.type.displayName).to.eq('GalleryLayout');
  });

  it('renders a manifest of 2 things', function(){
    expect(subject.props.manifest.length).to.eq(2);
  });
});
