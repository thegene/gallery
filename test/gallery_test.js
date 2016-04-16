import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Gallery from '../app/gallery';
import ReactShallowRenderer from 'react-addons-test-utils';

context('Given a rendered Gallery', function(){
  var subject,
    manifest,
    renderer;

  before(function(){
    renderer = ReactShallowRenderer.createRenderer();
    renderer.render(
      <Gallery manifest={manifest} />
    );
    subject = renderer.getRenderOutput();
  });

  context('with no images in its manifest', function(){
    before(function(){
      manifest = [];
    });

    it('is empty', function(){
      expect(subject.props.children).to.be.empty;
    });
  });
});
