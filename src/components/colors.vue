<!--  -->
<template>
  <div style="display: inline-block;"> 
       <a
        class="coloritem"
        v-for="(item, index) in colors"
        @click="changeColor(item)"
        :class="{ current: colorIndex == index }"
        :style="{ backgroundColor: item.color }"
        :key="index"
        ><i></i
        ></a>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
        colors: [
        {
          index: 0,
          color: 'black'
        },
        {
          index: 1,
          color: 'green'
        },
        {
          index: 2,
          color: 'rgb(74, 144, 226)'
        }
      ],
      colorIndex: 0,
    }
  },
  created() {},

  methods: {
      changeColor(item){
          this.colorIndex =item.index
          this.$emit('changeColor',item)
      }
  }
}

</script>
<style  lang="scss">
.coloritem{
  position: relative;
  margin: 0 5px;
  display: inline-block;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  &.current i {
    border: 1px solid #bbb;
    }

    i {
        position: absolute;
        top: -3.5px;
        left: -3.5px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
}
</style>