<template>
  <div class="drag">
    <div v-model="lists">{{lists.name}}</div>
    <draggable class="draggable" v-model="lists" :options="{group:lists.group}" @start="isDragging=true" @end="isDragging=false">
      <div class="dragLevel1 " v-for="aaa in lists.children">
        <div>
          {{aaa.name}}
          <div class="buttons">
            <span class="button" v-if="aaa.checked" @click="changeAll(aaa,false)">取消全选</span>
            <span class="button" v-else @click="changeAll(aaa,true)">全选</span>
            <span class="button" v-if="aaa.expand" @click="expand(aaa,false)">收起</span>
            <span class="button" v-else @click="expand(aaa,true)">展开</span>
          </div>
        </div>
        <draggable class="draggable" v-show="aaa.expand" :options="{group: aaa.group}" @start="isDragging=true" @end="isDragging=false">
          <div class="dragLevel2" v-for="bbb in aaa.children">
            {{bbb.name}}
            <div class="buttons">
              <span class="button" v-if="bbb.checked" @click="changeAll(bbb,false)">取消全选</span>
              <span class="button" v-else @click="changeAll(bbb,true)">全选</span>
              <span class="button" v-if="bbb.expand" @click="expand(bbb,false)">收起</span>
              <span class="button" v-else @click="expand(bbb,true)">展开</span>
            </div>
            <draggable class="draggable" v-show="bbb.expand" :options="{group:bbb.group}" @start="isDragging=true" @end="isDragging=false">
              <div class="dragItem" v-for="ccc in bbb.children" :class="ccc.style">
                <span>
                  <i class="drag-item-checkbox fa" :class="ccc.checked ? 'fa-check-square-o' : 'fa-square-o'" @click="checkItem(ccc)"></i>
                  {{ccc.name}}
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

function geItem(parent, name, group, style) {
  return {
    name: name,
    checked: true,
    expand: true,
    group: group,
    level: parent.level + 1,
    children: [],
    parent: parent,
    style: style,
  };
}

function ge(str1, len1, str2, len2, str3, len3) {
  const out = {
    name: 'root',
    checked: true,
    expand: true,
    level: 0,
    children: [],
    parent: null,
    group: { name: 'root', pull: true, put: true },
  };

  for (let i = 0; i < len1; i++) {
    const aaaa = geItem(out, `${str1}-${i}`, { name: 'aaaaaa', pull: true, put: ['aaaaaa'] });
    for (let j = 0; j < len2; j++) {
      let bbbb;
      if (j === 2) {
        bbbb = geItem(aaaa, `${str2}-${i}-${j}`, { name: 'bbbbbb', pull: false, put: false });
      } else {
        bbbb = geItem(aaaa, `${str2}-${i}-${j}`, { name: 'bbbbbb', pull: true, put: ['bbbbbb'] });
      }
      for (let k = 0; k < len3; k++) {
        let cccc;
        if (k < 6) {
          cccc = geItem(bbbb, `${str3}-${i}-${j}-${k}`);
        } else {
          cccc = geItem(bbbb, `${str3}-${i}-${j}-${k}`, null, 'drag-item-block');
        }
        bbbb.children.push(cccc);
      }
      aaaa.children.push(bbbb);
    }
    out.children.push(aaaa);
  }
  return out;
}

const groupStr = ['官方字段库', '家庭基本情况', '政治面貌'];
const lists = ge(groupStr[0], 3, groupStr[1], 3, groupStr[2], 9);
console.log(lists);

export default {
  name: 'x-draggable',
  components: {
    draggable,
  },
  data() {
    return {
      lists,
    };
  },
  methods: {
    checkItem(zzz) {
      zzz.checked = !zzz.checked;
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
.normal {
  background-color: grey;
}

.fa {
  font-size: 14px;
  width: 14px;
  color: #333;
}

.drag {
  display: block;
  min-height: 100px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #666;
}

.draggable {
  display: block;
  min-height: 30px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  /*background: #EA4335;*/
  cursor: move;
}

.dragItem {
  display: inline-block;
  transition: transform 1s;
  min-height: 20px;
  margin: 10px;
  padding: 5px 10px;
  border: 1px solid #666;
  background: #4285F4;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.drag-item-block {
  display: block;
}

.drag-item-checkbox {
  cursor: pointer;
}

.dragLevel1 {
  display: block;
  min-height: 30px;
  margin: 10px;
  padding: 10px;
  /*border: 1px solid #ccc;*/
  background: #EA4335;
  cursor: move;
}

.dragLevel2 {
  display: block;
  min-height: 30px;
  margin: 10px;
  padding: 10px;
  /*border: 1px solid #ccc;*/
  background: #34A853;
  cursor: move;
}

.dragLevel3 {
  display: inline-block;
  min-height: 30px;
  margin: 10px;
  padding: 10px;
  /*border: 1px solid #ccc;*/
  background: #FBBC05;
  cursor: move;
}

.buttons {
  display: block;
  float: right;
}

.button {
  padding: 5px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
