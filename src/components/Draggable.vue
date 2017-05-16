<template>
  <draggable class="drag" :lists="lists" :options="{group:'organization'}">
    <!--<transition-group :key="">-->
      <div>{{lists.name}}</div>
      <div class="dragLevel2" v-for="dragModel in lists.list" :dragModel="dragModel" :key="">
        <draggable :options="{group:'organization'}">
          {{dragModel.name}}
          <div class="dragLevel2" v-for="dragModel2 in dragModel.list" :dragModel2="dragModel2">
            <draggable :options="{group:'organization'}">
              {{dragModel2.name}}
              <div class="dragLevel3" v-for="dragModel3 in dragModel2.list" :dragModel3="dragModel3">
                {{dragModel3.name}}
              </div>
            </draggable>
          </div>
        </draggable>
      </div>
    <!--</transition-group>-->
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

function ge(str1, len1, str2, len2, str3, len3) {
  const out = {
    name: 'root',
    list: [],
  };

  for (let i = 0; i < len1; i++) {
    const organization = {
      name: `${str1}-${i}`,
      list: [],
    };
    for (let j = 0; j < len2; j++) {
      const people = {
        name: `${str1}-${i}-${str2}-${j}`,
        list: [],
      };
      for (let k = 0; k < len3; k++) {
        const item = {
          name: `${str1}-${i}-${str2}-${j}-${str2}-${k}`,
        };
        people.list.push(item);
      }
      organization.list.push(people);
    }
    out.list.push(organization);
  }
  return out;
}
const groupStr = ['一级', '二级', '三级'];
const lists = ge(groupStr[0], 3, groupStr[1], 3, groupStr[2], 3);

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
    add() { this.list.push({ name: 'Juan' }); },
    replace() { this.list = [{ name: 'Edgard' }]; },
  },
};

</script>

<style>
.normal {
  background-color: grey;
}

.drag {
  min-height: 100px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #666;
  background: #4285F4;
  cursor: move;
}

.dragLevel1 {
  display: inline-block;
  min-height: 30px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  background: #EA4335;
  cursor: move;
}

.dragLevel2 {
  display: inline-block;
  min-height: 30px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  background: #34A853;
  cursor: move;
}

.dragLevel3 {
  display: inline-block;
  min-height: 30px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  background: #FBBC05;
  cursor: move;
}
</style>
