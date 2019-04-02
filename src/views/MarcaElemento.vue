<template> 
    <tableAutomatic v-bind="{configComponent:configTable1}" />
</template>

<script>
  import tableAutomatic from '@/components/tableAutomatic.vue'
   

export default {
        components:{
            tableAutomatic
        },
        data() {
            return { 
                configTable1:{                     
                tableTitle:"Marca del equipo",          
                service:'pstMarcaElemento',
                idName:'PST_MEL_ID',
                noColumns:[], // son las columas que no se quieren mostrar
                columns:[
                 { 
                  key:'PST_MEL_NOMBRE',
                  label:'Nombre'
                  }            
                ], 
                // constraint:[
                //   {
                //     localReference:'PST_TII_ID_ESTADO',
                //     reference:'GEN_EST_ID',
                //     attributeNameSelect:'GEN_EST_NOMBRE',
                //     service:'pstTipoInventario/consult/estadoActivo',
                //     label:'Estado',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   } 
                // ],              
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