import * as React from 'react';
import { highlightUpdates } from '../src/';

describe('react-highlight-updates', () => {

  const createElementSpy = jest.spyOn(React, 'createElement');

  it('should replace React.createElement', () => {
    expect(React.createElement).toBe(createElementSpy);
    highlightUpdates();
    expect(React.createElement).not.toBe(createElementSpy);
  });

  it('should call the original createElement function', () => {
    const props = {foo: 'bar'};
    React.createElement('div', props, 'child1', 'child2');

    expect(createElementSpy).toHaveBeenCalledWith('div', props, 'child1', 'child2');
  });

});
