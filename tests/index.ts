import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

  const fn = jest.fn();

  class TestComponent extends React.Component<{}, {}> {
    public componentDidUpdate () {
      fn();
    }

    public render () {
      return React.createElement('div');
    }
  }

  it('should replace componentDidUpdate', () => {
    const originalComponentDidUpdate = TestComponent.prototype.componentDidUpdate;

    React.createElement(TestComponent);
    expect(TestComponent.prototype.componentDidUpdate).not.toBe(originalComponentDidUpdate);
  });

  it('should call the original componentDidUpdate function', () => {
    const element = document.createElement('div');
    const root = ReactDOM.render(React.createElement(TestComponent), element);

    expect(fn).not.toHaveBeenCalled();
    root.componentDidUpdate();
    expect(fn).toHaveBeenCalled();
  });

  class TestComponent2 extends React.Component { // tslint:disable-line:max-classes-per-file
    public render () {
      return React.createElement('div', {className: 'test'});
    }
  }

  it('should add the react-update-highlight class', () => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = ReactDOM.render(React.createElement(TestComponent), element);
    const node = ReactDOM.findDOMNode(root);

    expect(node.className).toBe('');
    root.componentDidUpdate();
    expect(node.className).toBe('react-update-highlight');
    root.componentDidUpdate();
    expect(node.className).toBe('react-update-highlight');

    const element2 = document.createElement('div');
    document.body.appendChild(element2);
    const root2 = ReactDOM.render(React.createElement(TestComponent2), element2);
    const node2 = ReactDOM.findDOMNode(root2);

    expect(node2.className).toBe('test');
    (root2 as any).componentDidUpdate();
    expect(node2.className).toBe('test react-update-highlight');
    (root2 as any).componentDidUpdate();
    expect(node2.className).toBe('test react-update-highlight');
  });

});
