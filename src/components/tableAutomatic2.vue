<template>

<v-container class="mt-5">
 
<!-- <div class="card card-cascade narrower my-5">  -->
 <!-- <div class="blue-gradient z-depth-2 py-4 mx-4 mb-3 rounded">
    <h4 class="text-center white-text"><strong>{{tableTitle}}
                <span v-if="!completeProcess" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span class="sr-only">Loading...</span>
            </strong></h4>
 </div> -->
    <!-- <div class="container mt-3">
       <b-row>
          <b-col>
            <v-btn color="primary" style="width: 15rem;" @click="showAdd()">Agregar registro</v-btn>
            <span class="spinner-border text-primary" style="width: 2rem; height: 2rem;" role="status">
              <span class="sr-only">Loading...</span>
            </span>
          </b-col>
        <b-col md="6" class="my-1">    
              <mdb-input class="mt-0 mb-3" v-model="filter"  placeholder="Buscar" ariaDescribedBy="button-addon2">
                  <mdb-btn  :disabled="!filter" @click="filter = ''" color="primary" size="md" group slot="append" id="button-addon2">Borrar</mdb-btn>
              </mdb-input>            
        </b-col>
       </b-row>
    </div> -->
 <!-- <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>  -->
      <div class="px-4">
         <v-card>
            <v-card-title>
              <v-btn color="primary" style="width: 15rem;" @click="showAdd()">Agregar registro</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="fields"
              :items="items"
              :loading="!completeProcess"
              :search="search"
              :pagination.sync="pagination"              
            >
              <template slot="items" slot-scope="props">
                 <tr @click="dobleClick($event,props.item,props.index)">
                  <td class="justify-center layout px-0">
                  <v-icon
                      small
                      class="mr-2"
                      @click="showUpdate(props.item,props.index)"
                  >
                      edit
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(props.item)"
                  >
                      delete
                  </v-icon>
                  </td>
                  <td class="text-xs-left"  v-for="(item,key) in props.item"  :key="key">                    
                    {{item}}
                  </td>      
              </tr>
              </template>
               <template slot="pageText" slot-scope="props">
                  Página {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Su busqueda "{{ search }}" no arroja resultados.
              </v-alert>
            </v-data-table>
          </v-card>
          <!-- <div class="table-wrapper">
              
               <v-data-table                          
                :headers="fields"
                :items="items"
                :loading="!completeProcess"
                :search="search"
              >
               <template slot="items" slot-scope="props">
                  <td class="justify-center layout px-0">
                  <v-icon
                      small
                      class="mr-2"
                      @click="editItem(props.item)"
                  >
                      edit
                  </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(props.item)"
                  >
                      delete
                  </v-icon>
                  </td>
                  <td class="text-xs-left"  v-for="(item,key) in props.item"  :key="key">                    
                    {{item}}
                  </td>
                </template>
            </v-data-table>
          </div> -->

      <!-- </div> -->

  </div>

 <v-dialog v-model="adding" @close="adding = false"  max-width="550px">
     <v-card v-if="adding">
    <v-card-title class="headline grey lighten-2" primary-title>
      <!-- <mdb-modal-title tag="h4" bold class="w-100">Inssertar</mdb-modal-title> -->
      Insertar
    </v-card-title>
    <v-card-text class="grey-text"  >
        <v-container>
        <component v-for="(item, key) in dataAdd" :key="key " 
          class="mt-3"
            v-bind="{
            label:fieldsJson[key].text,
            value:dataAdd[key],
            referenceId:dataAdd[key],
            type:fieldsJson[key].type,
            options: externalItems[fieldsJson[key].text],
            constraints: constraint.filter(con => con.localReference === key)[0]
            }"       
            v-on:input="dataAddOnchange($event,key)"
            v-bind:is="selectInputElement(fieldsJson[key].type)">        
            </component>
        </v-container>
    </v-card-text>
        <v-card-actions center>
            <v-spacer></v-spacer>
            <v-btn @click="save(dataAdd)" color="primary">Guardar</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>


<v-dialog v-model="editing"  max-width="550px">
     <v-card v-if="editing">
    <v-card-title class="headline grey lighten-2" primary-title>
      <!-- <mdb-modal-title tag="h4" bold class="w-100">Inssertar</mdb-modal-title> -->
      Actualizar
    </v-card-title>
    <v-card-text class="grey-text"  >
        <v-container>
            <component v-for="(item, key) in dataUpdate" :key="key"  @input="updateChangeInput"
            v-bind="{
              label:fieldsJson[key].text,
              value:dataUpdate[key],
              type:fieldsJson[key].type,
              options: externalItems[fieldsJson[key].text],
              referenceId:selectReferenceId(key),//buscar la posición de el registro y envialo
              constraints: constraint.filter(con => con.localReference === key)[0]
              }"       
            v-on:input="dataSaveOnchange($event,key)"
            v-bind:is="selectInputElement(fieldsJson[key].type)">        
          </component>
        </v-container>
    </v-card-text>
        <v-card-actions center>
            <v-spacer></v-spacer>
              <v-btn @click="updated(dataUpdate)" color="primary" :class="animate">Actualizar</v-btn>
              <v-btn @click="deleted()" color="warning">Eliminar</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- <mdb-modal v-if="false" @close="editing = false">
    <mdb-modal-header class="text-center">
      <mdb-modal-title tag="h4" bold class="w-100">Actualizar</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body class="mx-3 grey-text">

    <component v-for="(item, key) in dataUpdate" :key="key"  @input="updateChangeInput"
        v-bind="{
          label:fieldsJson[key].label,
          value:dataUpdate[key],
          type:fieldsJson[key].type,
          options: externalItems[fieldsJson[key].label],
          referenceId:selectReferenceId(key),//buscar la posición de el registro y envialo
          constraints: constraint.filter(con => con.localReference === key)[0]
          }"       
        v-on:input="dataSaveOnchange($event,key)"
        v-bind:is="selectInputElement(fieldsJson[key].type)">        
      </component>
    </mdb-modal-body>
    <mdb-modal-footer center>
      <v-btn @click="updated(dataUpdate)" color="primary" :class="animate">Actualizar</v-btn>
      <v-btn @click="deleted()" color="danger">Eliminar</v-btn>
    </mdb-modal-footer>
  </mdb-modal> -->
 
      <mdb-modal  removeBackdrop side position="bottom-right" size="fluid" v-if="showModalMessaje" @close="showModalMessaje = false">
        <mdb-modal-header>
          <mdb-modal-title>Mensaje</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>{{mensssajeModal}}</mdb-modal-body>
        <mdb-modal-footer>
          <v-btn color="secondary" @click.native="showModalMessaje = false">ok</v-btn>         
        </mdb-modal-footer>
      </mdb-modal>
    
  
</v-container>

</template>
<script>
//   import {
//         mdbBtn,mdbRow,mdbContainer,mdbIcon,mdbInput,
//            mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter,mdbModalTitle,
//            mdbCard,mdbCardBody,mdbCardTitle,mdbCardText,mdbCardUp,mdbView,ViewWrapper} from 'mdbvue';

  import config from '@/config';
  import InputText from '@/components/InputText.vue'
  import inputSelectEditable from '@/components/inputSelectEditable.vue'
//   import datePicker from '@/components/datePicker.vue'


export default {
     components: {   
        
        // datePicker,
        InputText,
        inputSelectEditable,
        // mdbBtn,
        // mdbInput,
        // mdbModalTitle,

        // mdbRow,
        // mdbIcon,
        // mdbContainer,
        // mdbModal,
        // mdbModalHeader,
        // mdbModalBody,
        // mdbModalFooter,
        // mdbCard,mdbCardBody,mdbCardTitle,mdbCardText,mdbCardUp,mdbView,ViewWrapper
 
    }, 
    computed :{
     activeUsers: function () {
        return this.items.filter(function (user) {
        return user.isActive
        })
    },
    sortOptions () {
        // Create an options list from our fields
        return this.fields
            .filter(f => f.sortable)
            .map(f => { return { text: f.label, value: f.key } })
        }
    },
    mounted (){
        this.getData().then(); //pasar esta función a computed
    },
    watch: {
      completeProcess : function (value){
        // console.log({completeProcess:value});
        if(this.showModalMessaje){
          this.showModalMessaje = false;
          this.showAdd();
        }
      }
    },
    methods: {
    
    updateChangeInput(changeInput){
       
      this.animateIndexAux++;
        // console.log({changeInput});
        // console.log('this.animateIndexAux: '+this.animateIndexAux);
        // console.log('this.countComponents '+ this.countComponents);
        
    //   if(this.animateIndexAux > this.countComponents){
    //     this.animate ='animated bounce infinite';           
    //   }
        if(this.animateIndexAux > (this.fields.length -1 )){
            this.animate ='animated bounce infinite';           
        }
    },
    selectTypeField(type){
      if(type === 'VARCHAR2'){      
        return 'text'
      }else if(type  === 'NUMBER'){
        return 'number'
      }else if(type  === 'DATE'){
        return 'datetime-local'
      
      }
    },
    dobleClick(event,item,index){   
        this.clickClicks++ 
          if(this.clickClicks === 1) {
            this.indexTableUbdateSelected = ((this.pagination.page/*this.currentPage*/-1)*this.pagination.rowsPerPage /*this.perPage*/)+index;
            console.log( {indexTableUbdateSelected:this.indexTableUbdateSelected});
           
            var self = this
            this.clickTimer = setTimeout(function() {
              self.clickResult.push(event.type);
              self.clickClicks = 0
            }, this.clickDelay);
          } else{
              if(this.indexTableUbdateSelected === ((this.pagination.page-1)*this.pagination.rowsPerPage)+index){
                   clearTimeout(this.clickTimer);  
                    this.clickResult.push('dblclick');
                    this.clickClicks = 0;
                    console.log({item});
                        console.log({index});
                        console.log({event});
                        this.showUpdate(item, index)
               }else{
                   this.clickClicks =1;
               }
            
          }         
         
      
        
        
    },
    selectTypeUpdate(key,value){
      console.log({key});
      
      console.log('fieldsJson '+this.fieldsJson[key]);
      
      // buscar que tipo de dat es y si el dato es necesario modificarlo           
      const result = this.fields.filter(field => field.key === key);
      console.log({result});
      
      if(result[0]!==undefined){        
        if(result[0].type === 'VARCHAR2'){
    
          if(value === null){
            console.log({key}); 
              this.data[key] = "";
            }
          return 'text'
        }else if(result[0].type  === 'NUMBER'){
          if(value === null){
            console.log({key}); 
              this.data[key] = "";
            }
          return 'number'
        }else if(result[0].type  === 'DATE'){
          return 'datetime-local'
        }else if(result[0].type  === 'SELECT'){      
          return 'text'         
        }
      }
      
    },
    // selectTypeAdd(key,type){
      
    //   if(type!==undefined){ 
    //     if(type === 'VARCHAR2'){    
    //       if(this.dataAdd[key] === null){
    //           this.dataAdd[key] = "";
    //         }
    //       return 'text'
    //     }else if(type  === 'NUMBER'){
    //       if(this.dataAdd[key] === null){
    //           this.dataAdd[key] = "";
    //         }
    //       return 'number'
    //     }else if(type  === 'DATE'){
    //       this.dataAdd[key] = new Date().toISOString().substring(0,19);          
    //       return 'datetime-local'         
    //     }else if(type  === 'CHAR'){
    //       if(this.dataAdd[key] === null){
    //           this.dataAdd[key] = "";
    //         }
    //       return 'text';
    //     }
    //   }else{
    //     return 'text'
    //   }
      
    // },
    save(data){  
      console.log({data});       
      // los datos de dataAddAdicional son campos de llaves foraneas
      // si la tabla no tiene llaves foraneas entoces no se añaden más campos
      // this.dataAddAdicional se llena automática mente con el método dataAddOnchange()
      // las configuraciones de las llaves foraneas se ponen en la variable constraint
      let insetData = Object.assign({}, insetData , data ); 
      this.adding=false; 
       for (const key in this.dataAddAdicional) {
          insetData[key] = this.dataAddAdicional[key];
       }       
      for (const key in insetData) {
          if(insetData[key]===""){
            insetData[key] = null;
          }
      }      
       
      //  this.adding=true; 
      
       console.log({insetData}); 
      this.$http.post(this.config.urlBase+'/'+this.service,insetData).then(resp=>{
        console.log({resp});
        this.getData();
      }).catch(error=>{
        this.showModalMessaje =true;
        this.mensssajeModal = error;
        this.adding=true; 
      });
    },
    updated(data) {
       console.log({data});
       this.editing=false;      
        for (const key in data){
          if(data[key] === ""){
            data[key] = null;
          }
        }     
      let insetData = Object.assign({}, insetData , data ); 
      this.adding=false; 
       for (const key in this.dataAddAdicional) {
          insetData[key] = this.dataAddAdicional[key];
       }       
      for (const key in insetData) {
          if(insetData[key]===""){
            insetData[key] = null;
          }
      }

      insetData[this.idName] = this.items[this.indexTableUbdateSelected][this.idName];
      console.log({insetData});     
      this.$http.put(this.config.urlBase+'/'+this.service,insetData)
      .then(resp=>{
        console.log({resp});
        this.getData();
      }).catch(error=>{
        this.showModalMessaje =true;
        this.mensssajeModal = error;
        this.editing=true; 
      });
    },
    deleted(){
      let id = this.items[this.indexTableUbdateSelected][this.idName]
    console.log({id});     
          this.$http.delete(this.config.urlBase+'/'+this.service+'/'+id).then(resp=>{
            console.log({resp});
            this.getData();
            this.editing=false;
          },error=>{     
            this.showModalMessaje =true;
            this.mensssajeModal = error;
            this.editing=true;
          });
    },
    getPromise(service){
      return new Promise((resolve,reject)=>{
        resolve(this.$http.get(this.config.urlBase+'/'+service));
      });
    },
    getPromisesConstraint(constraint){
      let promises = [];
      for (let k = 0; k < constraint.length; k++){
        this.getPromise(constraint[k].service);
       
      }
      return promises;
    },
  getData: async function(){    
      console.log({config:this.config});
      console.log({service:this.service});

        let resp = await this.$http.get(this.config.urlBase+'/'+this.service).catch(error=>{
          console.log({error});
          
          this.completeProcess=true;
          this.showModalMessaje =true;
          this.mensssajeModal = `error: no se tiene acceso al servidor`;

        });
        console.log({resp});
          let dat = {};
          this.items = resp.data.rows;
          
          // let constraint = 
          // {
          //   MXE_CODIGO_EQUIPO:{
          //         reference:'EQU_CODIGO',
          //         attributeNameSelect:'EQU_NOMBRE',
          //         service:'equipo',
          //         label:'Equipo',
          //         setPositionInTable:3,
          //         type:'SELECT_EDITABLE'
          //   }
          //   };
         

          this.totalRows = resp.data.count;

          this.fields = resp.data.columns;
      
          
        //   console.log({fields:this.fields});
          
         this.selectCorrectColumns(); // poner await si algo sale mal
       
         this.selectCorrectConstraint(); // poner await si algo sale mal
           
        // this.fields = this.fields.filter(field => field.key !== this.idName);
         
          this.fields.unshift({ value: 'editar', text: 'Editar'});

          await this.setfieldsJson(this.fields); // poner await si algo sale mal

          this.getNameOfForeinKey(this.constraint); // poner await si algo sale mal
          console.log({fieldsJson:this.fieldsJson});

            console.log({fields:this.fields});
          console.log(this.items);
          return true;
    },
    selectCorrectConstraint:async function(){
        for (let i = 0; i < this.constraint.length; i++) {    
            if(this.constraint[i].service){            
              let index = this.fields.findIndex(fiel=>fiel.value === this.constraint[i].localReference);
              this.fields[index].text = this.constraint[i].text;             
              this.fields[index].type = this.constraint[i].type;             
            }

            else{ // unir el campo del contrain con el campo correcto en la tabla
              let index = this.fields.findIndex(fiel=>fiel.value === this.constraint[i].localReference);
              this.fields[index].text = this.constraint[i].text;
              this.fields[index].value = this.constraint[i].localReference;
              this.fields[index].type = this.constraint[i].type;
               }
          }
          return true;
    },
    selectCorrectColumns: async function(){
        let deletedKeys = [];
        if(this.columns.length > 0){
         for (let i = 0; i < this.fields.length; i++) { 
             
               let indexCol = this.columns.findIndex(col =>col.value === this.fields[i].value);
                if(indexCol === -1){                    
                    let indexCont =  this.constraint.findIndex(cons=>cons.localReference === this.fields[i].value);
                    if(indexCont === -1){
                        console.log('eliminar de la cabecera: '+this.fields[i].value);
                        deletedKeys.push(this.fields[i].value);                       
                    }
                }else{
                    this.fields[i].text = this.columns[indexCol].text;
                    this.addInputType(this.fields[i]);    
                }  
                this.fields[i].sortable= true;                
          }
            for (let k = 0; k < deletedKeys.length; k++) {
                this.fields = this.fields.filter(field => field.value !== deletedKeys[k]);                    
            } 
          }else{
               for (let i = 0; i < this.fields.length; i++) {  
                    
                    this.addInputType(this.fields[i]);   
                    this.fields[i].sortable= true; 
                }
          }
            // delete field no colums
                   
            for (let i = 0; i < this.noColumns.length; i++) {            
                this.fields = this.fields.filter(field => field.value !== this.noColumns[i]);  
                
            }
        return true;
    },
    // onFiltered (filteredItems) {
    //   // Trigger pagination to update the number of buttons/pages due to filtering
    //   this.totalRows = filteredItems.length
      
    //   this.currentPage = 1
    // },
    showAdd(){
      // console.log({externalItemsLength:this.externalItems.length});s
      // console.log({dataAdd:this.dataAdd});
      
      if(this.fields.length > 0 ){
        if(this.completeProcess){
        this.dataAddAdicional={};   
        for (let i = 0; i < this.fields.length; i++) {   
          //  console.log({fieldsi:this.fields[i]});
            if(this.fields[i].value !== 'editar'){
                if(this.fields[i].value === 'datetime-local'){
                  this.dataAdd[this.fields[i].value] = new Date();  
                }else{
                  this.dataAdd[this.fields[i].value] = '';   
                }                
            }
        }   
        this.adding = true;
        }else{
          this.showModalMessaje =true;
          this.mensssajeModal = `Un momento por favor ...`;
        }        
      }else{
        this.showModalMessaje =true;
        this.mensssajeModal = `error: no se tiene acceso al servidor`;
      }

     
    },
    showUpdate (item, index) {  
      
      this.animate = '';
      this.animateIndexAux=0;
      this.countComponents=0;
      
        // cuenta los componentes que se van a mostrar en la lista de edición
        for (let i = 0; i < this.fields.length; i++) {         
              if(this.fields[i].type === 'SELECT_EDITABLE'){
                  this.countComponents++;                
              }else if(this.fields[i].type === 'datetime-local'){
                  this.countComponents++;                 
              }               
        }
        console.log({countComponents:this.countComponents});
      //  this.indexTableUbdateSelected === ((this.pagination.page-1)*this.pagination.rowsPerPage)+index
      this.indexTableUbdateSelected = ((this.pagination.page-1)*this.pagination.rowsPerPage)+index;


      
      for (const key in this.fieldsJson) {
          if(key !== 'editar'){            
            if(item[key]!== null){
              this.dataUpdate[key] = item[key]+'';
            }else{
              this.dataUpdate[key]='';
            }
        
          }
      }

      
      this.editing= true;   
   
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    /**
     * recibe una estructura json que contiene la configuración de 
     * llaves foraneas de esta tabla
     * con esa estructura llama a un servicio definido en el bakend
     * y guarda esos doatos en la variable externalItems
     * en un json cuya clave es tiene el mismo nombre de el text
     * de donde se llamaron los datos externos
     * además crea un campo en la tabla mostrada y le añade un campo
     * con el text definido por las configuraciones, además inserta los 
     * datos del campo seleccionado en los datos externos,
     * además compara los las llaves foraneas y pone en su correcta  ubicación 
     * el nombre del campo deseado en la tabla mostrada.
     * ejemplo de una configuración:
     *    let constraint = [{
                  localReference:'MXE_CODIGO_EQUIPO' //atributo local del id foraneo
                  reference:'EQU_CODIGO',           //atributo del id de la tabla foranea
                  attributeNameSelect:'EQU_NOMBRE', //atributo de la tabbla foranea que queremos reemplazar
                  service:'equipo',                 //servicio al que queremos llamar ejemplo localhost:3000/nombreDelServicio
                  text:'Equipo',                   //nombre del text que le ponemos poner en la tabla
                  setPositionInTable:3,             //posición en donde queremos ponerlo en la tabla
                  type:'SELECT_EDITABLE'            //tipos disponibles 'SELECT_EDITABLE', 'SELECT','DATE_PIKER'
                  nullable:'N'                      //si el dato puede ser nulo entonce 'Y' si no es nulo entonce 'N'
            },{...}
            ];
     */
    getNameOfForeinKey:async function(constraint){ 
        //eliminar los items que no se van a usar
      for (let i = 0; i < this.items.length; i++) {
          for (const key in this.items[i]) {
              if(! this.fieldsJson[key]){
                  delete this.items[i][key];
              }            
          }
                
          this.referencesIds[i]={};
      }
    // este código sirve para la configuración de contraint por array
    for (let k = 0; k < constraint.length; k++) { 
       
        if(constraint[k].service){       
            let resp = await this.$http.get(this.config.urlBase+'/'+constraint[k].service);
            this.externalItems[constraint[k].text] = resp.data.rows;
   
          for (let i = 0; i < this.items.length; i++) {              
            // if(this.items[i][constraint[k].localReference]){
                for (let j = 0; j < resp.data.rows.length; j++) {
                    if(resp.data.rows[j][constraint[k].reference] === this.items[i][constraint[k].localReference]){              
                    
                        this.referencesIds[i][constraint[k].localReference] =  resp.data.rows[j][constraint[k].reference];
                        this.items[i][constraint[k].localReference] = resp.data.rows[j][constraint[k].attributeNameSelect];
                        break;
                    }
                }  
            // }
        }

      }else{
      
         if(constraint[k].data){
              this.externalItems[constraint[k].text] = constraint[k].data;
          }else{
            console.log(constraint[k].text+' no tiene la configuración data');
            
          }
      }
      }
    //// ---------------- hasta aqui------
    // este código es para la nueva configuración de la configuracion contrain por JSON
  
      // for (const keyConstrain in constraint) {    
      // let resp = await this.$http.get(this.config.urlBase+'/'+constraint[keyConstrain].service);
      //   console.log('service'+constraint[keyConstrain].service);     
      // for (let i = 0; i < this.items.length; i++) {
      //   for (let j = 0; j < resp.data.rows.length; j++) {
      //         if(resp.data.rows[j][constraint[keyConstrain].reference] === this.items[i][keyConstrain]){  
      //           // console.log('encontrado');                             
      //           this.items[i][constraint[keyConstrain].label] = resp.data.rows[j][constraint[keyConstrain].attributeNameSelect];
      //           break;
      //         }
      //       }           
      //   }
      // }
      this.completeProcess = true;
      
        console.log({fields:this.fields});      
        console.log('proceso de busqueda de contraints completo');
        
        return true;
        // resolve(true);
    // });
    
  },
  dataSaveOnchange(value,key){
    // busca si el dato que llega 
    // si en los label de los constraint tiene la misma llave que llega
    // quiere decir que el dato que llegó está referenciado con otra tabla
    // entonces busca en las configuraciones la llave localReference 
    // localReference hace referencia a el campo que contendría el id de la tabla referenciada,
    // en los parametros value llega un array con la siguiente estrctura value :{label,value}
    // en el campo value.value contiene la llave foranea de la tabla referenciada
   
    const isConstraint = this.constraint.filter(resp => resp.localReference === key)
    
    // si isConstraint.length > 0 quiere decir que el dato que llega hace referencia a una llave foranea
    // entonces los datos que llegan se insertan en la variable dataAddAdicional que serán insertados luego en la función save()
    if(isConstraint.length > 0){
      //  this.dataAdd[isConstraint[0].localReference] = value.value;
      this.dataAddAdicional[isConstraint[0].localReference] = value;
    }else{
    // si  (! isConstraint.length > 0 )  quiere decir que el dato que llega hace referenia a un campo
    // que no tiene llave foranea, por lo tanto se reemplaza el valor que llega con esa misma llave 
      this.dataUpdate[key]=value;
    }

  
  },
  dataAddOnchange(value,key){
    // busca si el dato que llega 
    // si en los label de los constraint tiene la misma llave que llega
    // quiere decir que el dato que llegó está referenciado con otra tabla
    // entonces busca en las configuraciones la llave localReference 
    // localReference hace referencia a el campo que contendría el id de la tabla referenciada,
    // en los parametros value llega un array con la siguiente estrctura value :{label,value}
    // en el campo value.value contiene la llave foranea de la tabla referenciada
   
    const isConstraint = this.constraint.filter(resp => resp.localReference === key);
  
    // si isConstraint.length > 0 quiere decir que el dato que llega hace referencia a una llave foranea
    // entonces los datos que llegan se insertan en la variable dataAddAdicional que serán insertados luego en la función save()
    if(isConstraint.length > 0){
      //  this.dataAdd[isConstraint[0].localReference] = value.value;
      this.dataAddAdicional[isConstraint[0].localReference] = value;
    }else{
    // si  (! isConstraint.length > 0 )  quiere decir que el dato que llega hace referenia a un campo
    // que no tiene llave foranea, por lo tanto se reemplaza el valor que llega con esa misma llave 
      this.dataAdd[key]=value;
    }
  
  },
  selectInputElement(type){
    
    console.log({type});   
   
    // let InputTextMdb = this.InputTextMdb;
    // console.log({type});
    
    if(type === 'text'){
        return this.InputText;
    }else if(type === 'SELECT_EDITABLE'){
        // this.countComponents++;
        return this.inputSelectEditable;
    }else if(type === 'datetime-local'){
        // this.countComponents++;
        return this.InputText
        // return this.datePicker;
    }else{
       return this.InputText;
    }
   
  },
  setfieldsJson(fields){
    for (let i = 0; i < fields.length; i++) {
      this.fieldsJson[fields[i].value] = {
        text:fields[i].text,
        nullable:fields[i].nullable,
        type:fields[i].type
      };
      
    }
  },
  addInputType(field){
    // for (let j = 0; j < this.columns.length; j++) { // reemplazar los campos que llegan de columns en las columnas
    //         const element = this.columns[j];              
    //     }    
    // console.log(this.columns);
    
   
    
    if(field.type === 'VARCHAR2'){
      field.type = 'text'
    }else if(field.type === 'NUMBER'){
      field.type = 'number'
    }else if(field.type   === 'DATE'){
      field.formatter=(value, key, item) => {
              if(value){
                return new Date(value).toLocaleString() 
              }else{
                return '';
              }
            }       
      field.type = 'datetime-local'         
    }else if(field.type   === 'CHAR'){
      field.type = 'text';
    }
  },
  selectReferenceId(key){

    if(this.referencesIds[this.indexTableUbdateSelected]){
      return this.referencesIds[this.indexTableUbdateSelected][key]
    }else{
      return null
    }  
  }

  },watch: {
    pagination:{
      handler () {
        console.log({pagination:this.pagination});        
      }
    }
  },
    props: {
        // mensssajeModal:"Error:",
        // showModalMessaje: false,
        columns:{},
        noColumns:Array,
        tableTitle:'',
        service:'',
        idName:'',
        // config,
        // dataAdd:{},
        // dataAddAdicional:{},
        // dataUpdate:{},
        // dataUpdateAdicional:{},
        // data:{},
        // login: false,
        // editing:false,
        // adding:false,

        // items:[],    
        // fields:[],
        // fieldsJson:{},// esta varaible contiene los mismos datos que en la variable fields con la diferencia de que es un json que tiene como clave la llave de la tabla para reducir el procesamiento

        // itemsEquipos:[],
        // fieldsEquipos:[],
        
        constraint :{},
        
        // currentPage: 1,
        // perPage: 6,
        // totalRows: 10,
        // pageOptions: [ 5, 10, 15 ],
        // sortBy: null,
        // sortDesc: false,
        // sortDirection: 'asc',
        // filter: null,
        // modalInfo: { title: '', content: '' },
        // referencesIds:[],
        // selected:'',
        // externalItems:{},
        // InputTextMdb,
        // inputSelectEditable,
        // datePicker,
        // animate:'',//animated bounce infinite
        // animateIndexAux:0,
        // countComponents:0,
        // indexTableUbdateSelected:0
  },    
  data(){
    return {
    transProps: {
        // Transition name
        name: 'flip-list-move'
    },
      mensssajeModal:"Error:",
      showModalMessaje: false,
    //   service:'',
    //   idName:'',
      config,
      dataAdd:{},
      dataAddAdicional:{},
      dataUpdate:{},
      dataUpdateAdicional:{},
      data:{},
      login: false,
      editing:false,
      adding:false,

      items:[],    
      fields:[],
      fieldsJson:{},// esta varaible contiene los mismos datos que en la variable fields con la diferencia de que es un json que tiene como clave la llave de la tabla para reducir el procesamiento

      itemsEquipos:[],
      fieldsEquipos:[],
      
    //   constraint :[],

      // currentPage: 1,
      // perPage: 6,
      // totalRows: 10,
      // pageOptions: [ 5, 10, 15 ],
      // sortBy: null,
      // sortDesc: false,
      // sortDirection: 'asc',
      // filter: null,
      modalInfo: { title: '', content: '' },
      referencesIds:[],
      selected:'',
      externalItems:{},
      InputText,
      inputSelectEditable,
    //   datePicker,
      animate:'',//animated bounce infinite
      animateIndexAux:0,
      countComponents:0,
      indexTableUbdateSelected:0,
      completeProcess:false,
      search: '',
      pagination: {},
      // variables de control de doble clic -->
        clickResult: [],
        clickDelay: 700,
        clickClicks: 0,
        clickTimer: null
    // <--variables de control de doble clic
    };
  }
}
</script>

<style>
.table .flip-list-move {
  transition: transform 1s;
}

/* .table-row-move {
  transition: all .5s;
}

.table-row-item {
  backface-visibility: hidden;
} */
</style>

