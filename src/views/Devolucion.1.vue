<template> 
    <tableAutomaticSelected v-bind="{configComponent:configTable1}" />
</template>

<script>
  import tableAutomaticSelected from '@/components/tableAutomaticSelected.vue'
    import HelloWorldVue from '../components/HelloWorld.vue';

export default {
        components:{
            tableAutomaticSelected
        },
        data() {
            return { 
                configTable1:{
                     
                tableTitle:"Ingreso Mantenimiento",          
                service:'manManten',
                idName:'MAN_MAN_ID',
                noColumns:[], // son las columas que no se quieren mostrar
                columns:[
                //  { 
                //   key:'MAN_MAN_FECHA_REG',
                //   label:'Fecha Registro'// esta fecha se inseta automáticamente la base de datos o se la envía el back
                //   },
                  {
                    key:'MAN_MAN_DESCRIPCION',
                    label:'Descipción'
                    
                  },
                  {
                    key:'MAN_MAN_OBSERVACIONES',
                    label:'Observaciones'
                    
                  },
                  {
                    key:'MAN_MAN_NUMERO',
                    label:'# Mantenimiento'
                    
                  },
                //   {
                //     key:'MAN_MAN_FRECUENCIA',
                //     label:'Frecunencia'
                    
                //   },
                //   {
                //     key:'MAN_MAN_HOROMETRO_1_INGRESO',
                //     label:'Horometro 1 Ingreso'
                    
                //   },
                //   {
                //     key:'MAN_MAN_HOROMETRO_2_INGRESO',
                //     label:'Horometro 2 Ingreso'
                    
                //   },
                //   {
                //     key:'MAN_MAN_KILOMETRAJE_INGRESO',
                //     label:'Kilometraje Ingreso'
                    
                //   },
                //   {
                //     key:'MAN_MAN_HOROMETRO_1_SALIDA',
                //     label:'Horometro 1 Salida'
                    
                //   },
                //   {
                //     key:'MAN_MAN_HOROMETRO_2_SALIDA',
                //     label:'Horometro 2 Salida'
                    
                //   },
                //   {
                //     key:'MAN_MAN_KILOMETRAJE_SALIDA',
                //     label:'Kilometraje Salida'
                    
                //   }
                ],
                constraint :[
                  {
                    localReference:'MAN_MAN_ID_ESTADO',
                    reference:'GEN_EST_ID',
                    attributeNameSelect:'GEN_EST_NOMBRE',
                    service:'manManten/consult/estadoActivo',
                    label:'Estado',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },//const service ="GEN_USU_USUARIO"; const tableId ="GEN_USU_ID";
                //   {
                //     localReference:'MAN_MAN_GEN_USU_ID_REG',
                //     reference:'GEN_USU_ID',
                //     attributeNameSelect:'GEN_USU_USUARIO',
                //     service:'genUsuarios',
                //     label:'Usuario',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   },
                //   {
                //     localReference:'MAN_MAN_GEN_CSA_ID',
                //     reference:'GEN_CSA_ID',
                //     attributeNameSelect:'GEN_CSA_NOMBRE',
                //     service:'genCasa',
                //     label:'Casa Compañía',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   },
                //   {
                //     localReference:'MAN_MAN_EQU_ID',
                //     reference:'MAN_EQU_ID',
                //     attributeNameSelect:'MAN_EQU_PLACA1',
                //     service:'equipo',
                //     label:'Equipo',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   },
                //   {
                //     localReference:'MAN_MAN_TIPO_MANTENIMIENTO',
                //     reference:null,
                //     attributeNameSelect:null,
                //     service:null,
                //     data:['Preventivo','Correctivo'],
                //     label:'Tipo mantenimiento',
                //     // setPositionInTable:3,
                //     type:'SELECT_EDITABLE',
                //     nullable:'N'
                //   },
                  // {
                  //   localReference:'MXE_TIPO_MANTENIMIENTO',
                  //   reference:null,
                  //   attributeNameSelect:null,
                  //   service:null,
                  //   data:['P','C'],
                  //   label:'Tipo de manteniemiento',
                  //   // setPositionInTable:3,
                  //   type:'SELECT_EDITABLE',
                  //   nullable:'N'
                  // }
                  ],
                    // withChekbox:true,
                    // chekboxLocalReference:'MAN_MDT_REALIZADA',
                    // add:false,
                    // edit:false,                   
                    expand:true,
                    // expandOne:true,
                    // pagination:false,
                    // paginationRowsPerPage:-1,// numero de registros a mostrar
                    // paginationPage:1,//página en la que desea que aparezca
                    // expandText: 'texto ejemplo',
                    expandComponent:tableAutomaticSelected,
                    idReferenceComponent:'MAN_MDT_MAN_ID',
                  
                    configExpandComponent:{
                        tableTitle:"",          
                        service:'manMantenDetalle',
                        idName:'MAN_MDT_ID',
                        columns:[
                            {
                                key:'MAN_MDT_REALIZADA',
                                label:'tarea realizada'
                            },
                            {
                                key:'MAN_MDT_FECHA_INICIAL',
                                label:'fecha inicial'
                            },
                            {
                                key:'MAN_MDT_ABSERVACIONES',
                                label:'observaciones'
                            }
                            
                        ],
                        // noColumns:['GEN_EST_ID_TABLA',],// son las columas que no se quieren mostrar
                        noColumns:[],
                        constraint :[
                        //     {
                        //     localReference:'GEN_CSE_COM_ID',//Gen_est_tab_id
                        //     reference:'GEN_COM_ID',
                        //     attributeNameSelect:'GEN_COM_NOMBRE',
                        //     service:'genCompania',
                        //     label:'Compañia',
                        //     // setPositionInTable:3,
                        //     type:'SELECT_EDITABLE',
                        //     nullable:'N'
                        // },
                        // {
                        //     localReference:'GEN_CSE_SUCURSAL',                            
                        //     reference:null,
                        //     attributeNameSelect:null,
                        //     service:null,
                        //     data:['0','1'],
                        //     label:'Sucursal',
                        //     // setPositionInTable:3,
                        //     type:'SELECT_EDITABLE',
                        //     nullable:'N'
                        // }
                        ],
                        
                   
                        chekboxLocalReference:'MAN_MDT_REALIZADA',
                        add:false,
                        edit:false,
                        pagination:false,
                        
                    }
                },
            }
        },
    }
</script>