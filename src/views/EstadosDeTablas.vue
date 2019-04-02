<template>
  <tableAutomatic v-bind="{configComponent}"/>
</template>

<script>
import tableAutomatic from "@/components/tableAutomatic.vue";
import inputSelectEditable from '@/components/inputSelectEditable.vue'
export default {
  components: {
    tableAutomatic
  },
  data() {
    return {
      configComponent: {
        tableTitle: "Estados de las tablas",
        service: "genEstado",
        idName: "GEN_EST_ID",
        columns: [
          // {
          // key:'GEN_EST_REG_ACTIVO',
          // label:'registro activo'
          // },
          {
            key: "GEN_EST_NOMBRE",
            label: "Nombre estado"
          }
        ],
        // noColumns:['GEN_EST_ID_TABLA',],// son las columas que no se quieren mostrar
        noColumns: [],
        constraint: [
          {
            component:inputSelectEditable,
            localReference: "GEN_EST_TAB_ID", //Gen_est_tab_id
            reference: "GEN_TAB_ID",
            attributeNameSelect: "GEN_TAB_ID_NOMBRE_REFERENCIA",
            service: "genTablas",
            label: "Tabla referencia",
            // setPositionInTable:3,
            type: "SELECT_EDITABLE",
            nullable: "N"
          },
          {
            component:inputSelectEditable,
            localReference: "GEN_EST_REG_ACTIVO",
            reference: null,
            attributeNameSelect: null,
            service: null,
            data: ["0", "1"],
            label: "Registro activo",
            // setPositionInTable:3,
            type: "SELECT_EDITABLE",
            nullable: "N"
          }
        ]
      }
    };
  }
};
</script>