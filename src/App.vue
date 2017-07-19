<template>
  <div id="app">
    <img src="./assets/logo.png">
    <x-drag :model="objData" :options="options" :fn="fn"></x-drag>
  </div>
</template>

<script>
import xDrag from './components/xDrag.vue';

let counter = 0;

function newItem(parent, name, group, style) {
  counter = counter + 1;
  const item = {
    id: counter,
    text: name,
    checked: true,
    checkbox: parent.level >= 1,
    expand: true,
    button: parent.level < 1,
    group: group,
    level: parent.level + 1,
    children: [],
    parent: parent,
    style: style,
    fixed: false,
  };
  return item;
}

function ge(str1, len1, str2, len2, str3, len3) {
  const out = {
    text: '官方字段库',
    checkbox: false,
    checked: true,
    expand: true,
    level: 0,
    children: [],
    parent: null,
    style: '',
    group: { name: 'root', pull: true, put: true },
  };

  for (let i = 0; i < len1; i++) {
    const aaaa = newItem(out, `${str1}-${i}`, {
      name: 'aaaaaa',
      pull: function (to, from) {
        // console.log('pull, to', to);
        // console.log('pull, from', from);
        return i % 2 === 0;
      },
      put: function (to, from) {
        // console.log('put, to', to);
        // console.log('put, from', from);
        return i % 2 === 0;
      },
    });
    for (let j = 0; j < len2; j++) {
      let bbbb;
      if (j < 6) {
        bbbb = newItem(aaaa, `${str2}-${i}-${j}`, {
          name: 'bbbbbb',
          pull: true,
          put: true,
        });
      } else {
        bbbb = newItem(aaaa, `${str2}-${i}-${j} : `, { name: 'bbbbbb', pull: false, put: false }, 'drag-item-block');
        for (let k = 0; k < len3; k++) {
          const cccc = newItem(bbbb, `${str3}-${i}-${j}-${k}`);
          bbbb.children.push(cccc);
        }
      }
      aaaa.children.push(bbbb);
    }
    out.children.push(aaaa);
  }
  return out;
}

const groupStr = ['家庭基本情况', '政治面貌', '特殊人群'];
const objData = ge(groupStr[0], 6, groupStr[1], 9, groupStr[2], 3);
console.log(objData);

const fn = {
  onCheck: function name(itemId, checked) {
    console.log('onChecked', itemId, checked);
    return true;
  },
  onMove: function name(relatedContext, draggedContext) {
    console.log('onMove', relatedContext, draggedContext);
    return true;
  },
  onSort: function name(groupId, childrenIds, itemId) {
    console.log('onSort', groupId, childrenIds, itemId);
    return true;
  },
  onAdd: function name(groupId, childrenIds, itemId) {
    console.log('onAdd', groupId, childrenIds, itemId);
    return true;
  },
  onRemove: function name(groupId, childrenIds, itemId) {
    console.log('onRemove', groupId, childrenIds, itemId);
    return true;
  },
  onUpdate: function name(groupId, childrenIds, itemId) {
    console.log('onUpdate', groupId, childrenIds, itemId);
    return true;
  },
};

export default {
  name: 'app',
  components: {
    xDrag,
  },
  data() {
    return {
      objData: objData,
      options: {},
      fn: fn,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 10%;
}

img {
  display: block;
  margin: 1em auto;
  width: 6em;
}
</style>
