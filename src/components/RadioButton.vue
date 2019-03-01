<template>
     <b-form-group :label="label">
      <b-form-radio value="A" v-model="selected" name="some-radios">Option A</b-form-radio>
      <b-form-radio value="B" v-model="selected" name="some-radios">Option B</b-form-radio>
    </b-form-group>
</template>


<script>
  import {mdbInput} from 'mdbvue';

export default {    
  name: 'InputTextMdb',
  components: {
      mdbInput
  },
  
  props: {
    value:String,
    label:String,
    type:String
  },
   methods: {
      triggerEvent(event) { 
        this.$emit('input', event);      
      }
    }
}
</script>