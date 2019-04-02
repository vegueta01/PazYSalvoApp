<template>
  <div>
    <v-layout row justify-center></v-layout>
     <v-btn color="primary" @click="dialog = true">Open Dialog</v-btn>
    <!-- <v-dialog v-model="dialog">
      felipe
    </v-dialog> -->
      <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
                </template>
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Comprobante de asignación</v-toolbar-title>
                  </v-toolbar>
                          <div style="height: 500px">
                            <PDFViewer
                            v-bind="{url}"
                            @document-errored="onDocumentErrored"
                            >
                            </PDFViewer> 
                      </div>
                 
                </v-card>
              </v-dialog> -->
   <!-- <PDFViewer
      v-bind="{url}"
      @document-errored="onDocumentErrored"
      >
       <PDFUploader
        v-if="enableUploader"
        :documentError="documentError"
        @updated="urlUpdated"
        slot="header"
        class="header-item"
        />
    </PDFViewer> -->
     <!-- <v-card v-if="dialog">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Comprobante de asignación</v-toolbar-title>
                
        </v-toolbar>
        <div style="height: 500px">
              <PDFViewer
              v-bind="{url}"
              @document-errored="onDocumentErrored"
              >
              </PDFViewer> 
        </div>
      </v-card> -->
      
      <v-flex shrink>
        <v-expand-x-transition>
          <div v-show="dialog" style="white-space: nowrap">
               <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Comprobante de asignación</v-toolbar-title>
                        
                </v-toolbar>
                <div style="height: 700px">
                  <iframe id="iFramePdf" :src="url" style="height: 100%;width:100%"></iframe>
                      <!-- <PDFViewer
                      v-bind="{url}"
                      @document-errored="onDocumentErrored"
                      >
                      </PDFViewer>  -->
                </div>
              </v-card>
          </div>
        </v-expand-x-transition>
      </v-flex>
  </div>
</template>

<script>
// import PDFUploader from '@/components/PDFUploader.vue'
// import PDFViewer from '@/components/PDFViewer.vue'
export default {
  name: 'app',
  components: {
    // PDFUploader,
    // PDFViewer,
  },
  data() {
    return {
      id:10,
      url: 'http://localhost:3000/reportsHardwareAllocation/?ID=10',
      documentError: undefined,
      enableUploader:false,

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  methods: {
    urlUpdated(url) {
      this.documentError = undefined;
      this.url = url;
    },
    onDocumentErrored(e) {
      this.documentError = e.text;
    },
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #606f7b;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #62637a;
}
label.form {
  color: white;
  font-family: Monaco, 'Courier New', Courier, monospace;
  font-weight: bold;
  margin-bottom: 2em;
  display: block;
}
input {
  padding: 0.45em;
  font-size: 1em;
}
.error {
  border: 1px solid red;
  background: pink;
  color: red;
  padding: 0.5em 3em;
  display: inline;
}
a.icon {
  cursor: pointer;
  display: block;
  border: 1px #333 solid;
  background: white;
  color: #333;
  font-weight: bold;
  padding: 0.25em;
  width: 1em;
  height: 1em;
  font-size: 1.5em;
}
.box-shadow {
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
}
.overflow-hidden {
  overflow: hidden;
}
@media print {
  body {
    background-color: transparent;
  }
  #app {
    margin: 0;
    padding: 0;
  }
}
</style>