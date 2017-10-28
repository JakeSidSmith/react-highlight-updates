import * as React from 'react';
import { highlightUpdates } from '../src/';

describe('react-highlight-updates', () => {

  const createElementSpy = jest.spyOn(React, 'createElement');

  it('should replace React.createElement', () => {
    expect(React.createElement).toBe(createElementSpy);
    highlightUpdates();
    expect(React.createElement).not.toBe(createElementSpy);
  });

  it('should append styles to the head', () => {
    const style = document.getElementsByTagName('style')[0];

    expect(style.innerHTML.indexOf('rgba(255, 0, 0, 0.5)')).toBeGreaterThan(0);
  });

  it('should accept a custom color', () => {
    highlightUpdates('rgba(0, 255, 0, 0.5)');

    const style = document.getElementsByTagName('style')[0];

    expect(style.innerHTML.indexOf('rgba(0, 255, 0, 0.5)')).toBeGreaterThan(0);
  });

  it('should call the original createElement function', () => {
    const props = {foo: 'bar'};
    React.createElement('div', props, 'child1', 'child2');

    expect(createElementSpy).toHaveBeenCalledWith('div', props, 'child1', 'child2');
  });

});
