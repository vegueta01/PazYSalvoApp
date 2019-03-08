<template>
 <div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/inventario">
          <v-list-tile-action>
            <v-icon>bar_chart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Inventario</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
           <v-list-tile to="/estados">
          <v-list-tile-action>
            <v-icon>screen_lock_rotation</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Estados</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Paz y salvo</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid >
        <!-- <v-layout
          justify-center
          align-center
        > -->
          <!-- <v-flex text-xs-center> -->
           <router-view/>
          <!-- </v-flex> -->
        <!-- </v-layout> -->
      </v-container>
    </v-content>
    <!-- <v-footer color="indigo" app>
      <span class="white--text">&copy;Aerosan 2019</span>
    </v-footer> -->
    <v-footer color="primary" class="white--text" app>
      <span>Aerosan</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</div>
  <!-- <v-app>   
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      drawer:true
      //
    }
  }
}
</script>
