<template>
 
      <v-layout row wrap>
        <v-flex md12>
            <chartBar v-bind="{configComponent:configComponent1}" />
        </v-flex>
        <v-flex md6>
            <selectComponent v-bind="{configComponent:configSelectWithCharBar}" />            
        </v-flex>
        <v-flex md12>
            <h3>Asignaciones</h3>
            <inputSelectEditable v-bind="{configComponent:configSelectWithTable}" />  
            <!-- <chartBar v-bind="{configComponent:configComponent2}" /> -->
        </v-flex>
      </v-layout>
    

</template>

<script type="text/babel">
  
  import chartBar from '@/components/chartBar.vue'
  import selectComponent from '@/components/select.vue'
  import tableAutomatic from '@/components/tableAutomatic.vue'
  import inputSelectEditable from '@/components/inputSelectEditable.vue'
  export default { 
    components: {  
      chartBar,
      selectComponent,
      tableAutomatic,
      inputSelectEditable
    },  
    data: () => ({
      
      configComponent1:{
          title:'Movimiento de inventario',
          service:'pstElemento/consult/getInventoryToals',
          columns:[              
              {
                  key:'ASIGNACIONES',
                  label:'Asignaciones'
              },
              {
                  key:'DEVOLUCIONES',
                  label:'Devoluciones'
              },
              {
                  key:'TOTAL_INGRESADOS',
                  label:'Total ingresado'
              },
              {
                  key:'ASIGNACIONES_DEVUELTAS',
                  label:'Asignaciones devueltas'
              },
              {
                  key:'TOTAL_DISPONIBLES',
                  label:'Total disponibles'
              }
          ],
           xAxisColumn:{
                  key:'NOMBRE_EQUIPO',
                  label:'Equipo'
              },
         heigth:500,
         zoomZiseRows:3,
      },
       configSelectWithCharBar:{
        // {
            notEditable:true,                                
            component:selectComponent,                                
            // idFather:'PST_TRN_EMP_ID',//poner el resultado de este id al final del sevicio, este campo llega de la tabla padre
            // proponer si es viable enviar todos los campos de la tabla anterior para seleccionar el interesado en donde se requiera
            label:'Empleado',
            // service:'pstElemento/consult/getAssignedElements/?EMPLOYEE_ID=1',//TODO: pendiente de este 1  no debe ir
            // filterService:{
            //     localIdName:'EMPLOYEE_ID',
            //     fatherIdName:'PST_TRN_EMP_ID'
            //     },
            service:'genEmpleado',
            localReference:'GEN_EMP_ID',
            attributeNameSelect:'NOMBRE_EQUIPO',// textName:'NOMBRE_EQUIPO',
            reference:'EQUIPO_ID',// valueName:'EQUIPO_ID',
            attributeSequenceTotal:'TOTAL',
            // componentChild:selectComponent,
            // -----------------
            // label:'Empleado',
            // service:'genEmpleado',
            // attributeNameSelect:'GEN_EMP_NOMBRE1',
            // localReference:'PST_TRN_EMP_ID',
            // reference:'GEN_EMP_ID',
            // ---------------------
            configComponentChild:
            // {                                
            //     component:selectComponent, 
            //     label:'Cantidad',
            //     localReference:'PST_TDE_CANTIDAD',       
            //     // addCero:false
                {
                component:chartBar, 
                title:'Inventario de ',
                filterService:{
                    localIdName:'EMPLOYEE_ID',
                    fatherIdName:'GEN_EMP_ID'
                },
                //  filterService:{
                //     localIdName:'EMPLOYEE_ID',
                //     fatherIdName:'ASIGNACIONES'
                // },
                nameTitleFather:'NOMBRE_EQUIPO',
                service:'pstElemento/consult/getAssignedElements',
                columns:[              
                    {
                        key:'ASIGNACIONES',
                        label:'Asignaciones'
                    },
                    {
                        key:'DEVOLUCIONES',
                        label:'Devoluciones'
                    },
                    {
                        key:'TOTAL',
                        label:'Total'
                    }
                ],
                xAxisColumn:{
                        key:'NOMBRE_EQUIPO',
                        label:'Equipo'
                    },
                zoomZiseRows:6,
                heigth:432
                
            }
            // }
       },
        configSelectWithTable:{
        // {
            notEditable:true,                                
                                        
            // idFather:'PST_TRN_EMP_ID',//poner el resultado de este id al final del sevicio, este campo llega de la tabla padre
            // proponer si es viable enviar todos los campos de la tabla anterior para seleccionar el interesado en donde se requiera
            label:'Empleado',
            // service:'pstElemento/consult/getAssignedElements/?EMPLOYEE_ID=1',//TODO: pendiente de este 1  no debe ir
            service:'genEmpleado',
            // filterService:{
            //     localIdName:'EMPLOYEE_ID',
            //     fatherIdName:'PST_TRN_EMP_ID'
            //     },
            localReference:'GEN_EMP_ID',
            attributeNameSelect:'GEN_EMP_NOMBRE1',// textName:'NOMBRE_EQUIPO',
            reference:'GEN_EMP_ID',// valueName:'EQUIPO_ID',
            // attributeSequenceTotal:'TOTAL',
            // componentChild:selectComponent,
            // -----------------
            // label:'Empleado',
            // service:'genEmpleado',
            // attributeNameSelect:'GEN_EMP_NOMBRE1',
            // localReference:'PST_TRN_EMP_ID',
            // reference:'GEN_EMP_ID',
            // ---------------------
            configComponentChild:{
                component:tableAutomatic,    
                // colorCardBorderExpand:'warning',
                // idReferenceFather:'PST_TDE_TRA_ID',  
                filterService:{
                    localIdName:'EMPLOYEE_ID',
                    fatherIdName:'GEN_EMP_ID'
                    // localIdName:'PST_TDE_TRA_ID',
                    // fatherIdName:'PST_TRN_ID'
                },
                tableTitle:"",  
                add:false,
                edit:false,        
                service:'pstTransaccionDetalle/consult/withAssignmentEmployee',
                idName:'PST_TDE_ID',
                columns:[
                    {
                        key:'PST_TDE_OBSERVACIONES',
                        label:'Observaciones'
                    },
                    // {
                    //     key:'PST_TDE_CANTIDAD',
                    //     label:'cantidad'
                    // },
                    // {
                    //     key:'MAN_MDT_ABSERVACIONES',
                    //     label:'observaciones'
                    // }
                    
                ],
                
                noColumns:[],
                constraint :[ 
                    {
                    //   component:selectEditable,
                      localReference:'PST_TDE_ELE_ID',
                      reference:'PST_ELE_ID',
                      attributeNameSelect:'PST_ELE_NOMBRE_EQUIPO',
                      service:'pstElemento', // TODO: crear una url que llame unicamente los equipos que el usuario tenga en prestamo
                      label:'Equipo',
                      // setPositionInTable:3,
                      type:'SELECT_EDITABLE',
                      nullable:'N'
                    },
                    //---------------------------
                    // {
                    //     notEditable:true,                                
                    //     component:selectComponent,                                
                    //     // idFather:'PST_TRN_EMP_ID',//poner el resultado de este id al final del sevicio, este campo llega de la tabla padre
                    //     // proponer si es viable enviar todos los campos de la tabla anterior para seleccionar el interesado en donde se requiera
                    //     label:'Equipo',
                    //     service:'pstElemento/consult/getAssignedElements',//TODO: pendiente de este 1  no debe ir
                    //     filterService:{
                    //         localIdName:'EMPLOYEE_ID',
                    //         fatherIdName:'PST_TRN_EMP_ID'
                    //         },
                    //     localReference:'PST_TDE_ELE_ID',
                    //     attributeNameSelect:'NOMBRE_EQUIPO',// textName:'NOMBRE_EQUIPO',
                    //     reference:'EQUIPO_ID',// valueName:'EQUIPO_ID',
                    //     attributeSequenceTotal:'TOTAL',
                    //     componentChild:selectComponent,

                    //     configComponentChild:{                                
                    //         component:selectComponent, 
                    //         label:'Cantidad',
                    //         localReference:'PST_TDE_CANTIDAD',       
                    //         // addCero:false
                    //     }
                    // }
                    //----------------
                    // {
                    //   // localReference:'PST_TDE_CANTIDAD',
                    //   attributeNameSelect:'NOMBRE_EQUIPO',
                    //   attributeNameId:"EQUIPO_ID",
                    //   attribuMaxQuantity:'TOTAL',    
                    //   attribuReferenceQuantity:'PST_TDE_CANTIDAD',               
                    //   reference,
                    //   service:'/pstElemento/consult/getAssignedElements/1', // TODO: crear una url que llame unicamente los equipos que el usuario tenga en prestamo
                    //   label:'Cantidad',
                    //   // setPositionInTable:3,
                    //   type:'SELECT_QUANTITY',
                    //   nullable:'N'
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
                
            
                // chekboxLocalReference:'MAN_MDT_REALIZADA',
                // add:false,
                // edit:false,
                pagination:false,  
                paginationRowsPerPage:-1,
                //   expandOne:true,
                //   expand:true,                     
                //   expandComponent:tableAutomatic,                        
                //   configExpandComponent:{                   
                //   idReferenceFather:'PST_DEQ_TDE_ID',  
                //   tableTitle:"",          
                //   service:'pstDetallesEquipo',
                //   idName:'PST_DEQ_ID',
                //   columns:[
                //     {
                //       key:'PST_DEQ_NUMERO_INVENTARIO',
                //       label:'Número inventario'
                //     },
                //     {
                //       key:'PST_DEQ_IP_EQUIPO',
                //       label:'Ip equipo'
                //     },
                //     {
                //       key:'PST_DEQ_LICENCIA_OFFICE',
                //       label:'Licencia office'
                //     },
                //     {
                //       key:'PST_DEQ_ID_ANYDESK',
                //       label:'Id Anydesk'
                //     },
                //     {
                //       key:'PST_DEQ_CLAVE_ANYDESK',
                //       label:'Clave Anydesk'
                //     },
                //     {
                //       key:'PST_DEQ_ID_TEAMVIWER',
                //       label:'Id Teamviwer'
                //     },
                //     {
                //       key:'PST_DEQ_CLAVE_TEAMVIWER',
                //       label:'Clave Teamviwer'
                //     },
                //     {
                //       key:'PST_DEQ_USUARIO_EQUIPO',
                //       label:'Usuario equipo'
                //     }
                //   ],                          
                //   constraint :[
                //       {
                //       localReference:'PST_DEQ_SOFTWARE_INVENTARIO',//Gen_est_tab_id
                //       reference:null,
                //       attributeNameSelect:null,
                //       service:null,
                //       label:'Software inventario',
                //        data:[1,0],
                //       // setPositionInTable:3,
                //       type:'SELECT_EDITABLE',
                //       nullable:'N'
                //       }
                //   ]
                // },
                
                    
            }
            
       }
    //   configComponent2:{

    //       title:'Inventario del empleado 1',
    //       service:'pstElemento/consult/getAssignedElements/?EMPLOYEE_ID=1',
    //       columns:[              
    //           {
    //               key:'ASIGNACIONES',
    //               label:'Asignaciones'
    //           },
    //           {
    //               key:'DEVOLUCIONES',
    //               label:'Devoluciones'
    //           },
    //           {
    //               key:'TOTAL',
    //               label:'Total'
    //           }
    //       ],
    //        xAxisColumn:{
    //               key:'NOMBRE_EQUIPO',
    //               label:'Equipo'
    //           },
    //      zoomZiseRows:2,
    //      heigth:500
         
    //   }
    }),
  };
</script>
