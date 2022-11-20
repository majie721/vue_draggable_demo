<template>
    <div class="hello">
  
      <div style="width:100%">
        <table>
          <div>
            <th>id</th>
            <th>sku</th>
            <th>总数</th>
            <th>num</th>
          </div>
          <tbody>
            <draggable v-model="orderInfo" :group="groupParent" :sort="false" :move="onMove">
              <transition-group>
                <tr class="item" v-for="item in orderInfo" :key="item.id">
                  <td class="tdw">{{ item.id }}</td>
                  <td class="tdw">{{ item.name }}</td>
                  <td class="tdw">{{ item.total }}</td>
                  <td class="tdw">{{ item.num }}</td>
                </tr>
              </transition-group>
  
            </draggable>
          </tbody>
        </table>
      </div>
  
      <div style="width:100%;height: 300px;border: 1px solid grey;padding: 10px;position: relative;">
        <draggable v-model="arr2" :group="groupChildContainer" :sort="false">
         
          <div v-for="(childrenOrder, _index) in childrenOrderList" :key="_index">
            {{childrenOrder}}
        </div>
  
        </draggable>
      </div>
  
  
  
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable'
  export default {
    components: {
      draggable,
    },
  
    name: 'HelloWorld',
  
  
    data() {
      return {
        moveElement: {},
        groupParent: {
          name: 'dragBox',
          pull: 'clone',//是否允许拖出当前组
          put: false,//是否允许拖入当前组
        },
        groupChildContainer: {
          name: 'dragBox',
          pull: false,//是否允许拖出当前组
          put: true,//是否允许拖入当前组
        },
        groupChildItem: {
          name: 'dragBox',
          pull: false,//是否允许拖出当前组
          put: true,//是否允许拖入当前组
        },
        
        childrenOrderList: [],
        orderInfo: [
          { id: 1, name: 'AA', total: 10, num: 1 },
          { id: 2, name: 'AA', total: 10, num: 2 },
          { id: 3, name: 'AA', total: 12, num: 3 },
          { id: 4, name: 'BB', total: 10, num: 1 },
          { id: 5, name: 'BB', total: 5, num: 1 },
          { id: 6, name: 'CC', total: 6, num: 2 },
          { id: 7, name: 'DD', total: 8, num: 2 },
          { id: 8, name: 'EE', total: 2, num: 1 },
          { id: 9, name: 'FF', total: 1, num: 1 },
        ]
      }
    },
  
    computed:{
      arr2:{
        get(){
            return this.childrenOrderList;
        },
        set(value){
          console.log(value)
          this.childrenOrderList.push(value[0])
        }
      }
    },
  
    methods: {
    
      onMove(e) {
        console.log(11)
        this.moveElement = e.draggedContext.element;
        //this.childrenOrderList.push(`order_${this.childrenOrderList.length}`)
        return true
      }
    },
  
  
  
  
  
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  
  .hello {
    width: 1200px;
    height: 600px;
    background-color: #f0f0f0;
    margin-left: 400px;
  }
  
  table {
    width: 600px;
  
  }
  
  table,
  th,
  td {
    border: 1px solid gray;
  }
  
  th {
    width: 200px;
  }
  
  .tdw {
    width: 200px;
  }
  </style>
  