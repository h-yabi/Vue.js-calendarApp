<template>
  <transition name="fade">
    <div v-show="modalState">
      <div class="modal-wrap">
        <div class="modal">
          <div class="modal-date">{{id}}</div>
          <Form :id="id" @modal-close="modalClose" @add-todo="addTodo"></Form>
        </div>
        <div class="modalBg" @click="modalClose"></div>
      </div>
    </div>
  </transition>

</template>

<script>
import Form from './Form';
import { mapActions } from 'vuex';

export default {
  name: 'Modal',
  components: {
    Form
  },
  data() {
    return {
      id: null,
      modalState: false,
    }
  },
  methods: {
    modalShow(id) {
      this.modalState = true;
      this.id = id;
      this.sample = true;
      setTimeout(function() {
        document.getElementById('inputTodo').focus();
      }, 10);
    },
    modalClose() {
      this.modalState = false;
    },
    ...mapActions(["addTodo"]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  min-width: 300px;
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
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .3);
}
</style>
