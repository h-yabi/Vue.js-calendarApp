<template>
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
</template>

<script>

export default {
  name: 'Form',
  props: ['id'],
  data() {
    return {
      schedule: ''
    }
  },
  methods: {
    emitTodoEvent(date) {
      if(this.schedule === '') return;
      this.$emit("add-todo", {date, title: this.schedule});
      this.$emit("modal-close");
      this.schedule = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
.v-application {
  min-height: 100% !important;
  overflow: hidden;
}
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
