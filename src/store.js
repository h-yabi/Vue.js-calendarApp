import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // プロジェクト全体で使うstateを入れる
  state: {
    todoList: [],
    dateArray: [],
    filteringDateArray: []
  },
  mutations: {
    addTodo(state, el) {
      if(state.todoList.length < 1) {
        state.todoList.push({
          date: el.date,
          title: [el.title]
        });
      } else {
        let num = state.filteringDateArray.indexOf(el.date);
        if(state.filteringDateArray.indexOf(el.date) === -1) {
          state.todoList.push({
            date: el.date,
            title: [el.title]
          });
        } else {
          state.todoList[num].title.push(el.title);
        }
      }

      state.dateArray = state.todoList.map(todo => todo.date)
      state.filteringDateArray = state.dateArray.filter(function (date, index, self) {
        return self.indexOf(date) === index;
      });

      // console.log(state.dateArray)
      console.log(state.todoList)
    },
  },
  actions: {
    addTodo({ commit }, el) {
      commit('addTodo', el);
    }
  },
  getters: {

  }
})