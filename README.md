# react-highlight-updates

[![CircleCI](https://circleci.com/gh/JakeSidSmith/react-highlight-updates/tree/master.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/react-highlight-updates/tree/master)

**Visually highlight when React components are updated**

## About

Ever wondered which of your components are actually re-rendering when you update your store, set state, or even just click on an element? Now you can easily visually highlight which components are being updated and track down the cause, to improve your apps' performance.

## Installation

```shell
npm install react-highlight-updates --save --save-exact
```

## Usage

Simply import the `highlightUpdates` function and call it.

```typescript
import { highlightUpdates } from 'react-highlight-updates';

highlightUpdates();
```

The default highlight color is `rgba(255, 0, 0, 0.5)`, but you can pass a custom color to the highlightUpdates function.

You should use a transparent color for the best results e.g.

```typescript
highlightUpdates('rgba(0, 255, 0, 0.5)');
```
