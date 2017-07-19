# vdrag

基于 vue 的**拖拽**组件。

## 特性

- 层级：树型结构的数据
- 展开：显示/隐藏子元素
- 选中：选中元素
- 固定：使元素不可拖动，优先级高于分组规则。
- 拖拽/分组规则
  - name: **分组名称**，String
  - pull: **是否允许拖出**
    - true: 允许拖出
    - false: 不允许拖出
    - Function: 由函数返回值确定
  - put: **是否允许拖入**
    - true: 允许拖入
    - false: 不允许拖入
    - ["foo", "bar"]: 允许来自分组名称为 'foo' 和 'bar' 的元素拖入
    - Function: 由函数返回值确定
- 回调
  - onCheck: 响应**选中/取消**事件。传递 2 个参数
    - itemId (元素 ID，Number)
    - checked (选中状态，Bealoon)
  - onMove: 响应**拖拽移动**事件。传递 2 个参数
    - relatedContext (目前相对的元素，element)
    - draggedContext (被拖动的元素，element)
  - onSort: 响应**所有的 add、remove、update** 事件。传递 3 个参数
    - groupId ( 元素的父元素，即所在组的 ID )
    - childrenIds ( 元素的兄弟元素，即所在组的所有子元素 ID 的数组 )
    - itemId ( 被拖动元素的 ID )
  - onAdd: 响应**分组中增加元素**事件。传递 3 个参数
    - groupId ( 元素的父元素，即所在组的 ID )
    - childrenIds ( 元素的兄弟元素，即所在组的所有子元素 ID 的数组 )
    - itemId ( 被增加元素的 ID ) }
  - onRemove: 响应**分组中移除元素**事件，传递 3 个参数
    - groupId ( 元素的父元素，即所在组的 ID )
    - childrenIds ( 元素的兄弟元素，即所在组的所有子元素 ID 的数组 )
    - itemId ( 被移除元素的 ID )
  - onUpdate: 响应**分组内排序**事件，传递 3 个参数
    - groupId ( 元素的父元素，即所在组的 ID )
    - childrenIds ( 元素的兄弟元素，即所在组的所有子元素 ID 的数组 )
    - itemId ( 被拖动元素的 ID )

## 开始

### 通过 script 标签引入 js 文件

```html
<script src="vue.js"></script>
<script src="vdrag.js"></script>
```

### HTML DOM 节点

```html
<div id="app">
    <x-drag :model="objData" :options="options" :fn="fn"></x-drag>
</div>
```

### JavaScript 代码

```javascript
//  根据需求，将原始数据处理成约定的格式

var tree = {
  id: 0, // ID, 必需。
  text: 根元素, // 显示的文本, 必需。
  level: 0, // 层级, 必需。
  checkbox: true, // 是否显示复选框
  checked: true, // 是否被选中
  button: true, // 是否显示全选、展开按钮
  expand: true, // 是否展开
  fixed: false, // 是否固定(不可拖动)，影响自身。
  parent: parent, // 父元素对象, 除根元素外必需。
  group: {
    name: 'freedom', // String 分组名称
    pull: true, // true|false|'clone'|function 是否允许拖出
    put: true, // true|false|["foo", "bar"]|function 是否允许拖入
  } // 拖出拖入规则，影响子元素
  children: [{
    // child
  },{
    // child
  },{
    // child
  },{
    // child
  }], // 子元素对象数组，格式相同
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

## 链接

[group 设置，普通用法](http://jsbin.com/naduvo/edit?js,output)
[group 设置，使用函数](http://jsbin.com/rusuvot/edit?js,output)

## License

MIT
