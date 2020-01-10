## Description

This is a simple directive to react when a click happens outside of a certain element.

## Installation

```
npm install vue-click-out --save
```

```
yarn add vue-click-out
```

## Basic Usage

```js
// main.js

import {VueClickOut} from 'vue-click-out';

Vue.directive('click-out', VueClickOut)
```

```vue
<template>
  <div v-click-out="{handler: onClickOutside}">
    ...
  </div>
</template>

<script>
  export default {
    methods: {
      onClickOutside () {
        // do something
      }
    }
  }
</script>
```

## Options

<table class="options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>handler</td>
            <td>Function</td>
            <td>true</td>
            <td>The function invoked on click-outside event.</td>
        </tr>
        <tr>
            <td>excluded</td>
            <td>Array</td>
            <td>false</td>
            <td>A list of excluded elements, the handler will not be executed if any of these elements are clicked.</td>
        </tr>
        <tr>
            <td>blockingConditions</td>
            <td>Array</td>
            <td>false</td>
            <td>A list of booleand conditions, if any of these is true the handler function will not be executed.</td>
        </tr>
    </tbody>
</table>
