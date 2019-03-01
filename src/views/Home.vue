<template>
  <v-layout
          justify-center
          align-center
        >
       <v-flex text-xs-center> 
        <v-container>
          <v-layout
            text-xs-center
            wrap
          >
            <v-flex xs12>
              <v-img
                :src="require('../assets/logo_aerosan.png')"
                class="my-3"
                contain
                height="120"
              ></v-img>
            </v-flex>
          </v-layout>
        </v-container>

          </v-flex>
        </v-layout>
   
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    }
  }
</script>
