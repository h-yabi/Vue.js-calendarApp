import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // プロジェクト全体で使うstateを入れる
  state: {
    todoList: [],
    dateArray: [],
    filteringDateArray: [],
    id: null,
    modalState: false,
    formState: false,
    todoState: false,
    editable: false,
    editIndex: null,
    schedule: null
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
      state.modalState = false;
      state.formState = false;
      state.schedule = '';
    },
    showForm(state, data) {
      const judgeModalState = data.modalState === 'open' ? true : false;
      state.id = data.id;
      state.editable = false;
      state.formState = true;
      state.modalState = judgeModalState;
      state.schedule = '';
      setTimeout(function() {
        document.getElementById('inputTodo').focus();
      }, 10);
    },
    showTodo(state, data) {
      const judgeModalState = data.modalState === 'open' ? true : false;
      state.id = data.id;
      state.todoState = true;
      state.modalState = judgeModalState;
    },
    editTodo(state, data) {
      state.editable = true;
      state.todoState = false;
      state.formState = true;
      state.todoList.map(todo => {
        if (todo.date == data.id) {
          state.editIndex = data.index;
          return state.schedule = todo.title[data.index];
        }
      });
      console.log(state.editable)
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
    },
    modalState(state, boolean) {
      const judgeModalState = boolean === 'open' ? true : false;
      state.modalState = judgeModalState;
      if (!judgeModalState) {
        state.todoState = false;
        state.formState = false;
      }
    }
  },
  actions: {
    addTodo({ commit }, el) {
      commit('addTodo', el);
    },
    showForm({ commit }, { id, modalState }) {
      const data = {
        id,
        modalState
      }
      commit('showForm', data);
    },
    showTodo({ commit }, { id, modalState }) {
      const data = {
        id,
        modalState
      }
      commit('showTodo', data);
    },
    editTodo({ commit }, { id, index }) {
      const data = {
        id,
        index
      }
      commit('editTodo', data);
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