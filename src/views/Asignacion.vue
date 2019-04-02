<template> 
    <div>
      <div v-show="!dialogPdf && !dialogFile" style="position: absolute;width:96%;height:100%">
      <tableAutomatic   v-bind="{configComponent:configTable1}" /> 
      
            <!-- <div>
              <ul class="filepond--list">
               
                  <div class="filepond--file-wrapper">
                    <legend>
                      nombre de la imagen
                    </legend>
                    <div class="filepond--file"> 
                      <button class="filepond--file-action-button filepond--action-abort-item-load" type="button" style="transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) ;opacity:0;visibility:hidden;pointer-events:none;"></button>
                      <button class="filepond--file-action-button filepond--action-retry-item-load" style="transform:translate3d(0px, 0px, 0) scale3d(1, 1, 1) ;opacity:0;visibility:hidden;pointer-events:none;"><svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"></path></svg></button>
                    </div>
                    <div style="transform:translate3d(0px, 0px, 0) ;">
                      <span class="filepond--file-info-main" aria-hidden="true">BeFunky-photo.png</span>
                      <span class="filepond--file-info-sub">11.3 MB</span>
                    </div>
                    
                  </div>
         
              </ul>
            </div> -->
      </div>

   <v-flex shrink >
        <v-expand-x-transition>
            <div v-show="dialogPdf" style="white-space: nowrap">
                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialogPdf = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>PDF de comprobante de asignación</v-toolbar-title>
                          
                  </v-toolbar>
                  <div style="height: 700px">                   
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

          <!-- <div id="app">
 
             
            </div>  -->
      <v-flex shrink >
        <v-expand-x-transition>
            <div v-show="dialogFile" style="white-space: nowrap">
                <v-card >
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialogFile = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Imágen comprobante de asignación</v-toolbar-title>
                          
                  </v-toolbar>
                  <div style="height: 100%" v-if="dialogFile">               
                    <file-pond
                        
                       class="px-4 py-4"
                        name="file"                      
                        label-idle="Arrastra tus archivos aquí..."
                        allow-multiple="true"
                        ref="pond"
                       
                      
                        image-crop-aspect-ratio="1"
                        :server="server"
                        v-bind:files="myFiles"
                        v-on:init="handleFilePondInit"/>   

                        <imagesComponent v-bind="{configComponent:configImagesComponent}" :key="componentKey"/>                    
                  </div>
                  
                </v-card>
            </div>
          </v-expand-x-transition>
        </v-flex>  



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
              Cargando...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>


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
import vueFilePond from 'vue-filepond';
 
// Import FilePond styles
import '../assets/css/filepond.min.css';
 
// Import FilePond plugins
// Please note that you need to install these plugins separately
 
// Import image preview plugin styles
import '../assets/css/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 
// Create component
const FilePond = vueFilePond(FilePondPluginImagePreview);

  import tableAutomatic from '@/components/tableAutomatic.vue'
  import config from '@/config';
  import inputSelectEditable from '@/components/inputSelectEditable.vue'
  import imagesComponent from '@/components/imagesComponent.vue'
  import selectComponent from '@/components/select.vue'
  // import PDFUploader from '@/components/PDFUploader.vue'
export default {
        components:{
            tableAutomatic,
            imagesComponent
        },
        methods: {
          onDocumentErrored(e) {
              console.log({e});
              
              // this.documentError = e.text;
            },                  
          buttonGetPdf:function(item){
            // alert(JSON.stringify(item));
            // let url = this.config.urlBase+'/reportsHardwareAllocation/?ID='+item.PST_TRN_ID
            this.urlFrame = this.config.urlBase+'/reportsHardwareAllocation/?ID='+item.PST_TRN_ID;
            this.dialogPdf=true;
            // window.open(,'_blank');
            // this.$http.get(this.config.urlBase+'/reportsTestPdfPipe/?ID='+item.PST_TRN_ID).then(resp=>{
            //   console.log({resp}); 
            //   let blob = new Blob([resp.data], { type: 'application/pdf' }),
            //   url = window.URL.createObjectURL(blob)

            //   window.open(url) 
            // }).catch(error=>{
            //   console.log({error});
              
            //   // this.showModalMessaje =true;
            //   // this.mensssajeModal = error.response.data.error;
            //   // this.adding=true; 
            // });
          },
          buttonUploadFile:async function (item){
            console.log('upload file');
            //  bus.$emit('dialog', true) // emit the event to the bus
            // console.log({processUrl:this.server.process.url});
            // save files
             this.server.process.url = `/genArchivos/saveFile/${this.config.idTablaTransaccion}/${item.PST_TRN_ID}`

              // delete files
             this.server.revert.url = `/genArchivos/deleteFile/${this.config.idTablaTransaccion}/${item.PST_TRN_ID}`
            //  console.log({processUrl:this.server.process.url});
             let urlImages = `${config.urlBase}/genArchivos/getFile/${this.config.idTablaTransaccion}/${item.PST_TRN_ID}`;
            //  console.log({urlImages});             
             this.configImagesComponent = await this.$http.get(urlImages).catch(error=>{
                      console.log({error});      
                      //:TODO: poner acá un mensaje de aviso de eror   
                    });
              // console.log({configImagesComponent:this.configImagesComponent});
             this.configImagesComponent.buttonItemIcons=[
                      {
                        // icon:'insert_drive_file',
                        icon:'delete',
                        function:this.deleteFile
                      },
                      // {
                      //   icon:'attach_file',
                      //   function:this.buttonUploadFile
                      // }
                    ],
             this.dialogFile=true;
            
            // let formData = new FormData();
            //  formData.append('file', this.file);
          },
           hideHeader: function() {

            this.load_count++;

            if(this.load_count >= 2){

              this.display_header = false;

            }
          },
          deleteFile :async function(item){
            console.log({item});

            let resp = await this.$http.delete(`${config.urlBase}/genArchivos/deleteFile/${item.GEN_ARC_ID}`).catch(error=>{
                      console.log({error});      
                      this.snackbarShow=true;
                      if(error.response){
                        this.snackbarMessage=error.response.data.error;
                      }else{
                        this.snackbarMessage=error;
                      }
                      //:TODO: poner acá un mensaje de aviso de eror    
                    });
            if(resp !== undefined){
              this.componentKey++;
              // this.dialogFile= false;
              // this.dialogFile=true;
              //:TODO: refrescar la pantalla de motrar imágenes cuando se borra una
            }
            console.log({resp});
            
          },
          handleFilePondInit: function() {
            console.log('FilePond has initialized');
            // this.$refs.pond.labelButtonRetryItemLoad ='retry load'
            //  this.$refs.pond.beforeAddFile = (this.loadedFiles)
            console.log('files pound', this.$refs.pond);
           
            // FilePond instance methods are available on `this.$refs.pond`
          }
        },
        watch: {
          dialogPdf(){
            if(this.dialogPdf === false){
              this.urlFrame = 'about:blank'
              }else{
                 this.display_header = true;
              }
            },
            // dialogFile(){
            // if(this.dialogFile){              
            //      this.display_header = true;
            //   }
            // },
          display_header(){
            console.log({display_header:this.display_header});            
          }
        },
        data() {
            return {
              componentKey:1,
              snackbarShow: false,
              snackbarMessage: 'Error',
              configImagesComponent:{},
              myFiles: [],
              // loadedFiles:'https://netmobius.freetls.fastly.net/images-hkt/2017-Phuket-Airport3.jpg',
              
              server:{
              url:config.urlBase,
              // url:'https://netmobius.freetls.fastly.net',
              process: {
                url: `/genArchivos/saveFile/${config.idTablaTransaccion}/algúnNúmero`,
                },
                revert:{
                  url: '/genArchivos/deleteFile',
                },
                restore:{
                  url: '/fileAllocation',
                },
                load:{
                  url:'/fileAllocation'
                }
                // file: {
                //     name: 'https://netmobius.freetls.fastly.net/images-hkt/2017-Phuket-Airport3.jpg',
                //     size: 1000000000,
                //     type: 'image/png'
                // }
                // load:function(){
                //   console.log('cargando imágenes');                  
                // }
                // load(uniqueFileId, load, error, progress, abort, headers){
                //     fetch('https://netmobius.freetls.fastly.net/images-hkt/2017-Phuket-Airport3.jpg')
                //     .then(res => res.blob())
                //     .then(load=>{
                //       console.log('carga finalizada');
                      
                //       return load;
                //     })
                //   }
                // {
                  // url: '/fileAllocation/123',
                  // url:'/images-hkt/2017-Phuket-Airport3.jpg'
                // },
                // fetch:{
                //   url:'/images-hkt/2017-Phuket-Airport3.jpg'
                // }
                //  fetch: {url:'https://netmobius.freetls.fastly.net/images-hkt/2017-Phuket-Airport3.jpg'}
              },
               loadIFrame:{},
               load_count:0,
               display_header:false,
                urlFrame:'',
                dialogPdf:false,
                dialogFile:false,
                config,
               
                configTable1:{                     
                tableTitle:"Asignación",          
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
                // this.configComponent.idReferenceFather] = this.configComponent.idFather;
                // idReferenceFather:'PST_TRN_TTR_ID',
                
                // idFather:'1',
                dataFather:{PST_TRN_TTR_ID:'1'},
                filterService:{
                    localIdName:'PST_TRN_TTR_ID',
                    fatherIdName:'PST_TRN_TTR_ID'
                  }, 
                constraint:[
                  {
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
                        // icon:'insert_drive_file',
                        icon:'print',
                        function:this.buttonGetPdf
                      },
                      {
                        icon:'attach_file',
                        function:this.buttonUploadFile
                      }
                    ],
                    // pagination:false,
                    // paginationRowsPerPage:-1,// numero de registros a mostrar
                    // paginationPage:1,//página en la que desea que aparezca
                    // expandText: 'texto ejemplo',
                    // expandComponent:tableAutomaticSelected,
                    // idReferenceComponent:'MAN_MDT_MAN_ID',
                    saveDataDefault:{
                      PST_TRN_TTR_ID:1
                    },
                    expand:true,
                    expandComponent:tableAutomatic,
                                    
                    configExpandComponent:{
                        // colorCardBorderExpand:'warning',
                        component:inputSelectEditable,
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
                                label:'Estado'
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
                                notEditable:true,                                
                                component:selectComponent,
                                label:'Equipo',
                                service:'pstElemento/consult/getInventoryToals',//TODO: pendiente de este 1  no debe ir
                                // filterService:{
                                //     localIdName:'EMPLOYEE_ID',
                                //     fatherIdName:'PST_TRN_EMP_ID'
                                //   },
                                localReference:'PST_TDE_ELE_ID',
                                attributeNameSelect:'NOMBRE_EQUIPO',// textName:'NOMBRE_EQUIPO',
                                reference:'EQUIPO_ID',// valueName:'EQUIPO_ID',
                                attributeSequenceTotal:'TOTAL_DISPONIBLES',
                                componentChild:selectComponent,

                                configComponentChild:{                                
                                  component:selectComponent, 
                                  label:'Cantidad',
                                  localReference:'PST_TDE_CANTIDAD',       
                                  // addCero:false
                                }
                            }
                        //     {
                        //     component:inputSelectEditable,
                        //     localReference:'PST_TDE_ELE_ID',//Gen_est_tab_id
                        //     reference:'PST_ELE_ID',
                        //     attributeNameSelect:'PST_ELE_NOMBRE_EQUIPO',
                        //     service:'pstElemento',
                        //     label:'Equipo',
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
                        
                   
                        // chekboxLocalReference:'MAN_MDT_REALIZADA',
                        // add:false,
                        // edit:false,
                        pagination:false,  
                        paginationRowsPerPage:-1,
                        expandOne:true,
                        expand:true,                     
                        expandComponent:tableAutomatic,                        
                        configExpandComponent:{                   
                        // idReferenceFather:'PST_DEQ_TDE_ID', 
                        filterService:{
                            localIdName:'PST_DEQ_TDE_ID',
                            fatherIdName:'PST_TDE_ID'
                          },  
                        tableTitle:"",          
                        service:'pstDetallesEquipo',
                        idName:'PST_DEQ_ID',
                        columns:[
                          {
                            key:'PST_DEQ_NUMERO_INVENTARIO',
                            label:'Número inventario'
                          },
                          {
                            key:'PST_DEQ_IP_EQUIPO',
                            label:'Ip equipo'
                          },
                          {
                            key:'PST_DEQ_LICENCIA_OFFICE',
                            label:'Licencia office'
                          },
                          {
                            key:'PST_DEQ_ID_ANYDESK',
                            label:'Id Anydesk'
                          },
                          {
                            key:'PST_DEQ_CLAVE_ANYDESK',
                            label:'Clave Anydesk'
                          },
                          {
                            key:'PST_DEQ_ID_TEAMVIWER',
                            label:'Id Teamviwer'
                          },
                          {
                            key:'PST_DEQ_CLAVE_TEAMVIWER',
                            label:'Clave Teamviwer'
                          },
                          {
                            key:'PST_DEQ_USUARIO_EQUIPO',
                            label:'Usuario equipo'
                          }
                        ],                          
                        constraint :[
                            {
                            component:inputSelectEditable,
                            localReference:'PST_DEQ_SOFTWARE_INVENTARIO',//Gen_est_tab_id
                            reference:null,
                            attributeNameSelect:null,
                            service:null,
                            label:'Software inventario',
                             data:[1,0],
                            // setPositionInTable:3,
                            type:'SELECT_EDITABLE',
                            nullable:'N'
                            }
                        ]
                      },
                      
                    }
                    
                },
            }
        },
    }
</script>

<style>
/* .filepond--root {
    height: 100%;
    width: 80%;
    
}

.filepond--panel-root{
  height: 100%;
}

.filepond--hopper{
  height: 100%;
}
.filepond--wrapper{
  height: 100%;
  align-content:center;
} */

.filepond--drop-label{
  height: 200px;
}
.filepond--panel{
  height: 200px;

}
</style>
