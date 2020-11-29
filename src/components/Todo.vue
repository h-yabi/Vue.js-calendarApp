<template>
  <div class="todo">
    <div class="todo-text">{{ title }}</div>
    <div class="todo-delete"><v-icon>fas fa-times-circle</v-icon></div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      title: null,
    }
  },
  methods: {
    showTodo(title) {
      this.title = title;
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
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
  cursor: pointer;
}
.v-icon.v-icon {
  font-size: 18px;
}
</style>