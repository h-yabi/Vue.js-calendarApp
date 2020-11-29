<template>
  <div class="todo">
    <div class="todo-text">{{ title }}</div>
    <div class="todo-delete"><span></span></div>
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
  position: relative;
  margin-top: 2px;
  padding: 3px 5px;
  border-radius: 4px;
  background-color: #d7dbef;
  color: #2c3e50;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
}
.todo-text {
  width: 90%;
}
.todo-delete {
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  span {
    display: block;
    position: relative;
    width: 15px;
    height: 15px;
    &:before,
    &:after {
      position: absolute;
      content: "";
    }
  }
}
</style>