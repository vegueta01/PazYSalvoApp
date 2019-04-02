<template>
  <div>
    <!-- :items="items"  :items="getatributeList(configComponent.options)"-->
    <v-autocomplete 
      v-model="select1"
      :items="getatributeList()"     
      :label="configComponent.label"
      required
      item-text="text"
      item-value="value"
      @input="triggerEvent"
    ></v-autocomplete>
    <!-- {{select1}} -->
     <component
      v-if="subSelect"
      :is="configComponent.configComponentChild.component"
      v-bind="{configComponent:configComponent.configComponentChild}"
      v-on:input="dataAddOnchange($event)"
    
      :key="componentKey"
     ></component>
  </div>
</template>


<script>
//TODO: poner errorer emergentes sobretodo al momento de traer información del servicio
import config from "@/config";
export default {
 

  props: {
    configComponent: {}
  },

  data() {
    return {
      items: [],
      resultDataChild: {},
      select1: "",
      subSelect: false,
      config,
      componentKey: 1,
      // start:false,
    };
  },
  methods: {
     getatributeList(options){
          let lisOption =[];
         console.log({thisConfigComponent:this.configComponent})
        if(this.configComponent.resultData !== undefined){
          if(this.configComponent.resultData){
            for (let i = 0; i < this.configComponent.resultData.data.rows.length; i++) {  
              let option = {text: this.configComponent.resultData.data.rows[i][this.configComponent.attributeNameSelect], value: this.configComponent.resultData.data.rows[i][this.configComponent.reference]};
              lisOption.push(option)               
            }
          }else{
            for (let i = 0; i < this.configComponent.resultData.data.rows.length; i++) {
              let option = {text: `${this.configComponent.resultData.data.rows[i][this.configComponent.attributeNameSelect]}`, value: this.configComponent.resultData.data.rows[i][this.configComponent.reference]};
              lisOption.push(option)
            }
          }
          this.select1=this.configComponent.referenceId;
          console.log({lisOption});
          
          return lisOption;
        } 
        else if (this.configComponent.service !== undefined) {
            if (this.configComponent.filterService !== undefined) {
              console.log(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`);

                this.$http
                .get(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`)
                .then(resp=>{
                  this.configComponent.resultData = resp;
                  for (let i = 0; i < this.configComponent.resultData.data.rows.length; i++) {         
                      let option = 
                        {
                          text: this.configComponent.resultData.data.rows[i][this.configComponent.attributeNameSelect], //NOMBRE_EQUIPO,
                          value: this.configComponent.resultData.data.rows[i][this.configComponent.reference] //.EQUIPO_ID
                        }
                      lisOption.push(option);
                    }
                    this.select1=this.configComponent.referenceId;
                    return lisOption;
                })
                .catch(error => {
                  console.log({ error });
                  //:TODO: poner acá un mensaje de aviso de eror
                });
            } else {
                this.$http
                .get(`${this.config.urlBase}/${this.configComponent.service}`)
                .then(resp=>{
                  this.configComponent.resultData = resp;
                  for (let i = 0; i < this.configComponent.resultData.data.rows.length; i++) {         
                      let option = 
                        {
                          text: this.configComponent.resultData.data.rows[i][this.configComponent.attributeNameSelect], //NOMBRE_EQUIPO,
                          value: this.configComponent.resultData.data.rows[i][this.configComponent.reference] //.EQUIPO_ID
                        }
                      lisOption.push(option);
                    }
                    this.select1=this.configComponent.referenceId;
                    return lisOption;
            
                })
                .catch(error => {
                  console.log({ error });
                  //:TODO: poner acá un mensaje de aviso de eror
                });
            }
          } else {
            if (this.configComponent.addCero) {
              let option = {
                text: 0,
                value: 0
              }
              lisOption.push(option);
            }
            for (let i = 0; i < this.configComponent.sequenceTotal; i++) {
              let option = {
                text: i + 1,
                value: i + 1
              }
              lisOption.push(option);
            }
            this.select1=this.configComponent.referenceId;
            return lisOption;
          }
        
      },
    triggerEvent(event) {
      if(this.select1 !== undefined){ 
        // this.$nextTick(function () {
        //   console.log('nex tick'+this.$el.textContent) // => 'updated'
        // })    
        this.subSelect = false;
        // let configComponentChild = this.configComponent.configComponentChild;
        if(! this.configComponent.configComponentChild){
          this.configComponent.configComponentChild = {};
        }
        this.configComponent.configComponentChild.dataFather  ={};
        this.configComponent.configComponentChild.dataFather = this.configComponent.resultData.data.rows.filter(row => {return row[this.configComponent.reference] === this.select1;})[0];
        // if (this.configComponent.attributeSequenceTotal !== undefined) {

         
        // }
        if (this.configComponent.attributeSequenceTotal) {
           console.log({ thisResultDataDataRows: this.configComponent.resultData.data.rows });
          this.configComponent.configComponentChild.sequenceTotal = this.configComponent.resultData.data.rows.filter(row => { return row[this.configComponent.reference] === this.select1; })[0][this.configComponent.attributeSequenceTotal];
          this.subSelect = true;
          this.componentKey++;
        } else if (this.configComponent.configComponentChild !== undefined) {
          if (this.configComponent.configComponentChild.component !== undefined) {
            this.subSelect = true;
            this.componentKey++;
          }
        }
      }     
      this.$emit("input", {
        value: event,
        key: this.configComponent.localReference
      });
      // this.$emit('key', this.configComponent.localReference);
    },
    dataAddOnchange(item) {
      this.$emit("input", item);
    }
  }
};
</script>