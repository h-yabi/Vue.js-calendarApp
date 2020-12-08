<template>
  <div class="todo">
    <template v-for="todo in $store.state.todoList">
      <div class="todoList" v-if="todo.date == id" :key="todo.id">
        <template v-for="(title, index) in todo.title">
          <div class="todoItem" :key="index">
            {{title}}
            <div class="todo-delete" @click="deleteItem(todo.date, index, todo.title)"><v-icon>fas fa-times-circle</v-icon></div>
            </div>
        </template>
        <div
          class="todoNum"
          v-if="todo.title.length > 3"
        >他{{todo.title.length - 3}}件</div>
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
      id: null,
      todoId: null,
    }
  },
  methods: {
    showTodo(id, index) {
      this.id = id; // 日付 2020-12-01 など
      this.todoId = index; // todo ID
    },
    deleteItem(id, index, length) {
      this.deleteTodo({id, index, length});
    },
    ...mapActions(['deleteTodo']),
  }
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
.todo-delete {
  display: flex;
  align-items: center;
}
.v-icon.v-icon {
  font-size: 18px;
  cursor: pointer;
}
</style>