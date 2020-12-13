<template>
  <transition name="fade">
    <div v-show="$store.state.modalState">
      <div class="modal-wrap">
        <div class="modal">
          <div class="modal-date">{{ date }}</div>
          <Form v-show="$store.state.formState" @modal-close="modalClose('close')" @add-todo="addTodo"></Form>
          <Todo v-show="$store.state.todoState" ref="todo"></Todo>
        </div>
        <div class="modalBg" @click="modalClose('close')"></div>
      </div>
    </div>
  </transition>

</template>

<script>
import Form from './Form';
import Todo from './Todo';
import { mapActions } from 'vuex';

export default {
  name: 'Modal',
  components: {
    Form,
    Todo
  },
  data() {
    return {
    }
  },
  methods: {
    modalClose(modalState) {
      this.modalState(modalState);
    },
    ...mapActions(["addTodo", "modalState"]),
  },
  computed: {
    date() {
      return this.$store.state.id;
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 300px;
  min-height: 200px;
  padding: 20px 15px;
  background: #fff;
  border-radius: 10px;
  box-sizing:border-box;
  transform: translate(-50%, -50%);
  box-shadow: 3px 6px 16px -6px rgba(0,0,0,0.6);
}
.modal-date {
  margin-bottom: 20px;
}
.modalBg {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
}
</style>
