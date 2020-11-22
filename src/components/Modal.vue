<template>
  <div class="modal-wrap">
    <div class="modal">
      <div class="modal-date">{{id}}</div>
      <v-form v-on:submit.prevent="emitTodoEvent(id)" name="form">
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            label="予定を入れる"
            v-model="schedule"
            id="inputTodo"
          ></v-text-field>
        </v-col>
        <v-btn
          color="primary"
          elevation="2"
          type="submit"
        >予定を追加</v-btn>
      </v-form>
    </div>
    <div class="modalBg" @click="modalClose"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      id: null,
      schedule: ''
    }
  },
  methods: {
    modalClose() {
      this.$emit("modal-close");
    },
    modalShow(id) {
      this.id = id;
      setTimeout(function() {
        document.getElementById('inputTodo').focus();
      }, 10);
    },
    emitTodoEvent(date) {
      if(this.schedule === '') return;
      this.$emit("add-todo", {date, title: this.schedule});
      this.$emit("modal-close");
      this.schedule = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.v-application {
  min-height: 100% !important;
  // height: 100px;
  overflow: hidden;
}
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-input {
  width: 100%;
  max-width: 200px;
  margin: auto;
}
.col-md-3 {
  max-width: none;
  padding: 0;
}
</style>
