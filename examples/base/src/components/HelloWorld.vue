<template>
  <div class="hello">
    <label for="blocked">Block click out</label>
    <input id="blocked" type="checkbox" v-model="blocked">
    <div class="red" v-click-out="{ handler: onClickOut, excluded: ['.green'], disabled: blocked }"></div>
    <div class="green"></div>
    <button @click="checkOthers">Other</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blocked: false
    }
  },

  methods: {
    onClickOut () {
      console.log('Clicked out of red')
    },
    checkOthers () {
      console.log('Clicked on other element')
    }
  }
}
</script>

<style scoped>
.red {
  background: red;
  width: 100px;
  height: 100px;
}
.green {
  background: green;
  width: 100px;
  height: 100px;
}
</style>
