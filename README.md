# somatic.js
Functional, Asynchronous, Component-based UI Library that works with JSX

## Install
npm install --save @agyemanjp/somatic

## Features
### Function-based
All components in Somatic are regular (stateless) or generator (stateful) functions. No classes, hooks, proxies or template languages are needed. These feature allows for simple and direct state management right inside components. 

### Declarative
Somatic supports the JSX syntax popularized by React, allowing you to write HTML-like code directly in JavaScript.

### Asynchronous
Somatic supports asynchronous components. You can define components as async (generator) functions and race renderings to display fallback UIs.

### Props/State interaction management
Somatic allows component authors to manage the interaction between state and props directly in components, without any ugly life-cycle methods as in React, by injecting any props updates in the generators returned from stateful components.

