<template>
  <div class="todo">
    <template v-for="todo in $store.state.todoList">
      <div class="todoList" v-if="todo.date == $store.state.id" :key="todo.id">
        <template v-for="(titleArray, index) in todo.titleArray">
          <div class="todoItem" :key="titleArray.todoId" :id="titleArray.todoId">
            {{ titleArray.title }}
            <div class="todo-icon-wrap">
              <div class="todo-edit" @click="editItem(todo.date, titleArray.todoId, index)"><v-icon>fas fa-edit</v-icon></div>
              <div class="todo-delete" @click="deleteItem(todo.date, titleArray.todoId, index, todo.titleArray)"><v-icon>fas fa-times-circle</v-icon></div>
            </div>
          </div>
        </template>
      </div>
    </template>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Todo',
  data() {
    return {
    }
  },
  methods: {
    editItem(id, todoId, index) {
      this.editTodo({id, todoId, index})
      setTimeout(function() {
        document.getElementById('inputTodo').focus();
      }, 10);
    },
    deleteItem(id, todoId, index, titleArray) {
      let length = titleArray.length - 1;
      this.deleteTodo({id, todoId, index, length});
    },
    ...mapActions(['editTodo', 'deleteTodo']),
  },
}
</script>

<style lang="scss" scoped>
.todoItem {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 2px;
  padding: 5px;
  border-radius: 4px;
  background-color: #d7dbef;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
}
.todo-icon-wrap {
  display: flex;
  align-items: center;
}
.todo-edit {
  margin-right: 7px;
  .v-icon.v-icon {
    font-size: 14px;
  }
}
.v-icon.v-icon {
  font-size: 18px;
  cursor: pointer;
}
.modal {
  .todoNum {
    display: none;
  }
}
.fa-times-circle:before {
  color: black;
}
</style>