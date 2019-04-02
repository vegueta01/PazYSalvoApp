<template>
  <div class="echarts">
    <IEcharts
      :option="option"
      :loading="loading"
      @ready="onReady"
      @click="onClick"
    />
    <v-btn @click="doRandom">Random</v-btn>
  </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
 
    components: {
      IEcharts
    },
    props: {
    },
    created() {
      for (var i = 0; i < 100; i++) {
          this.xAxisData.push('Categ' + i);
          this.data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
          this.data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
      }
      this.option = {
            title: {
                text: 'Titulo'
            },
            legend: {
                data: ['bar', 'bar2'],
                align: 'left'
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [{
                name: 'bar',
                type: 'bar',
                data: this.data1,
                animationDelay: function (idx) {
                    return idx * 100;
                }
            }, {
                name: 'bar2',
                type: 'bar',
                data: this.data2,
                animationDelay: function (idx) {
                    return idx * 100 + 100;
                }
            }],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
      }
    },
    data: () => ({
      loading: false,
      option: {},
      xAxisData:[],
      data1:[],
      data2:[]
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

<style scoped>
  .echarts {
    width: 80%;
    height: 700px;
  }
</style>