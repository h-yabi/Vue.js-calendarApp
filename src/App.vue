<template>
  <v-app>
    <v-container text-center justify-center>

      <v-flex xs12 class="userInfo">
        <v-list-item-avatar>
          <img v-if="photoUrl" :src="photoUrl">
        </v-list-item-avatar>
        {{ userName }}
        <v-btn v-if="$store.state.login_user" class="spacing-playground ma-4" color='primary' @click="logout">ログアウト</v-btn>
      </v-flex>

      <router-view/>

    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setLoginUser(user);
        this.fetchTodo();
        if(this.$router.currentRoute.name === 'home') this.$router.push({ name: 'calendar' })
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: 'home' }, () => {})
      }
    })
  },
  methods: {
    ...mapActions(['login', 'setLoginUser', 'logout', 'deleteLoginUser', 'fetchTodo'])
  },
  computed: {
    ...mapGetters(['userName', 'photoUrl'])
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  margin-bottom: 50px;
}
</style>
