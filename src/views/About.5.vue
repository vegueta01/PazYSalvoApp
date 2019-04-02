<template>
<div>
  <v-card>
    <v-card-text>
      <v-btn
        block
        color="primary"
        dark
        @click="snackbarShow = true"
      >
        Show Snackbar
      </v-btn>
    </v-card-text>
  
  </v-card>

    <v-snackbar
      v-model="snackbarShow"
      color="red"
       multi-line="multi-line"
      :timeout="6000"
     
    >
      {{ snackbarMessage }}
      <v-btn
        dark
        flat
        @click="snackbarShow = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</div>
  
</template>

<script>
  export default {
    data () {
      return {
        snackbarShow: false,      

        snackbarMessage: 'Error'
      }
    }
  }
</script>