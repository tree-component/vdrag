<template>
  <div class="drag-root">
    <div class="drag-title">{{model.text}}</div>
    <draggable class="drag-group-1" v-model="model.children" :options="{group:model.group}" @>
      <div class="drag-item-1" v-for="aaa in model.children">
        <div class="drag-text-1">
          <i class="drag-item-checkbox fa" :class="aaa.checked ? 'fa-check-square-o' : 'fa-square-o'" @click="checkItem(aaa)"></i>
          {{aaa.text}}
          <div class="buttons">
            <!--<span class="button" v-if="aaa.checked" @click="changeAll(aaa,false)">取消全选</span>
                  <span class="button" v-else @click="changeAll(aaa,true)">全选</span>-->
            <span class="button" v-if="aaa.expand" @click="expand(aaa,false)">收起</span>
            <span class="button" v-else @click="expand(aaa,true)">展开</span>
          </div>
        </div>
        <draggable class="drag-group-2" v-show="aaa.expand" :options="{group: aaa.group}">
          <div class="drag-item-2" v-for="bbb in aaa.children" :class="bbb.style">
            <div class="drag-text-2">
              <i class="drag-item-checkbox fa" :class="bbb.checked ? 'fa-check-square-o' : 'fa-square-o'" @click="checkItem(bbb)"></i>
              {{bbb.text}}
            </div>
            <draggable class="drag-group-3" v-show="bbb.expand" :options="{group:bbb.group}">
              <div class="drag-item-3" v-for="ccc in bbb.children">
                <span class="drag-text-3">
                  <i class="drag-item-checkbox fa" :class="ccc.checked ? 'fa-check-square-o' : 'fa-square-o'" @click="checkItem(ccc)"></i>
                  {{ccc.text}}
                </span>
              </div>
            </draggable>
          </div>
        </draggable>
      </div>
    </draggable>
  </div>
</template>


<script>
import draggable from 'vuedraggable';

export default {
  name: 'x-drag',
  components: {
    draggable,
  },
  props: {
    model: Object,
    fn: Object,
  },
  data() {
    return {
      mm: true,
    };
  },
  methods: {
    checkItem(zzz) {
      zzz.checked = !zzz.checked;
      this.fn.onCheck(zzz);
    },
    changeAll(zzz, change) {
      if (zzz.children) {
        zzz.children.forEach(function (element) {
          element.checked = change;
        }, this);
        zzz.checked = change;
      }
    },
    expand(zzz, change) {
      zzz.expand = change;
    },
  },
};

</script>

<style scoped>
.fa {
  font-size: 14px;
  width: 14px;
  color: #333;
}

.drag-root {
  display: block;
  min-height: 100px;
  margin: 10px;
  border: 1px solid #666;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.drag-title {
  padding: 5px 10px;
}

.drag-group-1 {
  margin: 5px 10px;
  min-height: 30px;
}

.drag-item-1 {
  display: block;
  margin: 5px 0;
  min-height: 30px;
}

.drag-text-1 {
  padding: 10px 10px;
  background: #D7D7D7;
}

.drag-group-2 {
  min-height: 30px;
}

.drag-item-2 {
  display: inline-block;
  min-width: 200px;
}

.drag-group-3 {
  display: inline-block;
  min-height: 30px;
}

.drag-item-3 {
  display: inline-block;
  min-height: 30px;
}

.drag-text-2,
.drag-text-3 {
  display: inline-block;
  padding: 5px 5px;
  min-height: 30px;
}

.drag-item-checkbox {
  cursor: pointer;
}

.drag-item-block {
  display: block;
}

.drag-item-block .drag-text-2 {
  min-width: 10px;
}

.buttons {
  display: block;
  float: right;
}

.button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
