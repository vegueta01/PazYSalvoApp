<template>
<!--  
      <v-layout row wrap align-space-around>
      <v-flex xs12> -->
        <v-card >
          <v-card-title primary class="title" style="text-align: right;">
              <h2>{{configComponent.title}} {{nameTitleFather}}</h2> 
          </v-card-title>
          <v-card-text class="px-0">
              <IEcharts :style="'height:'+heigth+'px'"
                :option="option"
                :loading="loading"
                @ready="onReady"
                @click="onClick"
                />
          </v-card-text>
        </v-card>
      <!-- </v-flex>
      </v-layout> -->

  
    <!-- <v-btn @click="doRandom">Random</v-btn> -->

</template>

<script type="text/babel">
  //TODO: adaptar el tamaño de  la gráfica a la medida 
  import IEcharts from 'vue-echarts-v3/src/full.js';
  import config from '@/config';
  export default {
 
    components: {
      IEcharts
    },
    props: {
    },
    created() {
        if(this.configComponent.heigth!==undefined){
            this.heigth = this.configComponent.heigth;
        }
       if(this.configComponent.zoomZiseRows!== undefined){
           this.zoomZiseRows =  this.configComponent.zoomZiseRows;
        }
    },
    mounted:async function() {

        if(this.configComponent.resultData !== undefined){
            this.resultData = this.configComponent.resultData;                
        }else if(this.configComponent.service !== undefined){   
                if(this.configComponent.filterService !== undefined){ 
                    console.log(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`);
                    
                this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}/?${this.configComponent.filterService.localIdName}=${this.configComponent.dataFather[this.configComponent.filterService.fatherIdName]}`)
                .catch(error=>{
                    console.log({error});      
                    //:TODO: poner acá un mensaje de aviso de eror   
                });
                }else{
                    this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}`)
                        .catch(error=>{
                        console.log({error});      
                        //:TODO: poner acá un mensaje de aviso de eror   
                        });
                    }
        }else{
            console.log(' no existen ni servicios ni data en las configuraciones, por favor envíe los campos correctamente');            
        }

        // this.resultData = await this.$http.get(`${this.config.urlBase}/${this.configComponent.service}`)
        // // this.resultData = await this.$http.get(`http://localhost:3000/pstElemento/consult/getInventoryToals`)
        //         .catch(error=>{
        //           console.log({error});      
        //           //:TODO: poner acá un mensaje de aviso de eror   
        //         });
        
        let source = {};
        let dimensions = [];            
        let series = [];
        let zoomEnd = 100;
        if(this.configComponent.nameTitleFather !== undefined){
            this.nameTitleFather = this.configComponent.dataFather[this.configComponent.nameTitleFather];
        }
        
        if(this.resultData.data.rows.length > 0){          
            source = this.resultData.data.rows;
            if(source.length > this.zoomZiseRows){
                zoomEnd = (this.zoomZiseRows*100/source.length);
                this.showZoom = true;
            }
            for (const key in this.resultData.data.rows[0]){
                if(this.configComponent.xAxisColumn.key === key){
                     dimensions.unshift(key);
                }else{
                    for (let i = 0; i < this.configComponent.columns.length; i++) {    
                        if(key === this.configComponent.columns[i].key){             
                                dimensions.push(key);
                                series.push({name:this.configComponent.columns[i].label, type: 'bar', animationDelay: function (idx) {return idx * 100 + 100;}});
                            break;
                        }
                    
                    } 
                }
            }
        }
            
            // series.pop();
             
            this.option = {
                title: {
                    // text: 'Titulo'
                },
                legend: {},
                tooltip: {},
                dataset: {
                    dimensions,
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
    props:{
        configComponent:{}
    },  
    data: () => ({
    
      loading: true,
      option: {},
      xAxisData:[],
      data1:[],
      data2:[],
      zoomZiseRows:15,
      showZoom:false,
      config,
      heigth:450,
      nameTitleFather:'',
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
