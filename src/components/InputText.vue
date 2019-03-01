<template>
    <v-text-field :label="label" :value="value" :type="type" @input="triggerEvent"  class="mb-5"></v-text-field>    
</template>

<script>
  // import {mdbInput} from 'mdbvue';

export default {    
  name: 'InputText',
  components: {
      // mdbInput
  },
  
  props: {
    value:String,
    label:String,
    type:String
  },
  mounted() {
    console.log({label:this.label});
    
  },
   methods: {
      triggerEvent(event) { 
        this.$emit('input', event);      
      }
    }
}
</script>


