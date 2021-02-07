<template>
  <v-app>
    <v-container text-center justify-center>

      <v-flex xs12 class="userInfo">
        <v-list-item-avatar>
          <img v-if="photoUrl" :src="photoUrl">
        </v-list-item-avatar>
        {{ userName }}
      </v-flex>

      <v-layout row wrap>
        <v-flex xs12>
          <h1>TODO機能付きカレンダー</h1>
          <p>ご利用の方は、Googleアカウントでログインしてください。</p>
        </v-flex>

        <v-flex xs12 mt-5>
          <v-btn color='info' @click="login">Googleアカウントでログイン</v-btn>
        </v-flex>

        <v-flex xs12 mt-5 v-if="$store.state.login_user">
          <v-btn color='primary' @click="logout">ログアウト</v-btn>
        </v-flex>

      </v-layout>
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
      } else {
        this.deleteLoginUser();
        this.logout();
      }
    })
  },
  methods: {
    ...mapActions(['login', 'setLoginUser', 'logout', 'deleteLoginUser'])
  },
  computed: {
    ...mapGetters(['userName', 'photoUrl'])
  }
}
</script>

<style lang="scss" scoped>
.userInfo {
  margin-bottom: 100px;
}
</style>
