<template>
    <v-text-field :label="configComponent.label" :value="configComponent.value" :type="configComponent.type" @input="triggerEvent"  class="mb-5"></v-text-field>    
    <!-- :TODO: cuando llega un 0 aparece un error O.o -->
</template>

<script>
  // import {mdbInput} from 'mdbvue';

export default {    
  name: 'InputText',
  
  props: {
    configComponent:{},
    // value:String,
    // label:String,
    // type:String
  },
  mounted() {
    console.log({label:this.configComponent.label});     
  },
   methods: {
      triggerEvent(event) { 
        this.$emit('input', {value:event,key:this.configComponent.localReference});   
        // this.$emit('input', event);         
      }
    }
}
</script>


