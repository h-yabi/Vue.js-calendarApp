<template>
  <v-form v-on:submit.prevent="emitTodoEvent($store.state.id)" name="form">
    <v-col
      cols="12"
      sm="6"
      md="3"
    >
      <v-text-field
        label="予定を入れる"
        v-model="data"
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
import { mapActions } from 'vuex';

export default {
  name: 'Form',
  data() {
    return {
      schedule: '',
    }
  },
  methods: {
    emitTodoEvent(date) {
      // console.log(this.schedule)
      // console.log(this.$store.state.schedule)

      if(this.schedule === '' && this.$store.state.schedule !== '') {
        this.schedule = this.$store.state.schedule;
        return;
      }
      if(this.$store.state.editable) {
        // alert('success!!')
        this.$store.state.todoList.map(todo => {
            // console.log(this.schedule)
            // console.log(this.$store.state.editIndex)
            // console.log(todo.title)
          if (todo.date == date) {
            return todo.title[this.$store.state.editIndex] = this.schedule;
          }
        });
        console.log(this.$store.state.todoList)
        this.$store.state.modalState = false;
        this.$store.state.formState = false;
        this.$store.state.editable = false;
        this.schedule = '';
      } else {
        console.log(this.$store.state.schedule)
        if(this.schedule  === '') return;
        this.addTodo({date, title: this.schedule})
        this.schedule = '';
      }
      // console.log(this.schedule)
    },
    ...mapActions(["addTodo"])
  },
  computed: {
    data: {
      get() {
        console.log(this.$store.state.editable ? this.$store.state.schedule : this.schedule);
        return this.$store.state.editable ? this.$store.state.schedule : this.schedule;
      },
      set(schedule) {
        console.log(this.schedule)
        console.log(schedule)
        this.schedule = schedule;
      },
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
