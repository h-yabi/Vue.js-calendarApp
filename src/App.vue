<template>
  <div id="app">
    <div class="calendar-header">
      <button @click="decrement" class="button prev">前の月</button>
      {{yearMonth}}
      <button @click="increment" class="button next">次の月</button>
    </div>
    <div class="calendar-body">
      <div v-for="data in createCalendar" :key="data.id" :data-id="data.id" :class="data.class">
        <div v-if="data.week" class="week">{{data.week}}</div>
        {{data.date}}
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import moment from 'moment';

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
  data () {
    return {
      current: 0,
      week: ['日', '月', '火', '水', '木', '金', '土']
    }
  },
  computed: {
    currentMoment() {
      return moment().add(this.current, 'months');
    },
    yearMonth() {
      return this.currentMoment.format('YYYY年M月');
    },
    createCalendar() {
      const calendarData = [];
      const startDay = moment().add(this.current, "month").startOf("months").format("d");
      const currentYear = moment().format("Y");
      const currentMonth = moment().add(this.current, "month").format("M");
      const prevLastDay = moment().subtract(this.current - 1, "month").endOf("month").format("D");
      const nextLastDay = moment().add(this.current, "month").endOf("month").format("D");
      // console.log(this.lastDay) // 30
      // console.log(this.startDay) // 3 = 水曜

      // 今月の日付を配列に格納
      for(let i = 1; i <= nextLastDay; i++) {
        calendarData.push({
          id: `${currentYear}-${currentMonth}-${i}`,
          date: i,
          class: 'current-month'
        });
      }

      // 前月の最終日から、startDay（7月 = 3（水曜））までを配列に格納
      for(let i = 0; i < startDay; i++) {
        calendarData.unshift({
          id: `${currentYear}-${Number(currentMonth) - 1}-${prevLastDay - i}`,
          date: prevLastDay - i,
          class: 'other-month'
        });
      }

      // 6*7の升目状の空いている箇所に、次月の日付を配列に追加
      const addNextMonth = 42 - calendarData.length;
      for(let i = 1; i <= addNextMonth; i++) {
        calendarData.push({
          id: `${currentYear}-${Number(currentMonth) + 1}-${i}`,
          date: i,
          class: 'other-month'
        });
      }

      // calendarData配列の【0~6】までの中に【日~土】をpushする
      console.log(calendarData)
      for(let i = 0; i < 7; i++) {
        calendarData[i].week = this.week[i];
        // calendarData[i].dataset.week = this.week[i];
      }
      return calendarData;
    },
  },
  methods: {
    increment() {
      this.current ++;
      // console.log(this.currentMonth)
    },
    decrement() {
      this.current --;
      // console.log(this.currentMonth)
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
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
.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
  grid-gap: 1px;
  border: 1px solid #ccc;
  background: #ccc;
  >div {
    background: #fff;
  }
  .other-month {
    background: #f4f3f3;
  }
}
.calendar-body {
  > div {
    &:nth-child(1) {
      .week {
        color: #990000;
      }
    }
    &:nth-child(7) {
      .week {
        color: #0000FF;
      }
    }
  }
}
</style>
