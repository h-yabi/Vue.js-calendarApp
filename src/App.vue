<template>
  <v-app>
    <div class="calendar">
      <div class="calendar-header">
        <button @click="decrement" class="button prev">前の月</button>
        {{ yearAndMonth }}
        <button @click="increment" class="button next">次の月</button>
      </div>
      <div class="calendar-body">
        <div
          v-for="data in createCalendar"
          :key="data.id"
          :data-id="data.id"
          :data-week="data.weekNumber"
          :data-today="data.id == today"
          :data-holiday="Object.keys(publicHoliday).indexOf(data.id) != -1 || data.id.slice(-5) === '01-01' && true"
          :class="data.class"
          @click="modalShow(data.id)"
        >
          <div v-if="data.week" class="week">{{data.week}}</div>
          <div class="date-wrap">
            <div class="date">{{data.date}}</div>
            <div v-if="Object.keys(publicHoliday).indexOf(data.id) != -1" class="publicHoliday-text">
              {{publicHoliday[data.id]}}
            </div>
            <div v-else-if="data.id.slice(-5) === '01-01'" class="publicHoliday-text">元日</div>
          </div>
          <template v-for="todo in $store.state.todoList">
            <div class="todoList" v-if="todo.date == data.id" :key="todo.id">
              <template v-for="(title, index) in todo.title">
                <div class="todoItem" :key="index">{{title}}</div>
              </template>
              <div
                class="todoNum"
                v-if="todo.title.length > 3"
              >他{{todo.title.length - 3}}件</div>
            </div>
          </template>
        </div>
      </div>

      <transition name="fade">
        <div v-show="modalState">
          <Modal @modal-close="modalClose" ref="modal" @add-todo="addTodo"></Modal>
        </div>
      </transition>

    </div>
  </v-app>



</template>

<script>
import Modal from './components/Modal.vue'
import moment from 'moment';
import axios from 'axios';
import { mapActions } from 'vuex';


export default {
  name: 'App',
  components: {
    Modal
  },
  data () {
    return {
      current: 0,
      week: ['日', '月', '火', '水', '木', '金', '土'],
      publicHoliday: '',
      today: moment().format('YYYY-MM-DD'),
      modalState: false,
    }
  },
  created() {
  },
  computed: {
    yearAndMonth() {
      return moment().add(this.current, 'months').format('YYYY年M月');
    },
    createCalendar() {
      const calendarData = [];
      const startDay = moment().add(this.current, "month").startOf("months").format("d");
      const currentYear = moment().add(this.current, "month").format("Y");
      const currentMonth = moment().add(this.current, "month").format("M");
      const prevLastDay = moment().subtract(this.current - 1, "month").endOf("month").format("D");
      const nextLastDay = moment().add(this.current, "month").endOf("month").format("D");

      this.getpublicHoliday(currentYear);

      // 今月の日付を配列に格納
      for(let i = 1; i <= nextLastDay; i++) {
        calendarData.push({
          id: `${currentYear}-${("0" + currentMonth).slice(-2)}-${("0" + i).slice(-2)}`,
          date: i,
          class: 'current-month',
          weekNumber: moment().add(this.current, "month").date(i).day()
        });
      }

      // 前月の最終日から、startDay（7月 = 3（水曜））までを配列に格納
      for(let i = 0; i < startDay; i++) {
        const year = currentMonth > 1 ? currentYear : currentYear - 1;
        const month = currentMonth > 1 ? ("0" + (Number(currentMonth) - 1)).slice(-2) : 12;

        calendarData.unshift({
          id: `${year}-${month}-${("0" + (prevLastDay - i)).slice(-2)}`,
          date: prevLastDay - i,
          class: 'other-month'
        });
      }

      // 6*7の升目状の空いている箇所に、次月の日付を配列に追加
      const addNextMonth = 42 - calendarData.length;
      for(let i = 1; i <= addNextMonth; i++) {
        const year = currentMonth == 12 ? Number(currentYear) + 1 : currentYear;
        const month = currentMonth == 12 ? '01' : ("0" + (Number(currentMonth) + 1)).slice(-2);

        calendarData.push({
          id: `${year}-${month}-${("0" + i).slice(-2)}`,
          date: i,
          class: 'other-month'
        });
      }

      // calendarData配列の【0~6】までの中に【日~土】をpushする
      for(let i = 0; i < 7; i++) {
        calendarData[i].week = this.week[i];
      }
      // console.log(calendarData)
      return calendarData;
    },
  },
  methods: {
    async getpublicHoliday(currentYear) {
      try {
        const response = await axios.get(`https://holidays-jp.github.io/api/v1/${currentYear}/date.json`);
        this.publicHoliday = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    increment() {
      this.current ++;
    },
    decrement() {
      this.current --;
    },
    modalShow(id) {
      this.modalState = true;
      this.$refs.modal.modalShow(id);
    },
    modalClose() {
      this.modalState = false;
    },
    ...mapActions(["addTodo"]),
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  margin: 30px 15px 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
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
  overflow: hidden;
  > div {
    position: relative;
    min-height: 120px;
    padding: 5px 10px 10px;
    font-size: 14px;
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
  .date {
    font-size: 14px;
  }
}
div[data-week="0"] {
  background: #FFD1D1;
  color: #990000;
}
div[data-week="6"] {
  background: #CCF9FF;
  color: #0000FF;
}
div[data-holiday] {
  &.current-month {
    background: #FFD1D1;
    > * {
      color: #990000;
    }
    .date {
      background: #ffa67f;
    }
  }
}
div[data-today] {
  &.current-month {
    background: rgb(255, 255, 107);
  }
}
.date-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.publicHoliday-text {
  color: #990000;
  font-size: 12px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-application--wrap {
  min-height: none;
}
.todoList {
  padding-left: 0;
}
.todoItem {
  margin-top: 2px;
  padding: 0 4px;
  border-radius: 4px;
  background-color: rgb(215, 219, 239);
  color: #2c3e50;
  font-size: 12px;
  text-align: left;
  list-style: none;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &:nth-child(n + 4) {
    display: none;
  }
}
.todoNum {
  margin-top: 5px;
  font-size: 12px;
}


</style>
