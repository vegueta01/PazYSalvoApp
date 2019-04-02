<template> 
     <div>
   <tableAutomatic style="position: absolute;width:96%;height:100%"  v-show="!dialog" v-bind="{configComponent:configTable1}" />  
      <v-flex shrink >
        <v-expand-x-transition>
            <div v-show="dialog" style="white-space: nowrap">
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>PDF de comprobante de devolución</v-toolbar-title>
                          
                  </v-toolbar>
                  <div style="height: 700px">
                    <v-dialog
                      v-model="display_header"
                      hide-overlay
                      persistent
                      width="300"
                      origin="this"
                    >
                      <v-card
                        color="primary"
                        dark
                      >
                        <v-card-text>
                          Generando acta...
                          <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                          ></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                    <iframe v-on:load="hideHeader" :src="urlFrame" style="height: 100%;width:100%"></iframe>
                        <!-- <PDFViewer
                        v-bind="{url}"
                        @document-errored="onDocumentErrored"
                        >
                        </PDFViewer>  -->
                  </div>
                </v-card>
            </div>
          </v-expand-x-transition>
        </v-flex> 

            <v-snackbar
              v-model="snackbarShow"
              color="red"
              multi-line="multi-line"
              :timeout="6000"
            
            >
              {{ snackbarMessage }}
              <v-btn
                dark
                flat
                @click="snackbarShow = false"
              >
                Close
              </v-btn>
            </v-snackbar>   

    </div>
</template>

<script>
    import tableAutomatic from '@/components/tableAutomatic.vue'
    import config from '@/config';
    import selectComponent from '@/components/select.vue'
    import inputSelectEditable from '@/components/inputSelectEditable.vue'
export default {
        components:{
            tableAutomatic
        },
         methods: {                          
          buttonItemFunction:function(item){           
            this.urlFrame = this.config.urlBase+'/reportsHardwareReturn/?ID='+item.PST_TRN_ID;
            this.dialog=true;
        
          },
           hideHeader: function() {

            this.load_count++;

            if(this.load_count >= 2){

              this.display_header = false;

            }
          }
        },
        watch: {
          dialog(){
            if(this.dialog === false){
              this.urlFrame = 'about:blank'
              }else{
                 this.display_header = true;
              }
            },
          display_header(){
            console.log({display_header:this.display_header});            
          }
        },
        data() {
            return { 
               snackbarShow: false,
               snackbarMessage: 'Error',
               loadIFrame:{},
               load_count:0,
               display_header:false,
                urlFrame:'',
                dialog:false,
              
                config,

                configTable1:{                     
                tableTitle:"Devolución",          
                service:'pstTransaccion',
                idName:'PST_TRN_ID',
                noColumns:[], // son las columas que no se quieren mostrar
                columns:[
                    {
                      key:'PST_TRN_OBSERVACIONES',
                      label:'Observaciones'
                    },
                    {
                        key:'PST_TRA_FECHA',
                        label:'Fecha'
                    },
                //  { 
                //   key:'PST_TII_NOMBRE',
                //   label:'Nombre'
                //   }            
                ], 
                constraint:[
                  {
                    notEditable:true,
                    component:inputSelectEditable,
                    localReference:'PST_TRN_EMP_ID',
                    reference:'GEN_EMP_ID',
                    attributeNameSelect:'GEN_EMP_NOMBRE1',
                    service:'genEmpleado',
                    label:'Empleado',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
                  // {
                  //   localReference:'PST_TRN_TTR_ID',
                  //   reference:'PST_TTR_ID',
                  //   attributeNameSelect:'PST_TTR_NOMBRE',
                  //   service:'pstTipoTransaccion',
                  //   label:'Tipo asignación',
                  //   // setPositionInTable:3,
                  //   type:'SELECT_EDITABLE',
                  //   nullable:'N'
                  // } 

                  
                ],              
                    // withChekbox:true,
                    // chekboxLocalReference:'MAN_MDT_REALIZADA',
                    // add:false,
                    // edit:false,                   
                    
                    expandOne:true,
                    // buttonItemFunction:this.buttonItemFunction,
                    // buttonItemIcon:'insert_drive_file',
                     buttonItemIcons:[
                      {
                        icon:'insert_drive_file',
                        function:this.buttonItemFunction
                      }
                    ],
                    // pagination:false,
                    // paginationRowsPerPage:-1,// numero de registros a mostrar
                    // paginationPage:1,//página en la que desea que aparezca
                    // expandText: 'texto ejemplo',
                    // expandComponent:tableAutomaticSelected,
                    // idReferenceComponent:'MAN_MDT_MAN_ID',
                    saveDataDefault:{
                      PST_TRN_TTR_ID:2
                    },
                    // idReferenceFather:'PST_TRN_TTR_ID',
                    filterService:{
                      localIdName:'PST_TRN_TTR_ID',
                      fatherIdName:'PST_TRN_TTR_ID'
                    },  
                    // idFather:'2',
                    dataFather:{PST_TRN_TTR_ID:'2'},
                    expand:true,
                    expandComponent:tableAutomatic,
                                    
                    configExpandComponent:{
                        // colorCardBorderExpand:'warning',
                        // idReferenceFather:'PST_TDE_TRA_ID',  
                        filterService:{
                          localIdName:'PST_TDE_TRA_ID',
                          fatherIdName:'PST_TRN_ID'
                        },
                        tableTitle:"",          
                        service:'pstTransaccionDetalle',
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
                            // {
                            //   component:selectEditable,
                            //   localReference:'PST_TDE_ELE_ID',
                            //   reference:'PST_ELE_ID',
                            //   attributeNameSelect:'PST_ELE_NOMBRE_EQUIPO',
                            //   service:'pstElemento', // TODO: crear una url que llame unicamente los equipos que el usuario tenga en prestamo
                            //   label:'Equipo',
                            //   // setPositionInTable:3,
                            //   type:'SELECT_EDITABLE',
                            //   nullable:'N'
                            // },
                            {
                                notEditable:true,                                
                                component:inputSelectEditable,
                                
                                // idFather:'PST_TRN_EMP_ID',//poner el resultado de este id al final del sevicio, este campo llega de la tabla padre
                                // proponer si es viable enviar todos los campos de la tabla anterior para seleccionar el interesado en donde se requiera
                                label:'Equipo',
                                service:'pstElemento/consult/getAssignedElements',//TODO: pendiente de este 1  no debe ir
                                filterService:{
                                    localIdName:'EMPLOYEE_ID',
                                    fatherIdName:'PST_TRN_EMP_ID'
                                  },
                                localReference:'PST_TDE_ELE_ID',
                                attributeNameSelect:'NOMBRE_EQUIPO',// textName:'NOMBRE_EQUIPO',
                                reference:'EQUIPO_ID',// valueName:'EQUIPO_ID',
                                attributeSequenceTotal:'TOTAL',
                                // componentChild:selectComponent,

                                configComponentChild:{                                
                                  component:selectComponent, 
                                  label:'Cantidad',
                                  localReference:'PST_TDE_CANTIDAD',       
                                  // addCero:false
                                }
                            }
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
                    
                },
            }
        },
    }
</script>