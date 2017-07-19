# vdrag

> 拖拽分组排序组件

## 功能

- 任意层级
- 自定义分组规则
- 默认固定

## 依赖

- [Sortable.js](https://github.com/RubaXa/Sortable)
- [Vue](https://cn.vuejs.org/)

## 链接

- [文档](https://gitjcc.github.io/vdrag/)

## 快速开始

通过 script 标签引入 js 文件

```html
<script src="vue.js"></script>
<script src="vdrag.js"></script>
```

HTML DOM 节点

```html
<div id="app">
    <x-drag :model="objData" :options="options" :fn="fn"></x-drag>
</div>
```

JavaScript 代码

```javascript
//  将原始数据处理成约定的格式

var tree = {
  id: 0, // ID, 必需。
  text: 根元素, // 显示的文本
  level: 0, // 层级, 必需。
  checkbox: true, // 是否显示复选框
  checked: true, // 是否被选中
  button: true, // 是否显示全选、展开按钮
  expand: true, // 是否展开
  fixed: false, // 影响自身，是否固定、不可拖动。
  parent: parent, // 父元素对象
  group: {
    name: 'freedom', // String 分组名称
    pull: true, // true|false|'clone'|function 是否允许拖出
    put: true, // true|false|["foo", "bar"]|function 是否允许拖入
  } // 影响子元素
  children: [{
    // child
  },{
    // child
  },{
    // child
  },{
    // child
  }], // 子元素对象数组，相同格式
}

//  根据数据渲染组件
var app = new Vue({
  el: '#app',
  data: function() {
    return {
      objData: tree,
      options: {},
      fn: {
        onCheck: function name(itemId, checked) {
          ajax_request('<?php echo $this->genurl('
            use ') ?>', { id: itemId, is_use: checked ? 1 : 0 },
            function() {
              Tip('操作成功');
            });
          return true;
        },
        onMove: function name(relatedContext, draggedContext) {
          //  console.log('onMove', relatedContext, draggedContext);
          return true;
        },
        onSort: function name(groupId, childrenIds, itemId) {
          //  console.log('onSort', groupId, childrenIds, itemId);
          return true;
        },
        onAdd: function name(groupId, childrenIds, itemId) {
          ajax_request('<?php echo $this->genurl('
            sortBatch ') ?>', { op: 'add', group_id: groupId, children_ids: childrenIds.join(','), item_id: itemId },
            function() {
              Tip('操作成功');
            });
          return true;
        },
        onRemove: function name(groupId, childrenIds, itemId) {
          console.log('onRemove', groupId, childrenIds, itemId);
          return true;
        },
        onUpdate: function name(groupId, childrenIds, itemId) {
          ajax_request('<?php echo $this->genurl('
            sortBatch ') ?>', { op: 'update', group_id: groupId, children_ids: childrenIds.join(','), item_id: itemId },
            function() {
              Tip('操作成功');
            });
          return true;
        },
      },
    };
  }
});
```
