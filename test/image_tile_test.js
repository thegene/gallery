import jsdom from 'mocha-jsdom';
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ImageTile from '../app/image_tile';

var subject;

context('Given a rendered image tile with an image url', function(){
  jsdom();

  before(function(){
    var imageUrl = 'foo.com';

    subject = TestUtils.renderIntoDocument(
      <ImageTile imageUrl={imageUrl} />
    );
  });

  it('has an image tag with the provided url', function(){
    expect(TestUtils.findRenderedDOMComponentWithTag(subject, 'img').getAttribute('src'))
      .toBe('foo.com');
  });
});

