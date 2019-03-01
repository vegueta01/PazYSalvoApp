<template>
  <div class="mt-3 mb-3">
    <label >{{label}}</label>
     <date-picker width="100%" v-model="model" :value="value" type="datetime" lang="es" format="YYYY-MM-DD hh:mm:ss" confirm @input="triggerEvent"></date-picker>
  </div>
</template>

<script>


import DatePicker from 'vue2-datepicker'

export default {
  name: 'datePiker',
  components: {
    DatePicker
  },
  props: {
    value:{},
    label:String,
    type:String,
    constraints:{},
    referenceId:{}
  },mounted(){
          this.model = this.value;
          console.log({model:this.model});
    },
    methods: {
        triggerEvent(event) { 
            // let event = {};
            // event.label = input;
            // event.value = input;
       
            console.log({event});        
        this.$emit('input', event);      
      },
    },
  data(){
    return {      
      model:{},
    //   lang=['en', 'zh' , 'es' ,'pt-br' , 'fr' , 'ru' , 'de' , 'it' , 'cs']
    }
  }
}
</script>

<style>
.mx-input {
   height: 50px; 
   font-size: 16px;
   color: rgb(120, 120, 120)
}

</style>
