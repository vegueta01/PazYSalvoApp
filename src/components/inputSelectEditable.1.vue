<template>
    <!-- <div class="mt-3 mb-3"> -->
     <!-- <label >{{label}}</label> -->
     <!-- <v-select :options="getatributeList(options)" :value="selected" :type="type" @input="triggerEvent"></v-select> -->
      <!-- <v-select :items="getatributeList(options)" 
      :value="selected" 
      :label="label" 
      autocomplete 
     
      @input="triggerEvent"
      item-text="state"
      item-value="abbr"></v-select> -->
      
    <!-- </div> 
       v-model="select"
      :loading="loading"
       :search-input.sync="search"
      -->
    
      <v-autocomplete

        :items="getatributeList(configComponent.options)"
        v-model="selected"
        :search-input.sync="search"
        item-text="state"
        item-value="abbr"     
        :label="configComponent.label"   
        @input="triggerEvent"
        :dont-fill-mask-blanks="true"
        chips
        deletable-chips
      ></v-autocomplete>
   
</template>

<script>
//   import {mdbInput} from 'mdbvue';

export default {    
  name: 'inputSelectEditable',
  components: {
    //   mdbInput
  },  
  props: {
    configComponent:{},
    // value:String,
    // label:String,
    // type:String,
    // options:Array,
    // constraints:{},
    // referenceId:{},
    
  },
  computed: {
   
  },
   methods: {
     
      triggerEvent(event) { 
        // console.log({event});
        
        //   if(event.abbr === undefined){
        //       event.abbr=event.state
        //   }
        // console.log({selected:this.selected});
        
        //   console.log({event});        
          this.$emit('input', {value:event,key:this.configComponent.localReference});     
        // this.$emit('input', event);      
      },
       getatributeList(options){
          let lisOption =[];
        // console.log({options});
        // console.log({constraints:this.constraints});
        // console.log({referenceId:this.referenceId});
          for (let i = 0; i < options.length; i++) {                     
              if(this.configComponent.constraints.service){
                let option = {state: `${options[i][this.configComponent.constraints.attributeNameSelect]}`, abbr: options[i][this.configComponent.constraints.reference]};
                lisOption.push(option)
              }else{                  
                  let option = {state: options[i], abbr: options[i]};
                  lisOption.push(option)                 
              }
              
          }
        
  
        // this.selected={state:this.value,abbr:this.referenceId}
        // this.selected={state:'GEN_AUD_AUDITORIA',abbr:'1'}
        
         this.selected=this.configComponent.referenceId;
          // console.log({selected:this.selected});
          return lisOption;
      }
    },
    data(){
        return{
            selected:2,
            //  selected:null
            // model: {state:'GEN_AUD_AUDITORIA',abbr:'1'},
            search: null
        }
    }
}
</script>

