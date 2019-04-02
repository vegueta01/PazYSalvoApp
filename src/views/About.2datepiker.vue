<template> 
    <!-- <tableAutomatic v-bind="{configComponent:configExpandComponent}" /> -->
    <div>
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        offset-y
        :nudge-right="40"
         lazy
        transition="scale-transition" 
       
        min-width="250px"
      >
        <!-- 
           full-width
          :nudge-right="40"
         lazy
        transition="scale-transition"  
        full-width
        min-width="290px" -->
        <v-text-field
          slot="activator"
          v-model="getDate"
          label="Fecha"
          prepend-icon="event"
          readonly
        >
        <!-- readonly -->
        </v-text-field>
        <div>
        <v-date-picker locale="es-MX" v-model="date" @input="getDate =  date+' '+e7"></v-date-picker>
        <v-time-picker width="286" v-model="e7" format="24hr"  @input="getDate =  date+' '+e7"></v-time-picker>
        </div>
        <div> 
          <v-btn block color="primary" dark  @click="menu2 = false">
            <v-icon >thumb_up</v-icon>
          </v-btn>
        
        </div>
        
        <!-- <v-layout wrap>
          <v-flex xs6 md6>
            <v-date-picker locale="es-MX" v-model="date" @input="getDate =  date+' '+e7"></v-date-picker>
          </v-flex>
          <v-flex xs6 md6>
            <v-time-picker width="286" v-model="e7" format="24hr"  @input="getDate =  date+' '+e7"></v-time-picker>    
          </v-flex>  
          <v-flex xs12 md12>
            <v-btn block color="primary" dark  @click="menu2 = false">
              <v-icon >thumb_up</v-icon>
            </v-btn>
          </v-flex>      
        </v-layout> -->
        
     
        
      </v-menu>
    </div>
     
</template>

<style>
  .v-picker__title{
    height: 100px
  }
</style>
<script>
  import tableAutomatic from '@/components/tableAutomatic.vue'
   
export default {
  computed: {
    // :value="getDate"
    
    
  },
  methods: {
  
  },
  components:{
        tableAutomatic
    },
  data() {
    return {
        getDate:'',
        date:'',
        e7:'',
        menu2: false,
        configExpandComponent:{
                        idReferenceFather:'PST_TDE_TRA_ID',  
                        tableTitle:"",          
                        service:'pstTransaccionDetalle',
                        idName:'PST_TDE_ID',
                        columns:[
                            {
                                key:'PST_TDE_OBSERVACIONES',
                                label:'Observaciones'
                            },
                            {
                                key:'PST_TDE_CANTIDAD',
                                label:'cantidad'
                            },
                            // {
                            //     key:'MAN_MDT_ABSERVACIONES',
                            //     label:'observaciones'
                            // }
                            
                        ],
                       
                        noColumns:[],
                        constraint :[
                            {
                            localReference:'PST_TDE_ELE_ID',//Gen_est_tab_id
                            reference:'PST_ELE_ID',
                            attributeNameSelect:'PST_ELE_NOMBRE_EQUIPO',
                            service:'pstElemento',
                            label:'Equipo',
                            // setPositionInTable:3,
                            type:'SELECT_EDITABLE',
                            nullable:'N'
                        },
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

                        expand:true,
                        // expandText: 'texto felipe buitrago',
                        expandComponent:tableAutomatic,                        
                        configExpandComponent:{                   
                        idReferenceFather:'PST_DEQ_TDE_ID',  
                        tableTitle:"",          
                        service:'pstDetallesEquipo',
                        idName:'PST_DEQ_ID',
                        columns:[],
                       
                        noColumns:[],
                        constraint :[]                     
                       
                      }
                    }
                  }
  },
}
</script>