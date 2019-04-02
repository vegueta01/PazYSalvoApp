import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import theme from './theme'


Vue.use(Vuetify, {
 
  iconfont: 'md',
  theme
})
