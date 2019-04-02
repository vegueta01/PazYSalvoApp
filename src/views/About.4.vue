<template>
<div>
  <v-layout justify-center>
    <v-flex xs12 sm6>    

      <v-card>
        <v-container
          fluid
          grid-list-md
        >
          <v-layout row wrap>
            <v-flex 
             v-for="(item, i) in dataFile.data.rows"
              :key="i"
              v-bind="{ [`xs12`]: true }"
            >
              <v-card>
                <v-btn style="width:100%; height:100%">

                    <v-img
                      v-if="dataFile.data.rows[i].GEN_ARC_EXTENCION === 'image/png'" 
                      :src="dataFile.data.rows[i].URL"
                      height="100%"
                      @click="clickCard(i)"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                    <template v-slot:placeholder>
                        <v-layout
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>

                      <v-container
                        fill-height
                        fluid
                        pa-2
                      >
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline" v-text="dataFile.data.rows[i].GEN_ARC_NOMBRE_ORIGINAL"></span>
                            <!-- white--text -->
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>

                </v-btn>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon disabled @click="clickCard(i)">
                    <v-icon>print</v-icon>
                  </v-btn>
                  <v-btn icon disabled>
                    <v-icon>cloud_download</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>

        <v-dialog v-model="dialogImage" max-width="90%" max-height="100%">
            <v-card  v-if="dialogImage" height="800px" >
              <v-card-title>
                 <h2>{{dataFile.data.rows[selectCardImage].GEN_ARC_NOMBRE_ORIGINAL}} </h2>
                  <v-spacer></v-spacer>
                 <v-btn color="primary" flat @click="dialogImage=false">Close</v-btn>
              </v-card-title>
              <!-- <v-card-text style="width:100%; height:100%" > -->
              
                  <iframe :src="dataFile.data.rows[selectCardImage].URL" style="width:100%;height:89%;"></iframe>
          
                
          
              <!-- </v-card-text> -->
              <!-- <v-card-actions>
                <v-btn color="primary" flat @click="dialogImage=false">Close</v-btn>
              </v-card-actions> -->
            </v-card>
          </v-dialog>
  </div>
</template>


<script>
  export default { 
    beforeMount() {
      this.$http.get('http://localhost:3000/genArchivos/getFile/507/3').then(resp=>{
        this.dataFile = resp;
        console.log({dataFile:this.dataFile});
      }).catch(error=>{
          console.log({error});          
          // this.completeProcess=true;
          // this.showModalMessaje =true;
          // this.mensssajeModal = `error: no se tiene acceso al servidor`;

        });
        
        
    },
    methods: {
      clickCard(key){
        console.log({key});
        this.selectCardImage=key;
        this.dialogImage = true;
      }
    },
    data: () => ({
      selectCardImage:-2,
      dataFile:{
        data:{          
          rows:[]
        }
      },
      dialogImage:false,
      cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12,key:1 },
        { title: 'Pre-fab x', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 12,key:2 },
        { title: 'Pre-fab y', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 12,key:3 },
  
      ]
    })
  }
</script>