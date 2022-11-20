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
          <draggable v-model="orderInfo" :group="groupParent" :sort="false"  @start="onStart" :move="onMove" @remove="onRemove">
            <transition-group>
              <tr class="item" v-for="item in orderInfo" :key="item.id">
                <td class="tdw">{{ item.id }}</td>
                <td class="tdw">{{ item.name }}</td>
                <td class="tdw">{{ item.total }}</td>
                <td class="tdw"><input type="text" v-model.number="item.num"> </td>
              </tr>
            </transition-group>
          </draggable>
        </tbody>
      </table>
    </div>

    <div style="width:100%;height: 300px;border: 1px solid grey;padding: 10px;position: relative;">
      <draggable v-model="list" :group="groupChildContainer" :sort="false" @add="onAdd">
        <transition-group style="width:1200px;height:300px;display:inline-block; background-color:aqua;">
          <div v-for="(childrenOrder, index) in childrenOrderList" :key="index"
            style="float: left;;width: 300px;height:100px;border:1px solid red;margin:10px">
            <draggable v-model="childrenOrderList[index]" :group="groupChildItem" :sort="false"
              @add="addProduct(index)">
              <transition-group style="width:300px;min-height:100px;display:inline-block; background-color: bisque;">
                <div v-for="(product, pindex) in childrenOrderList[index]" :key="pindex">
                  {{ product }}
                </div>
              </transition-group>
            </draggable>
          </div>
        </transition-group>
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
      orginMoveElement: {},
      groupParent: {
        name: 'dragBox',
        pull: true,//是否允许拖出当前组
        put: false,//是否允许拖入当前组
      },
      groupChildContainer: {
        name: 'dragBox',
        pull: false,//是否允许拖出当前组
        put: true,//是否允许拖入当前组
        scroll:true,
      },
      groupChildItem: {
        name: 'dragBox',
        pull: true,//是否允许拖出当前组
        put: true,//是否允许拖入当前组
        scroll:true,
      },

      childrenOrderList: [],
      list: [],
      orderInfo: [
        { id: 1, name: 'AA', total: 10, num: 1, children: [] },
        { id: 2, name: 'AA', total: 10, num: 2, children: [] },
        { id: 3, name: 'AA', total: 12, num: 3, children: [] },
        { id: 4, name: 'BB', total: 10, num: 1, children: [] },
        { id: 5, name: 'BB', total: 5, num: 1, children: [] },
        { id: 6, name: 'CC', total: 6, num: 2, children: [] },
        { id: 7, name: 'DD', total: 8, num: 2, children: [] },
        { id: 8, name: 'EE', total: 2, num: 1, children: [] },
        { id: 9, name: 'FF', total: 1, num: 1, children: [] },
      ],
      orderInfoOld:[], 
    }
  },



  methods: {
    onStart(){
      this.orderInfoOld = JSON.parse(JSON.stringify(this.orderInfo))
    },
    onRemove(e){
        console.log(`output-> e`, e)
        const total =  this.orginMoveElement.total - this.orginMoveElement.num
        if(total>0){
          let data =  JSON.parse(JSON.stringify(this.orderInfoOld))
          data[e.oldIndex].total =total;
          this.orderInfo = data
        }
    },
    onMove(e) {
      console.log(`output-> onMove`, e)
      this.orginMoveElement=e.draggedContext.element
      this.moveElement = JSON.parse(JSON.stringify(e.draggedContext.element));
      return true
    },
    onAdd() {
      this.childrenOrderList.push([this.moveElement])
    },
    addProduct(index) {
      let newOrderData = [];
      //debugger;
      for (const item of this.childrenOrderList[index]) {
        let exist = false;
        for (let i = 0; i < newOrderData.length; i++) {
          if (newOrderData[i].id === item.id) {
            newOrderData[i].num += item.num;
            exist = true;
            break;
          }
        }
        if (!exist) {
          newOrderData.push(item)
        }
      }
      
      this.$set(this.childrenOrderList,index,newOrderData)
      //Vue.set()
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
