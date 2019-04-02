<template>

<div >

      <div >
         <v-card >

            <v-card-title class="mb-4 mt-2"  v-if="configComponent.tableTitle !== ''">
             <v-toolbar center dark  class="elevation-12 rounded" color="primary darken-1">
                      <v-toolbar-title>{{configComponent.tableTitle}}</v-toolbar-title>
                    </v-toolbar>
            </v-card-title>
     
              <v-card-title  v-if="configComponent.add !== false">
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
              v-model="selected"
              :headers="fields"
              :items="indexedItems"
              :loading="!completeProcess"
              :search="search"
              :pagination.sync="pagination"
              :select-all="configComponent.withChekbox" 
              :expand="!configComponent.expandOne" 
              item-key="_id"  
              :hide-actions="!configComponent.pagination"
            >

            <template slot="headers" slot-scope="props" >
              <tr>
                <th v-if="configComponent.withChekbox">
                  <!-- poner que cuando se recojan todos salga el ícono diferente (listo)
                        poner un botón de aceptar en todas las tablas con checbox o actualizar automáticamente cuando se le de en el checkbox
                        poner en todas las tablas el indice (list)
                        crear otra tabla para solo la opción de chechbox sin editar (listo)
                        buscar la llave referencia del id, este dato ponerlo en las configuraciones
                         -->
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    primary
                    hide-details
                    @click.stop="toggleAll"
                  ></v-checkbox>
                </th>                
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>

              <template slot="expand">
                
                <v-card >
                  <v-card-text>
                    <div v-if="configComponent.expandText">
                      {{configComponent.expandText}}
                    </div>

                    <!-- <component :is="configComponent.expandComponent" v-bind="{configComponent:configComponent.configExpandComponent}" v-if="configComponent.expandComponent"></component> -->
                    <component :is="configComponent.expandComponent" v-bind="{configComponent:setConfigComponent}" v-if="configComponent.expandComponent"></component>
                  </v-card-text>         
                </v-card>
              </template>
              <template slot="items" slot-scope="props">
                
                 <tr :active="props.selected" @click="dobleClick($event,props.item,props.index,props)">

                    <td v-if="configComponent.withChekbox">
                    <v-checkbox
                      :input-value="props.selected"
                      primary
                      hide-details
                      @click.stop="props.selected= !props.selected"
                    ></v-checkbox>
                  </td>

                  <td class="justify-center layout px-0" v-if="configComponent.edit !== false">
                  <v-icon
                      small
                      class="mr-2"
                      @click.stop="showUpdate(props.item,props.index)"
                  >
                      edit
                  </v-icon>
                  <v-icon
                      small
                      @click.stop="deleted()"
                  >
                      delete
                  </v-icon>
                  </td>
                  <td class="text-xs-left"  v-for="(item,key) in props.item"  :key="key">                    
                    {{item}}
                  </td>      
              </tr>
              </template>
               <template slot="pageText" slot-scope="props" v-if="configComponent.pagination">
                  registro {{ props.pageStart }} a {{ props.pageStop }} de {{ props.itemsLength }}
                </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Su busqueda "{{ search }}" no arroja resultados.
              </v-alert>
            </v-data-table>
          </v-card>

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
            constraints: configComponent.constraint.filter(con => con.localReference === key)[0]
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
              constraints: configComponent.constraint.filter(con => con.localReference === key)[0]
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


 
      <v-dialog  removeBackdrop side position="bottom-right" size="fluid" v-model="showModalMessaje" @close="showModalMessaje = false">
        <v-card v-if="showModalMessaje">        

           <v-card-title class="headline grey lighten-2" primary-title>     
            Mensaje
          </v-card-title>

          <v-card-text class="grey-text"  >
          <v-container>
              {{mensssajeModal}}
          </v-container>
      </v-card-text>
          <v-card-actions center>
              <v-spacer></v-spacer>
                <v-btn @click.native="showModalMessaje = false" color="primary">ok</v-btn>               
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog  removeBackdrop side position="bottom-right" size="fluid" v-model="showModalMessajeDelete" @close="showModalMessajeDelete = false">
        <v-card v-if="showModalMessajeDelete">        
          <!-- <mdb-modal-header>
            <mdb-modal-title>Mensaje</mdb-modal-title>
          </mdb-modal-header> -->
           <v-card-title class="headline warning lighten-2" primary-title>     
            ¡Atención!
          </v-card-title>
          <v-card-text class="grey-text"  >
          <v-container>
              {{mensssajeModal}}
          </v-container>
      </v-card-text>
          <v-card-actions center>
              <v-spacer></v-spacer>
                <v-btn @click.native="deleteConfirm()" color="error">Borrar</v-btn>   
                <v-btn @click.native="showModalMessajeDelete = false" color="primary">cancelar</v-btn>              
          </v-card-actions>
        </v-card>
      </v-dialog>
</div>

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
     indexedItems () {
      return this.items.map((item, index) => ({
        _id: index,
        ...item
      }))
    },
    sortOptions () {
        // Create an options list from our fields
        return this.fields
            .filter(f => f.sortable)
            .map(f => { return { text: f.label, value: f.key } })
    },
    setConfigComponent(){
      console.log('config component');            
      let newConfig = JSON.parse(JSON.stringify(this.configComponent.configExpandComponent));
      if(newConfig.service){
        if(this.itemsUnchanged.length > 0){
          if(this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName] !== undefined){
            newConfig.service = newConfig.service+'/'+this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName];
            console.log({configExpandComponentService:newConfig.service}); 
          }
        }     
      }
      return newConfig;
    }
    },
    mounted (){
        
        // console.log({service:this.configComponent.service,idName:this.configComponent.idName,constraint:this.configComponent.constraint,tableTitle:this.configComponent.tableTitle,columns:this.configComponent.columns,noColumns:this.configComponent.noColumns});
        
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
        console.log({changeInput});
        console.log('this.animateIndexAux: '+this.animateIndexAux);
        console.log('this.countComponents '+ this.countComponents);
        
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
    dobleClick(event,item,index,props){  
      
        if(this.configComponent.expand){
          props.expanded = !props.expanded
        }
       
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
             if(this.configComponent.edit !== false){
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
         }
      
        
        
    },
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
      this.$http.post(this.config.urlBase+'/'+this.configComponent.service,insetData).then(resp=>{
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
      console.log({indexTableUbdateSelected:this.indexTableUbdateSelected});
      console.log({itemsUnchanged:this.itemsUnchanged});      
      insetData[this.configComponent.idName] = this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName];
      console.log({insetData});     
      this.$http.put(this.config.urlBase+'/'+this.configComponent.service,insetData)
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
      let text='';
      let iAux = true;
      for (let i = 0; i < this.fields.length; i++) {
        if(this.fields[i].value.toLowerCase() !== 'editar'){
            if(this.fields[i].value.toLowerCase() !== '_id'){
              if(iAux){
                text+=this.fields[i].text +' = '+this.items[this.indexTableUbdateSelected][this.fields[i].value]
                iAux = false;
              }else{          
                  text+=' ,'+this.fields[i].text +' = '+this.items[this.indexTableUbdateSelected][this.fields[i].value]
              }
            }
          }
      }
      this.mensssajeModal ='Desea eliminar el registro: '+text;
      this.showModalMessajeDelete = true;

    let id = this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName]
    console.log({id});     
          // this.$http.delete(this.config.urlBase+'/'+this.configComponent.service+'/'+id).then(resp=>{
          //   console.log({resp});
          //   this.getData();
          //   this.editing=false;
          // },error=>{     
          //   this.showModalMessaje =true;
          //   this.mensssajeModal = error;
          //   this.editing=true;
          // });
    },
    deleteConfirm(){
      let id = this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName]
      console.log({id});     
      
          this.$http.delete(this.config.urlBase+'/'+this.configComponent.service+'/'+id).then(resp=>{
            console.log({resp});
            this.getData();
            this.editing=false;
            this.showModalMessajeDelete = false;
          },error=>{     
            this.showModalMessaje =true;
            this.mensssajeModal = error;   
            this.showModalMessajeDelete = false;        
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
      console.log({service:this.configComponent.service});

        let resp = await this.$http.get(this.config.urlBase+'/'+this.configComponent.service).catch(error=>{
          console.log({error});
          
          this.completeProcess=true;
          this.showModalMessaje =true;
          this.mensssajeModal = `error: no se tiene acceso al servidor`;

        });
        console.log({resp});
          let dat = {};
          this.itemsUnchanged = JSON.parse(JSON.stringify(resp.data.rows));
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
           
        // this.fields = this.fields.filter(field => field.key !== this.configComponent.idName);
         this.fields.unshift({ value: '_id', text: 'indice'});
         if(this.configComponent.edit !== false){
          this.fields.unshift({ value: 'editar', text: 'Editar'});
         }
          
  
          await this.setfieldsJson(this.fields); // poner await si algo sale mal

          this.getNameOfForeinKey(this.configComponent.constraint); // poner await si algo sale mal
          console.log({fieldsJson:this.fieldsJson});

            console.log({fields:this.fields});
          console.log(this.items);
          return true;
    },
    selectCorrectConstraint:async function(){
        for (let i = 0; i < this.configComponent.constraint.length; i++) {    
            if(this.configComponent.constraint[i].service){            
              let index = this.fields.findIndex(fiel=>fiel.value === this.configComponent.constraint[i].localReference);
              this.fields[index].text = this.configComponent.constraint[i].label;             
              this.fields[index].type = this.configComponent.constraint[i].type;             
            }

            else{ // unir el campo del contrain con el campo correcto en la tabla
              let index = this.fields.findIndex(fiel=>fiel.value === this.configComponent.constraint[i].localReference);
              this.fields[index].text = this.configComponent.constraint[i].label;
              this.fields[index].value = this.configComponent.constraint[i].localReference;
              this.fields[index].type = this.configComponent.constraint[i].type;
               }
          }
          return true;
    },
    selectCorrectColumns: async function(){
        let deletedKeys = [];
        if(this.configComponent.columns.length > 0){
         for (let i = 0; i < this.fields.length; i++) { 
             
               let indexCol = this.configComponent.columns.findIndex(col =>col.key === this.fields[i].value);
                if(indexCol === -1){                    
                    let indexCont =  this.configComponent.constraint.findIndex(cons=>cons.localReference === this.fields[i].value);
                    if(indexCont === -1){
                        console.log('eliminar de la cabecera: '+this.fields[i].value);
                        deletedKeys.push(this.fields[i].value);                       
                    }
                }else{
                    this.fields[i].text = this.configComponent.columns[indexCol].label;
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
                   
            for (let i = 0; i < this.configComponent.noColumns.length; i++) {            
                this.fields = this.fields.filter(field => field.value !== this.configComponent.noColumns[i]);  
                
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
              if(this.fields[i].value !== '_id'){
                if(this.fields[i].value === 'datetime-local'){
                  this.dataAdd[this.fields[i].value] = new Date();  
                }else{
                  this.dataAdd[this.fields[i].value] = '';   
                }                
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
       
      //  this.indexTableUbdateSelected === ((this.pagination.page-1)*this.pagination.rowsPerPage)+index
      this.indexTableUbdateSelected = ((this.pagination.page-1)*this.pagination.rowsPerPage)+index;


      
      for (const key in this.fieldsJson) {
          if(key !== 'editar'){
            if(key !== '_id'){            
              if(item[key]!== null){
                if(this.itemsUnchanged[this.indexTableUbdateSelected][key]){
                  this.dataUpdate[key] = JSON.parse(JSON.stringify(this.itemsUnchanged[this.indexTableUbdateSelected][key]))+'';
                }else{
                  this.dataUpdate[key] = item[key];
                }
                
              }else{
                this.dataUpdate[key]='';
              }
          
            }
          }
      }
      console.log({externalItems:this.externalItems});
      
      
      
      for (let i = 0; i < this.fields.length; i++) {         
            if(this.fields[i].type === 'SELECT_EDITABLE'){
              // console.log({fieldsi:this.fields[i].value});
              // console.log({fieldsJson:this.fieldsJson[this.fields[i].value].text});
              // console.log({externalItems2:this.externalItems[this.fieldsJson[this.fields[i].value].text]});
                
                this.countComponents++;                
            }else if(this.fields[i].type === 'datetime-local'){
                this.countComponents++;                 
            }               
      }
      console.log({countComponents:this.countComponents});

      
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
     *    let configComponent.constraint = [{
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
              if(this.fieldsJson[key] === undefined){
                // if(this.configComponent.idName !== key){                                
                 delete this.items[i][key];
                // }
                  
              }
                       
          }                
          this.referencesIds[i]={};
      }
      console.log({items:this.items});
      
    // este código sirve para la configuración de contraint por array
    for (let k = 0; k < constraint.length; k++) { 
       
        if(constraint[k].service){       
            let resp = await this.$http.get(this.config.urlBase+'/'+constraint[k].service);
            this.externalItems[constraint[k].label] = resp.data.rows;
   
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
              this.externalItems[constraint[k].label] = constraint[k].data;
          }else{
            console.log(constraint[k].label+' no tiene la configuración data');
            
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
   
    const isConstraint = this.configComponent.constraint.filter(resp => resp.localReference === key)
    
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
   
    const isConstraint = this.configComponent.constraint.filter(resp => resp.localReference === key);
  
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
    // for (let j = 0; j < this.configComponent.columns.length; j++) { // reemplazar los campos que llegan de columns en las columnas
    //         const element = this.configComponent.columns[j];              
    //     }    
    // console.log(this.configComponent.columns);
    
   
    
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
  },
  /**
   * esta funcion des selecciona todos los checkbox
   */
  toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.indexedItems.slice()
      },
  /**
   * este método sirve para por hacer sort con los chechBox
   */
  changeSort (column) {
    if (this.pagination.sortBy === column) {
      this.pagination.descending = !this.pagination.descending
    } else {
      this.pagination.sortBy = column
      this.pagination.descending = false
    }
  },

  },watch: {
    pagination:{
      handler () {
        console.log({pagination:this.pagination});        
      }
    },
    showModalMessajeDelete:{
      handler () {
        if(this.showModalMessajeDelete === false){
          // console.log('eliminar registro');     
          //   let id = this.itemsUnchanged[this.indexTableUbdateSelected][this.configComponent.idName]
          //  console.log({id});     
          // this.$http.delete(this.config.urlBase+'/'+this.configComponent.service+'/'+id).then(resp=>{
          //   console.log({resp});
          //   this.getData();
          //   this.editing=false;
          // },error=>{     
          //   this.showModalMessaje =true;
          //   this.mensssajeModal = error;
          //   this.editing=true;
          // });     
        }    
      }
    }   
  },
 
    props: {
      
        configComponent:{},
        
  }, 
  data(){
    return {
    transProps: {
        // Transition name
        name: 'flip-list-move'
    },
      mensssajeModal:"Error:",
      showModalMessaje: false,
      showModalMessajeDelete:false,
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
      itemsUnchanged:[],   
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
      selected:[],
     
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
        clickDelay: 300,
        clickClicks: 0,
        clickTimer: null
    // <--variables de control de doble clic
    };
  },
  created() {
    let configTableDefault= {
        columns:[],
        noColumns:[],
        tableTitle:'',
        service:'',
        idName:'',
        add:true,
        edit:true,
        pagination:true,
        withChekbox:false,
        expand:false,
        paginationRowsPerPage:5,
        paginationPage:1,
        constraint :[],
    }
    console.log({configComponent:this.configComponent});  
    for (const key in configTableDefault) {
      if(this.configComponent[key] === undefined){
        console.log({keyUndefined:key});        
        this.configComponent[key] = configTableDefault[key];
      }
    } 
    this.pagination= {
        rowsPerPage:this.configComponent.paginationRowsPerPage,
        page:this.configComponent.paginationPage,      
        }
  },
}
</script>

<style>
.table .flip-list-move {
  transition: transform 1s;
}
.rounded{
  border-radius: 10px;
   position: absolute;
  width:90%;
  left: 5%;
  display: flex;
  justify-content: center; 
  
  /*max-width: 600px; 
  width: 100%; */
  /* margin:auto; */
  /* width:fit-content; */
}
.table_head{
  width:90%;
  padding:1rem;
  margin:auto;
  border-radius: 5px;
  background: rgb(9,9,121);
  background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(1,185,237,1) 20%, rgba(0,212,255,1) 80%, rgba(9,9,121,1) 100%);
  position: absolute;
  left: 5%;  z-index: 1;
}

/* .table-row-move {
  transition: all .5s;
}

.table-row-item {
  backface-visibility: hidden;
} */
</style>

