<template> 
    <tableAutomatic v-bind="{configComponent:configTable1}" />
</template>

<script>
  import tableAutomatic from '@/components/tableAutomatic.vue'
   import inputSelectEditable from '@/components/inputSelectEditable.vue'

export default {
        components:{
            tableAutomatic
        },
        data() {
            return { 
                configTable1:{                     
                tableTitle:"Inventario",          
                service:'pstInventario',
                idName:'PST_INV_ID',
                noColumns:[], // son las columas que no se quieren mostrar
                columns:[
                 { 
                  key:'PST_INV_TOTAL',
                  label:'Total'
                  },
                  { 
                  key:'PST_INV_TOTAL',
                  label:'Total'
                  }             
                ], 
                constraint:[
                  {
                    component:inputSelectEditable,
                    localReference:'PST_INV_ELE_ID',
                    reference:'PST_ELE_ID',
                    attributeNameSelect:'PST_ELE_NOMBRE_EQUIPO',
                    service:'pstElemento',
                    label:'Equipoi',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  } 
                ],              
                    // withChekbox:true,
                    // chekboxLocalReference:'MAN_MDT_REALIZADA',
                    // add:false,
                    // edit:false,                   
                    // expand:true,
                    // expandOne:true,
                    // pagination:false,
                    // paginationRowsPerPage:-1,// numero de registros a mostrar
                    // paginationPage:1,//página en la que desea que aparezca
                    // expandText: 'texto ejemplo',
                    // expandComponent:tableAutomaticSelected,
                    // idReferenceComponent:'MAN_MDT_MAN_ID',
                  
                    
                },
            }
        },
    }
</script>