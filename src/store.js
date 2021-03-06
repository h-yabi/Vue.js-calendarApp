import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  // プロジェクト全体で使うstateを入れる
  state: {
    login_user: null,
    todoList: [],
    dateArray: [],
    filteringDateArray: [],
    id: null,
    todoId: null,
    modalState: false,
    formState: false,
    todoState: false,
    editable: false,
    editIndex: null,
    schedule: null // 編集ボタンを押したtodoのテキストが入る
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    addTodo(state, { todoId, el }) {
      if(state.todoList.length < 1) {
        state.todoList.push({
          date: el.date,
          titleArray: [{
            todoId,
            title: el.title
          }]
        });
      } else {
        let num = state.filteringDateArray.indexOf(el.date);
        if(state.filteringDateArray.indexOf(el.date) === -1) {
          state.todoList.push({
            date: el.date,
            titleArray: [{
              todoId,
              title: el.title
            }]
          });
        } else {
          state.todoList[num].titleArray.push({
            todoId,
            title: el.title
          });
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
    editTodo(state, { id, todoId, index }) {
      state.todoId = todoId;
      state.editable = true;
      state.todoState = false;
      state.formState = true;
      state.todoList.map(todo => {
        if (todo.date == id) {
          state.editIndex = index;
          return state.schedule = todo.titleArray[index].title;
        }
      });
    },
    updateTodo(state, { date, todoId, schedule }) {
      state.todoId = todoId;
      // const that = this;
      if(state.editable) {
        state.todoList.map(todo => {
          if (todo.date == date) {
            todo.titleArray[state.editIndex].title = schedule;
          }
        });

        // この方法でスマートにかけたら良いのだが、、
        // 参考サイト： https://jp.vuejs.org/v2/guide/reactivity.html
        // state.todoList = Object.assign({}, state.todoList)

        // 良い処理の方法ではない、$setを変更検出用に使用し、第二引数以降未指定（$set(state.todoList)）によって追加されたundefinedを無理やり削除している感じ。
        // that._vm.$set(state.todoList);
        // delete state.todoList.undefined

        state.modalState = false;
        state.formState = false;
        state.editable = false;
        state.schedule = '';
      }
    },
    deleteTodo(state, { id, index, length }) {
      state.todoList.map(todo => {
        if (todo.date == id) {
          return todo.titleArray.splice(index, 1)
        }
      })
      if (length === 0) {
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
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user);
    },
    deleteLoginUser({ commit }) {
      commit('deleteLoginUser');
    },
    fetchTodo({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/todo`).get().then(snapshot => {
        snapshot.forEach(doc => {
          const el = doc.data();
          commit('addTodo', { todoId: doc.id, el });
        })
      })
    },
    login() {
      const google_auth_provier = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provier);
    },
    logout() {
      firebase.auth().signOut();
    },
    addTodo({ getters, commit }, el) {
      if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/todo`).add(el).then(doc => {
        commit('addTodo', { todoId: doc.id, el });
      })
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
    editTodo({ commit }, { id, todoId, index }) {
      commit('editTodo', { id, todoId, index });
    },
    updateTodo({ getters, commit }, { date, todoId, schedule }) {
      if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/todo`).doc(todoId).update({ date, title: schedule }).then(() => {
        commit('updateTodo', { date, todoId, schedule });
      })
    },
    deleteTodo({ getters, commit }, { id, todoId, index, length }) {
      if (getters.uid) firebase.firestore().collection(`users/${getters.uid}/todo`).doc(todoId).delete().then(() => {
        commit('deleteTodo', { id, index, length });
      })
    },
    modalState({ commit }, boolean) {
      commit('modalState', boolean);
    },
  },
  getters: {
    getSchedule: state => state.schedule,
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoUrl: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
  }
})