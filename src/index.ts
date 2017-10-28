import * as React from 'react';
import * as ReactDOM from 'react-dom';

const HIGHLIGHT_CLASS = 'react-update-highlight';
const MATCHES_HIGHLIGHT_CLASS = /\s*\breact-update-highlight\b\s*/gi;

const STYLE = document.createElement('style');
STYLE.type = 'text/css';

export const highlightUpdates = (color: string = 'rgba(255, 0, 0, 0.5)') => {
  (window as any).React = React;

  STYLE.innerHTML =
`.react-update-highlight {
  animation-name: react-update-highlight;
  animation-duration: 2s;
  animation-iteration-count: 1;
}

@keyframes react-update-highlight {
  from {
    background-color: ${color};
  }

  to {
    background-color: transparent;
  }
}`;

  document.head.appendChild(STYLE);

  const originalCreateElement = React.createElement;

  (React as any).createElement = function () {
    const args = Array.prototype.slice.call(arguments);
    const component = args[0];

    if (
      typeof component === 'function' &&
      component.prototype instanceof React.Component &&
      !component.prototype.hasReactUpdateHighlight
    ) {
      const originalComponentDidUpdate = (component as any).prototype.componentDidUpdate;

      component.prototype.hasReactUpdateHighlight = true;
      (component as any).prototype.componentDidUpdate = function () {
        const updateArgs = Array.prototype.slice.call(arguments);

        const node = ReactDOM.findDOMNode(this);

        if (node) {
          if (MATCHES_HIGHLIGHT_CLASS.test(node.className)) {
            node.className = node.className.replace(MATCHES_HIGHLIGHT_CLASS, '');
          }

          void (node as any).offsetWidth; // tslint:disable-line:no-unused-expression
          node.className = `${node.className} ${HIGHLIGHT_CLASS}`;
        }

        if (typeof originalComponentDidUpdate === 'function') {
          originalComponentDidUpdate.apply(this, updateArgs);
        }
      };
    }

    return originalCreateElement.apply(this, args);
  };
};

export default highlightUpdates;
