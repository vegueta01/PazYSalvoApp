<template>
    <v-container grid-list-md text-xs-center>
        <v-layout align-baseline wrap>            
            <v-flex xs12 sm6>                    
                <v-flex>
                    <tableAutomatic v-bind="{service,idName,constraint,tableTitle,columns,noColumns}" />                        
                </v-flex>
                
                <v-flex>
                   <tableAutomatic v-bind="{service,idName,constraint,tableTitle,columns,noColumns}" />
                </v-flex>
                    
                </v-flex>
            <v-flex xs12 sm6>
                    <tableAutomaticExpanded v-bind="{service,idName,constraint,tableTitle,columns,noColumns}" />                        
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import tableAutomatic from '@/components/tableAutomatic.vue'
import tableAutomaticExpanded from '@/components/tableAutomaticExpanded.vue'

export default {
        components:{
            tableAutomatic,
            tableAutomaticExpanded
        },
        data() {{
            return { 
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
                  {
                    key:'MAN_MAN_FRECUENCIA',
                    label:'Frecunencia'
                    
                  },
                  {
                    key:'MAN_MAN_HOROMETRO_1_INGRESO',
                    label:'Horometro 1 Ingreso'
                    
                  },
                  {
                    key:'MAN_MAN_HOROMETRO_2_INGRESO',
                    label:'Horometro 2 Ingreso'
                    
                  },
                  {
                    key:'MAN_MAN_KILOMETRAJE_INGRESO',
                    label:'Kilometraje Ingreso'
                    
                  },
                  {
                    key:'MAN_MAN_HOROMETRO_1_SALIDA',
                    label:'Horometro 1 Salida'
                    
                  },
                  {
                    key:'MAN_MAN_HOROMETRO_2_SALIDA',
                    label:'Horometro 2 Salida'
                    
                  },
                  {
                    key:'MAN_MAN_KILOMETRAJE_SALIDA',
                    label:'Kilometraje Salida'
                    
                  }
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
                  {
                    localReference:'MAN_MAN_GEN_USU_ID_REG',
                    reference:'GEN_USU_ID',
                    attributeNameSelect:'GEN_USU_USUARIO',
                    service:'genUsuarios',
                    label:'Usuario',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
                  {
                    localReference:'MAN_MAN_GEN_CSA_ID',
                    reference:'GEN_CSA_ID',
                    attributeNameSelect:'GEN_CSA_NOMBRE',
                    service:'genCasa',
                    label:'Casa Compañía',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
                  {
                    localReference:'MAN_MAN_EQU_ID',
                    reference:'MAN_EQU_ID',
                    attributeNameSelect:'MAN_EQU_PLACA1',
                    service:'equipo',
                    label:'Equipo',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
                  {
                    localReference:'MAN_MAN_TIPO_MANTENIMIENTO',
                    reference:null,
                    attributeNameSelect:null,
                    service:null,
                    data:['Preventivo','Correctivo'],
                    label:'Tipo mantenimiento',
                    // setPositionInTable:3,
                    type:'SELECT_EDITABLE',
                    nullable:'N'
                  },
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
            }
        }
        },
    }
</script>