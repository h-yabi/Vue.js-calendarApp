<template>
  <div class="todo">
    <template v-for="todo in $store.state.todoList">
      <div class="todoList" v-if="todo.date == $store.state.id" :key="todo.id">
        <template v-for="(title, index) in todo.title">
          <div class="todoItem" :key="index">
            {{title}}
            <div class="todo-icon-wrap">
              <div class="todo-edit" @click="editItem(todo.date, index)"><v-icon>fas fa-edit</v-icon></div>
              <div class="todo-delete" @click="deleteItem(todo.date, index, todo.title)"><v-icon>fas fa-times-circle</v-icon></div>
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
    editItem(id, index) {
      this.editTodo({id, index})
    },
    deleteItem(id, index, length) {
      this.deleteTodo({id, index, length});
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