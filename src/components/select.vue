<template>
<div>
    <v-select      
      v-model="select1"
      :items="items"
      :label="configComponent.label"
      required      
      item-text="text"
      item-value="value"
      @input="triggerEvent"
    ></v-select>
        <!-- {{select1}} -->
    <component
     v-if="subSelect"
     :is="configComponent.configComponentChild.component"
     v-bind.sync="{configComponent:getConfigComponentChild}"
     v-on:input="dataAddOnchange($event)"
  
     :key="componentKey"
     ></component>
<!--    v-on:key="dataAddOnchangeKey($event)" -->
    <!-- <v-select 
      v-if="subSelect"
      v-model="select2"
      :items="items2"
      label="Seleccion 2"
      item-text="text"
      item-value="value"
      required     
    ></v-select> -->
    <!-- {{select2}} -->
</div>
     
</template>


<script>
//TODO: poner errorer emergentes sobretodo al momento de traer información del servicio
import config from '@/config';
  export default {
    computed: {
      getConfigComponentChild(){

        let configComponentChild = this.configComponent.configComponentChild;
         configComponentChild.dataFather = this.resultData.data.rows.filter(row=>{return row[this.configComponent.reference] === this.select1})[0];
        if(this.configComponent.attributeSequenceTotal !== undefined){
          console.log({thisResultDataDataRows:this.resultData.data.rows});          
          configComponentChild.sequenceTotal = this.resultData.data.rows.filter(row=>{return row[this.configComponent.reference] === this.select1})[0][this.configComponent.attributeSequenceTotal];
          // configComponentChild.SequenceTotal =this.resultData.data.rows[i][this.configComponent.attributeSequenceTotal]     
        }else{
          // configComponentChild.idFather = this.select1
          // configComponentChild.dataFather = this.resultData.data.rows.filter(row=>{return row[this.configComponent.reference] === this.select1})[0];
          // configComponentChild.dataFather[this.configComponentChild.filterService.fatherIdName] = this.select1
        }
        return configComponentChild;
      }
    },
    beforeMount:async function() {
       
        
      //   if(this.configComponent.service !== undefined){   
      //     if(this.configComponent.idReferenceFather !== undefined){ 
      //       console.log(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.idReferenceFather}=${this.configComponent.idFather}`);
            
      //     this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.idReferenceFather}=${this.configComponent.idFather}`)
      //     .catch(error=>{
      //       console.log({error});      
      //       //:TODO: poner acá un mensaje de aviso de eror   
      //     });
      //   }else{
      //      this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}`)
      //       .catch(error=>{
      //         console.log({error});      
      //         //:TODO: poner acá un mensaje de aviso de eror   
      //       });
      //   }
        
      //   // this.items1 =[];
          
      //     for (let i = 0; i < this.resultData.data.rows.length; i++) {
      //         // this.items1.push({
      //         this.items.push({
      //           text: this.resultData.data.rows[i][this.configComponent.attributeNameSelect],//NOMBRE_EQUIPO,
      //           value: this.resultData.data.rows[i][this.configComponent.reference]//.EQUIPO_ID
      //           });
      //     }
      // }
   
      this.items = [];
      console.log({configComponetSelect:this.configComponent});
      
      if(this.configComponent.resultData !== undefined){
            this.resultData = this.configComponent.resultData;  
            for (let i = 0; i < this.resultData.data.rows.length; i++) {
                  // this.items1.push({
                  this.items.push({
                    text: this.resultData.data.rows[i][this.configComponent.attributeNameSelect],//NOMBRE_EQUIPO,
                    value: this.resultData.data.rows[i][this.configComponent.reference]//.EQUIPO_ID
                    });
              }        
      }else if(this.configComponent.service !== undefined){   
              if(this.configComponent.filterService !== undefined){ 
                console.log(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`);
                
              this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`)
              .catch(error=>{
                console.log({error});      
                //:TODO: poner acá un mensaje de aviso de eror   
              });
            }else{
              this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}`)
                .catch(error=>{
                  console.log({error});      
                  //:TODO: poner acá un mensaje de aviso de eror   
                });
            }
            
            // this.items1 =[];
              
              for (let i = 0; i < this.resultData.data.rows.length; i++) {
                  // this.items1.push({
                  this.items.push({
                    text: this.resultData.data.rows[i][this.configComponent.attributeNameSelect],//NOMBRE_EQUIPO,
                    value: this.resultData.data.rows[i][this.configComponent.reference]//.EQUIPO_ID
                    });
              }
          }
      else{
            if(this.configComponent.addCero){
                this.items.push({
                text: 0,
                value: 0
                })
            }
            for (let i = 0; i < this.configComponent.sequenceTotal; i++) {
            this.items.push({
                text: (i + 1),
                value: (i + 1)
                });          
            }
      }
      // if(this.configComponent.componentChild !== undefined){
      //     this.configComponent.componentChild.idFather = {};        
      //   }

    },
    
    created:async function() {

        // this.resultData = this.configComponent.resultFather;
        // if(this.configComponent.configComponentChild){
        //     this.resultDataChild = this.configComponent.resultChild;
        // }
        // console.log({resultData:this.resultData});
        // for (let i = 0; i < this.resultData.data.rows.length; i++) {
        //     this.items1.push({
        //       text: this.resultData.data.rows[i][this.configComponent.attributeTextParent],//NOMBRE_EQUIPO
        //       value: this.resultData.data.rows[i][this.configComponent.attributeValuetParent]//EQUIPO_ID
        //     });
        // }
        
        // let defaultConfig ={
        //   items:[]
        // }
        // for (const key in defaultConfig) {
        //    if(this.configComponent[key] === undefined){
        //     console.log({keyUndefined:key});        
        //     this.configComponent[key] = defaultConfig[key];
        //   }
        // }
    },
    props:{
      configComponent:{}  
    },
    watch: {
      select1($value){

        
        // this.subSelect = false;
        // let subItems = this.resultData.data.rows.filter(row=>{ return row[this.configComponent.attributeValuetParent] /*.EQUIPO_ID*/ === this.select1})
        // console.log({subItems});
        // this.items2 = [];
        // this.select2= '';
        // if(this.configComponent.configComponentChild === undefined){
        //     if(this.configComponent.addCero){
        //         this.items2.push({
        //         text: 0,
        //         value: 0
        //         })
        //     }
        //     for (let i = 0; i < subItems[0].TOTAL; i++) {
        //     this.items2.push({
        //         text: (i + 1),
        //         value: (i + 1)
        //         });          
        //     }
        // }else{
        //     // asignar la lista desplegable de los respectivos hijos
        // }
        if($value !== undefined){
          this.subSelect = false;
          if(this.configComponent.attributeSequenceTotal){               
            this.subSelect = true;
            this.componentKey++;
          }else if(this.configComponent.configComponentChild !== undefined){
            if(this.configComponent.configComponentChild.component !== undefined){
              this.subSelect = true;
              this.componentKey++;
            }
            // this.configComponent.componentChild.idFather = $value;
            // console.log(this.configComponent.componentChild.idFather);          
            // this.configComponent.componentChild.service;
            
          }
        }
      }
    },
    data () {
      return {
        items:[],
        // configComponent:{
        //   componentChild, 
        //   items:[
        //     {
        //       text:'Programming',
        //       value:'1'
        //     },
        //     {
        //       text:'Design',
        //       value:'2'
        //     },
        //     {
        //       text:'Vue',
        //       value:'3'
        //     },
        //     {
        //       text:'Vuetify',
        //       value:'4'
        //     }
        //   ],
        //     configComponentChild:{             
        //       items:[
        //           {
        //             text:'Programming',
        //             value:'1'
        //           },
        //           {
        //             text:'Design',
        //             value:'2'
        //           },
        //           {
        //             text:'Vue',
        //             value:'3'
        //           },
        //           {
        //             text:'Vuetify',
        //             value:'4'
        //           }
        //         ]
        //     },
        // },
        
        resultDataChild:{},
        select1: '',
        select2: '0',
        items1: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ],
        items2: [
          'Programming',
          'Design',
          'Vue',
          'Vuetify'
        ],
        subSelect:false,
        config,
        componentKey:1,
      }
    },
    methods: {
       triggerEvent(event) {              
        this.$emit('input', {value:event,key:this.configComponent.localReference});
        // this.$emit('key', this.configComponent.localReference);        
      },
      dataAddOnchange(item){
        this.$emit('input', item);
      },
      // dataAddOnchangeKey(key){
      //   this.$emit('key', key);   
      // }
   
    },
  }
</script>