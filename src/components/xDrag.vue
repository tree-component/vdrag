<template>
  <div :id="model.id" class="drag-item" :class="['drag-item-'+model.level, model.style ? 'drag-item-block':'']">
    <span v-show="model.text" class="drag-text" :class="'drag-text-'+model.level">
      <i v-show="model.checkbox" @click="checkItem(model)" class="fa" :class="model.checked ? 'fa-check-square-o' : 'fa-square-o'"></i>
      <span>{{model.text}}</span>
      <div v-show="model.button" class="buttons">
        <!--<span @click="changeAll(model)">{{text.changeAll}}</span>-->
        <span @click="expand(model)">{{text.expand}}</span>
      </div>
    </span>
    <draggable v-if="model.level<3" v-show="model.expand" v-model="model.children" :class="'drag-group-'+model.level"
     :options="dragOptions" :move="onMove" @sort="onSort" @add="onAdd" @remove="onRemove" @update="onUpdate">
      <x-drag v-for="children in model.children" :model="children" :options="options" :fn="fn">
      </x-drag>
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
    options: Object,
    fn: Object,
  },
  data() {
    return {
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  computed: {
    text() {
      return {
        changeAll: this.model.checked ? '取消' : '全选',
        expand: this.model.expand ? '收起' : '展开',
      };
    },
    dragOptions() {
      return {
        group: this.model.group,
        animation: 0,
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  methods: {
    checkItem(zzz) {
      zzz.checked = !zzz.checked;
      if (this.fn && this.fn.onCheck) {
        this.fn.onCheck(zzz.id, zzz.checked);
      }
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      if (this.fn && this.fn.onMove) {
        this.fn.onMove(relatedContext, draggedContext);
      }
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    },
    onSort(event) {
      const groupId = this.model.id;
      const childrenIds = [];
      this.model.children.forEach((element) => {
        childrenIds.push(element.id);
      });
      const itemId = event.clone ? event.clone.id : event.item.id;
      if (this.fn && this.fn.onSort) {
        this.fn.onSort(groupId, childrenIds, itemId);
      }
      return true;
    },
    onAdd(event) {
      const groupId = this.model.id;
      const childrenIds = [];
      this.model.children.forEach((element) => {
        childrenIds.push(element.id);
      });
      const itemId = event.clone.id;
      if (this.fn && this.fn.onAdd) {
        this.fn.onAdd(groupId, childrenIds, itemId);
      }
      return true;
    },
    onRemove(event) {
      const groupId = this.model.id;
      const childrenIds = [];
      this.model.children.forEach((element) => {
        childrenIds.push(element.id);
      });
      const itemId = event.clone.id;
      if (this.fn && this.fn.onRemove) {
        this.fn.onRemove(groupId, childrenIds, itemId);
      }
      return true;
    },
    onUpdate(event) {
      const groupId = this.model.id;
      const childrenIds = [];
      this.model.children.forEach((element) => {
        childrenIds.push(element.id);
      });
      const itemId = event.clone ? event.clone.id : event.item.id;
      if (this.fn && this.fn.onUpdate) {
        this.fn.onUpdate(groupId, childrenIds, itemId);
      }
      return true;
    },
    changeAll(zzz) {
      if (zzz) {
        zzz.checked = !zzz.checked;
        zzz.children.forEach((element) => {
          element.checked = zzz.checked;
        });
      }
    },
    expand(zzz) {
      zzz.expand = !zzz.expand;
    },
  },
};

</script>

<style scoped>
.drag-text .fa {
  font-size: 16px;
  width: 16px;
  padding: 2px 5px;
  color: #333;
  cursor: pointer;
}

.ghost {
  opacity: .5;
  background: #C8EBFB;
}

.drag-item-0 {
  display: block;
  min-height: 100px;
  margin: 10px;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.drag-text-0 {
  display: block;
  padding: 5px 10px;
  font-size: 18px;
}

.drag-group-0 {
  margin: 5px 10px;
  min-height: 100px;
  border: 1px solid #ccc;
}

.drag-item-1 {
  display: block;
  margin: 0 0 5px 0;
}

.drag-item-2 {
  display: inline-block;
  padding: 5px 20px;
}

.drag-item-3 {
  display: inline-block;
  padding: 5px 5px;
}

.drag-text-1 {
  display: block;
  padding: 10px 10px;
  background: #D7D7D7;
}

.drag-text-2,
.drag-text-3 {
  display: inline-block;
  padding: 2px 2px;
}

.drag-group-1 {
  display: block;
  margin: 5px 10px;
  min-height: 20px;
}

.drag-group-2 {
  display: inline-block;
  min-height: 20px;
}

.drag-group-3 {
  display: inline-block;
  min-height: 20px;
}

.drag-item-block {
  display: block;
}

.drag-text i {
  cursor: pointer;
}

.buttons {
  display: block;
  float: right;
}

.buttons span {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
