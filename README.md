## Description

This is a simple directive to react when a click happens outside of a certain element.

## Installation

```
npm install vue-clickout-handler --save
```

```
yarn add vue-clickout-handler
```

## Basic Usage

```js
// main.js

import { VueClickOut } from 'vue-clickout-handler';

Vue.directive('click-out', VueClickOut)
```

You can pass just a callback and it will be used as handler

```vue
<template>
  <div v-click-out="onClickOut">
    ...
  </div>
</template>

<script>
  export default {
    methods: {
      onClickOut () {
        // do something
      }
    }
  }
</script>
```

Or you can pass an object to include more options:

```vue
<template>
  <div id="my-div">
  </div>
  <div v-click-out="{ handler: onClickOut, excluded: ['#my-div'], disabled: disabled}">
    ...
  </div>
</template>

<script>
  export default {
    data () {
      return {
        disabled: false
      }
    },
    methods: {
      onClickOut () {
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
            <td>disabled</td>
            <td>boolean</td>
            <td>false</td>
            <td>If true the handler will never be executed.</td>
        </tr>
    </tbody>
</table>
