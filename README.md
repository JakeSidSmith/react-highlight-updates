# react-highlight-updates

[![CircleCI](https://circleci.com/gh/JakeSidSmith/react-highlight-updates/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/react-highlight-updates/tree/master)

**Visually highlight when React components are updated**

## Installation

```shell
npm install react-highlight-updates --save --save-exact
```

## Usage

Simply import the highlightUpdates function and call it.

```typescript
import { highlightUpdates } from 'react-highlight-updates';

highlightUpdates();
```

The default highlight color is `rgba(255, 0, 0, 0.5)`, but you can pass a custom color to the highlightUpdates function.

You should use a transparent color for the best results e.g.

```typescript
highlightUpdates('rgba(0, 255, 0, 0.5)');
```
