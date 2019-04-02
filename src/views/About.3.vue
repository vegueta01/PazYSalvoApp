<template>
  <div id="app">
 
    <file-pond
        name="file"
      
        label-idle="Arrastra tus archivos aquí..."
        allow-multiple="true"
        
        :server="server"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"/>
 
  </div>
</template>
 
<script>
// Import Vue FilePond
import vueFilePond from 'vue-filepond';
 
// Import FilePond styles
import '../assets/css/filepond.min.css';
 
// Import FilePond plugins
// Please note that you need to install these plugins separately
 
// Import image preview plugin styles
import '../assets/css/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 
// Create component
const FilePond = vueFilePond(FilePondPluginImagePreview);
 
 import config from '@/config';
export default {
    name: 'Abour',
    computed: {
      urlPost(){
       return this.config.urlBase+'/saveFileAllocation'
      }
    },
    data: function() {
        return {
          
          // urlPost:'/saveFileAllocation',
          config,
          myFiles: [],
          server:{
            url:config.urlBase,
            process: {
            url: '/saveFileAllocation/123',
            // method: 'POST',
            // withCredentials: false,
            // headers: {
            //   body:{id:'mi_id1'},
            //   data:{id:'mi_id2'}
            // },
            // timeout: 7000,
            // onload: null,
            // onerror: null,
            // ondata: null
            }
          }
        };
    },
    methods: {
        handleFilePondInit: function() {
            console.log('FilePond has initialized');
 
            // FilePond instance methods are available on `this.$refs.pond`
        }
    },
    components: {
        FilePond
    }
};
</script>

<style>
  
</style>