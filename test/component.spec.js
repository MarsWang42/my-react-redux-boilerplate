import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../src/components/App';

describe('The environment', () => {
  it('works.', () => {
    expect(true).to.be.true;
  });
});

describe('App', () => {
  it('should print "Hello World!"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains([<p>Hello World!</p>])).to.equal(true);
  });
});
