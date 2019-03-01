<template> 
    <tableAutomatic2 v-bind="{service,idName,constraint,tableTitle,columns,noColumns}" />
</template>

<script>
  import tableAutomatic2 from '@/components/tableAutomatic2.vue'

export default {
        components:{
            tableAutomatic2
        },
        data() {
            return { 
                tableTitle:"Estados de las tablas",          
                service:'genEstado',
                idName:'GEN_EST_ID',
                columns:[
                    // {
                    //     key:'GEN_EST_REG_ACTIVO',
                    //     label:'registro activo'
                    // },
                    {
                        value:'GEN_EST_NOMBRE',
                        text:'Nombre estado'
                    }
                ],
                // noColumns:['GEN_EST_ID_TABLA',],// son las columas que no se quieren mostrar
                noColumns:[],
                constraint :[
                    {
                    localReference:'GEN_EST_TAB_ID',//Gen_est_tab_id
                    reference:'GEN_TAB_ID',
                    attributeNameSelect:'GEN_TAB_ID_NOMBRE_REFERENCIA',
                    service:'genTablas',
                    text:'Tabla referencia',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
                //   {
                //     localReference:'GEN_EST_REG_ACTIVO',
                //     reference:null,
                //     attributeNameSelect:null,
                //     service:null,
                //     data:['0','1'],
                //     label:'Registro activo',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   }
                ],
            }
        },
    }
</script>