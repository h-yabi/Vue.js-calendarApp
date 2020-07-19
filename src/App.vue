<template>
  <div id="app">
    <div class="calendar-header">
      <button class="button prev">前の月</button>
      {{currentYear}}年{{currentMonth}}月
      <button class="button next">次の月</button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import moment from 'moment';
const sample = moment().endOf("month").format("D");
console.log(sample)

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      current: 0,
      currentYear: null,
      currentMonth: null
    }
  },
  created() {
    this.currentYear = moment().format("Y");
    this.currentMonth = moment().format("M");

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.calendar-header {
  display: inline-block;
  position: relative;
}
.button {
  position: relative;
  appearance: none;
  margin: 0 10px;
  padding: 5px 10px;
  background: #eee;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  &:before {
    position: absolute;
    top: 50%;
    bottom: 0;
    margin: auto;
    transform: translateY(-50%);
    font-size: 10px;
  }
}
.prev {
  padding-left: 30px;
  &:before {
    left: 10px;
    content: "＜";
  }
}
.next {
  padding-right: 30px;
  &:before {
    right: 10px;
    content: "＞";
  }
}

</style>
