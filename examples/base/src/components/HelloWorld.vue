<template>
  <div class="hello">
    <label for="blocked">Block click out</label>
    <input id="blocked" type="checkbox" v-model="blocked">
    <div class="red" v-click-out="{ handler: onClickOut, excluded: ['.green'], blockingConditions: [blocked] }"></div>
    <div class="green"></div>
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
