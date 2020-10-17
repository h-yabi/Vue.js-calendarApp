<template>
  <div class="modal-wrap">
    <div class="modal">
      <div class="modal-date">{{id}}</div>

    </div>
    <div class="modalBg" @click="modalClose"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modalState: Boolean,
  },
  data() {
    return {
      id: null,
    }
  },
  methods: {
    modalClose() {
      this.$emit("modal-close");
    },
    childeEvent(id) {
      this.id = id;
    }
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
</style>
