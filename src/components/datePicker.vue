<template> 
    <div>
      
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        offset-y
        :nudge-right="40"
         lazy
        transition="scale-transition"    
        full-width    
        min-width="250px"
      >
        <v-text-field
          slot="activator"
          v-model="getDate"
          :label="configComponent.label"
          prepend-icon="event"
          readonly
          @input="triggerEvent"
        >

        </v-text-field>
        <div>
        <v-date-picker hint="DD/MM/YYYY format" locale="es-MX" v-model="date" @input="getDate =  date+' '+e7"></v-date-picker>
        <v-time-picker width="286" v-model="e7" format="24hr"  @input="getDate =  date+' '+e7"></v-time-picker>
        </div>
        <div> 
          <v-btn block color="primary" dark  @click="sendDateEmit()">
            <v-icon >thumb_up</v-icon>
          </v-btn>
        
        </div>
      </v-menu>
    </div>

    
     
</template>

<script>


export default {
  //TODO:cuando se va a actualizar la fecha, en el datepiker no parece la fecha que está en el value
  name: 'datePiker',
  props: {
    configComponent:{},
  },mounted(){
          
          this.getDate = new Date(this.configComponent.value).toLocaleString() 
          console.log({model:this.model});
    },
    methods: {
        sendDateEmit(){
          // this.getDate = new Date(this.getDate)
          // console.log({event:this.getDate});        
          // this.$emit('input', this.getDate);
          this.$emit('input', {value: this.getDate,key:this.configComponent.localReference});    
          this.menu2 = false;
        },
        triggerEvent(event) { 
            // let event = {};
            // event.label = input;
            // event.value = input;
       
            // console.log({event});    
        this.$emit('input', {value:event,key:this.configComponent.localReference});    
        // this.$emit('input', event);      
      },
    },
  data(){
    return {  
      getDate:'',
      date:'',
      e7:'',
      menu2: false,    
      // model:{},
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
.v-picker__title{
    height: 100px
  }

</style>
