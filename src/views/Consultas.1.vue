<template>
<!--  
      <v-layout row wrap>
      <v-flex xs12>
        <v-card >
          <v-card-title primary class="title" style="text-align: right;">
              <h2>Mi gráfica</h2> 
          </v-card-title>
          <v-card-text class="px-0">
              <IEcharts style="height: 600px;"
                :option="option"
                :loading="loading"
                @ready="onReady"
                @click="onClick"
                />
          </v-card-text>
        </v-card>
      </v-flex>
      </v-layout> -->
    
    <!-- <v-btn @click="doRandom">Random</v-btn> -->
    <chartBar v-bind="{configComponent}" />

</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.js';
  import chartBar from '@/components/chartBar.vue'
  export default {
 
    components: {
      IEcharts,
      chartBar
    },
    props: {
    },
    mounted:async function() {
        // this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}`)
        this.resultData = await this.$http.get(`http://localhost:3000/pstElemento/consult/getInventoryToals`)
                .catch(error=>{
                  console.log({error});      
                  //:TODO: poner acá un mensaje de aviso de eror   
                });
        let source = {};
        let dimensions = [];            
        let series = [];
        let zoomEnd = 100;
        let product = [];
        if(this.resultData.data.rows.length > 0){
            // this.option.dataset ={};
            // this.option.dataset.source = this.resultData.data.rows;

            // this.option.dataset.dimensions = [];            
            // this.option.series = [];
            // for (const key in this.resultData.data.rows[0]) {
            //    this.option.dataset.dimensions.push(key);
            //    this.option.series.push({type: 'bar', animationDelay: function (idx) {return idx * 100 + 100;}});
            // }
            // for (let i = 0; i < this.resultData.data.rows.length; i++) {
            //     this.resultData.data.rows[i];                
            // }
            source = this.resultData.data.rows;
            if(source.length > this.ziseRows){
                zoomEnd = (this.ziseRows*100/source.length);
                this.showZoom = true;
            }
            for (const key in this.resultData.data.rows[0]){ 
               if(key !== 'EQUIPO_ID'){             
                dimensions.push(key);
                // product.push(key.toLowerCase())
                // dimensions.push({name:key,as : key.toLowerCase() ,label:{name:key.toLowerCase(),show:true}});
                series.push({name:key.toLowerCase(),type: 'bar', animationDelay: function (idx) {return idx * 100 + 100;}});
                        }
                    }
                }
            series.pop();
            series.pop();
             
            this.option = {
                title: {
                    // text: 'Titulo'
                },
                legend: {},
                tooltip: {},
                dataset: {
                    dimensions,
                    // product,
                    source
                },
            
            xAxis: {type: 'category'},
            yAxis: {},
            series,
             dataZoom: [
                {
                    show: this.showZoom,                   
                    start: 0,
                    end:zoomEnd
                }
            ],
          
            animationEasing: 'elasticOut',
                    animationDelayUpdate: function (idx) {
                        return idx * 5;
                    }
            } 
            this.loading = false;
    },
  
    data: () => ({
      loading: true,
      option: {},
      xAxisData:[],
      data1:[],
      data2:[],
      ziseRows:15,
      showZoom:false,
      configComponent:{
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
         heigth:450

      }
    }),
    methods: {
      doRandom() {
        // const that = this;
        // let data = [];
        // for (let i = 0, min = 5, max = 99; i < 6; i++) {
        //   data.push(Math.floor(Math.random() * (max + 1 - min) + min));
        // }
        // that.loading = !that.loading;
        // that.bar.series[0].data = data;
      },
      onReady(instance, ECharts) {
        console.log(instance, ECharts);
      },
      onClick(event, instance, ECharts) {
        console.log(arguments);
      }
    }
  };
</script>
