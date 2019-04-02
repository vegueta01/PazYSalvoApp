<template>
<div>
    <!-- <v-select
      v-model="select1"
      :items="items1"
      label="Seleccion 1"
      required     
      item-text="text"
      item-value="value"
    ></v-select>
    {{select1}}
    <v-select 
      v-if="subSelect"
      v-model="select2"
      :items="items2"
      label="Seleccion 2"
      item-text="text"
      item-value="value"
      required     
    ></v-select>
    {{select2}} -->
    <selectComponent
     v-bind="{configComponent}" 
     v-on:input="dataAddOnchange($event)"
     />
     <!-- v-on:key="dataAddOnchangeKey($event)" -->
</div>
     
</template>


<script>
  import selectComponent from '@/components/select.vue'
  export default {
    beforeMount:async function() {

        this.resultData = await this.$http.get('http://192.168.37.8:3000/genCompania')
        .catch(error=>{
          console.log({error});      
          //:TODO: poner acá un mensaje de aviso de eror   
        });

        
       
      console.log({resultData:this.resultData});
      this.items1 =[];
      // this.configComponent.items=[];
        for (let i = 0; i < this.resultData.data.rows.length; i++) {
            this.items1.push({
              text: this.resultData.data.rows[i].GEN_COM_NOMBRE,
              value: this.resultData.data.rows[i].GEN_COM_ID
              }); 
              // this.configComponent.items.push({
              //   text: this.resultData.data.rows[i].GEN_COM_NOMBRE,
              //   value: this.resultData.data.rows[i].GEN_COM_ID
              // }); 
        }
        this.resultDataChild = await this.$http.get('http://192.168.37.8:3000/genCompaniaSede')
        .catch(error=>{
          console.log({error});      
          //:TODO: poner acá un mensaje de aviso de eror   
        });


    },
    watch: {
      select1(){
        this.subSelect = false;
        let subItems = this.resultData.data.rows.filter(row=>{ return row.EQUIPO_ID === this.select1})
        console.log({subItems});
        this.items2 = [];
        this.select2= '';
        for (let i = 0; i < subItems[0].TOTAL; i++) {
           this.items2.push({
              text: (i + 1),
              value: (i + 1)
              });          
        }
        
        this.subSelect = true;
      }
    },
    components:{
          selectComponent
      },
    methods: {
      showSubSelect(){
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          
        }
        
      },
      // dataAddOnchangeKey(key){
      //   console.log({key});
        
      // },
      dataAddOnchange(text){
        console.log(text);
        
      }
    },
    data () {
      return {
        configComponent:{

         
          component:selectComponent,
          localReference:'1',
          service:'genCompania',
          attributeNameSelect:'GEN_COM_NOMBRE',
          reference:'GEN_COM_ID',

            configComponentChild:{
              component:selectComponent,
              localReference:'2',
              service:'genCompaniaSede',
              idReferenceFather:'GEN_CSE_COM_ID',  
              attributeNameSelect:'GEN_CSE_NOMBRE',
              reference:'GEN_CSE_ID',   
            

              configComponentChild:{
                component:selectComponent,
                 localReference:'3',
                service:'genCompaniaSedeArea',
                idReferenceFather:'GEN_CSA_CSE_ID',  
                attributeNameSelect:'GEN_CSA_NOMBRE',
                reference:'GEN_CSA_ID',
              } 
          }
          //------------------------ contar
          // componentChild:selectComponent,
          // label:'Equipo',
          // service:'pstElemento/consult/getAssignedElements/1',
          // localReference:'PST_TDE_ELE_ID',
          // attributeNameSelect:'NOMBRE_EQUIPO',// textName:'NOMBRE_EQUIPO',
          // reference:'EQUIPO_ID',// valueName:'EQUIPO_ID',
          // attributeSequenceTotal:'TOTAL',
          // configComponentChild:{  
          //   component:selectComponent,
          //   label:'Cantidad',
          //   localReference:'PST_TDE_CANTIDAD',       
          //   // addCero:false
          // }
          //--------------------------
          // items:[
          //   {
          //     text:'Programming',
          //     value:'1'
          //   },
          //   {
          //     text:'Design',
          //     value:'2'
          //   },
          //   {
          //     text:'Vue',
          //     value:'3'
          //   },
          //   {
          //     text:'Vuetify',
          //     value:'4'
          //   }
          // ],

            // configComponentChild:{
            //   service:'genCompaniaSede',
            //   idReferenceFather:'GEN_CSE_COM_ID',  
            //   textName:'GEN_CSE_NOMBRE',
            //   valueName:'GEN_CSE_ID',   
            //   componentChild:selectComponent, 
            //   configComponentChild:{
            //     service:'genCompaniaSedeArea',
            //     idReferenceFather:'GEN_CSA_CSE_ID',  
            //     textName:'GEN_CSA_NOMBRE',
            //     valueName:'GEN_CSA_ID',
            //   }               
            // },
        },
        resultData:{},
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
      }
    }
  }
</script>