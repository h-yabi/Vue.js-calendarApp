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
    schedule: null // 編集ボタンを押したtodoのテキストが入る
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
    },
    changeTodo(state, data) {
      const that = this;
      if(state.editable) {
        state.todoList.map(todo => {
          if (todo.date == data.date) {
            todo.title[state.editIndex] = data.schedule;
          }
        });

        // この方法でスマートにかけたら良いのだが、、
        // 参考サイト： https://jp.vuejs.org/v2/guide/reactivity.html
        // state.todoList = Object.assign({}, state.todoList)

        // 良い処理の方法ではない、$setを変更検出用に使用し、第二引数以降未指定（$set(state.todoList)）によって追加されたundefinedを無理やり削除している感じ。
        that._vm.$set(state.todoList);
        delete state.todoList.undefined

        state.modalState = false;
        state.formState = false;
        state.editable = false;
        state.schedule = '';
      }
    },
    deleteTodo(state, data) {
      state.todoList.map(todo => {
        if (todo.date == data.id) {
          return todo.title.splice(data.index, 1)
        }
      })
      if (data.length.length === 0) {
        state.modalState = false;
        state.todoState = false;
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
    changeTodo({ commit }, { date, schedule }) {
      const data = {
        date,
        schedule
      }
      commit('changeTodo', data)
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
    getSchedule: state => state.schedule,
    getTodoList: state => state.getTodoList
  }
})