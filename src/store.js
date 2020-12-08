import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // プロジェクト全体で使うstateを入れる
  state: {
    todoList: [],
    dateArray: [],
    filteringDateArray: [],
    modalState: false,
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
      // console.log(state.todoList);
    },
    deleteTodo(state, data) {
      state.todoList.map(todo => {
        if (todo.date == data.id) {
          return todo.title.splice(data.index, 1)
        }
      })
      if (data.length.length === 0) {
        state.modalState = false;
      }
      console.log(state.todoList);
    },
    modalState(state, boolean) {
      const sample = boolean === 'open' ? true : false;
      state.modalState = sample;
    }
  },
  actions: {
    addTodo({ commit }, el) {
      commit('addTodo', el);
    },
    deleteTodo({ commit }, { id, index, length }) {
      const data = {
        id,
        index,
        length
      }
      commit('deleteTodo', data);
    },
    modalState({ commit }, boolean) {
      commit('modalState', boolean);
    },

  },
  getters: {

  }
})