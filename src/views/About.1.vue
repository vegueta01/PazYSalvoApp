<template>
  <div id="app">
  <v-app id="inspire">
    <v-data-table :headers="mainHeaders"
                  :items="mainItems"
                  item-key="name"
                  hide-actions
                  expand
                  class="elevation-1">
      <template slot="items" scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs">{{ props.item.name }}</td>
          <td class="text-xs">{{ props.item.age }}</td>
        </tr>
      </template>
      <template slot="expand" >
        <v-card class="elevation-10">
          <v-card-text>
            <v-data-table :headers="subHeaders"
                          :items="subItems"
                          item-key="color"
                          hide-actions
                          class="elevation-6">
              <template slot="items" scope="props">
                <td class="text-xs">{{ props.item.color }}</td>
                <td class="text-xs">{{ props.item.value }}</td>
              </template>
            </v-data-table>

          </v-card-text>
        </v-card>
      </template>
    </v-data-table>  
    </v-app>
    </div>
  
</template>
<script>
  export default {
    data () {
    return {
      mainHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Age', value: 'age' }
      ],
      subHeaders: [
        { text: 'Color', value: 'color' },
        { text: 'Value', value: 'value' }
      ],
      mainItems: [
        { name: 'Marc	Moreno', age: '30' },
        { name: 'Wallace	Frank', age: '31' },
        { name: 'Enrique	Sanders', age: '45' },
        { name: 'Alyssa	Butler', age: '23' },
        { name: 'Domingo	Gill', age: '29' },
        { name: 'Felix	May', age: '28' },
        { name: 'Bradford	Powell', age: '15' },
        { name: 'Hattie	Coleman', age: '17' },
        { name: 'Marty	Jordan', age: '23' },
        { name: 'Bobbie	Webb', age: '28' }
      ],
      subItems: [
        { color: 'Red', value: '1' },
        { color: 'Green', value: '2' },
        { color: 'Blue', value: '3' },
        { color: 'Black', value: '4' }
      ]
    }
  }
  }
</script>