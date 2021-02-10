import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import firebase from 'firebase';

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDfnsVF1Q01v39cccwFxeznnofUWRAWVfw",
  authDomain: "vuejs-calendar-app.firebaseapp.com",
  projectId: "vuejs-calendar-app",
  storageBucket: "vuejs-calendar-app.appspot.com",
  messagingSenderId: "1035539345463",
  appId: "1:1035539345463:web:150eb56013cb6c52e30fb2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
