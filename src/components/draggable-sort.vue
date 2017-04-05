<template>
  <el-dialog title="排序" v-model="showSort">
    <div class="draggable-box">
      <div class="box-header">
        <div class="box-header__title">显示的字段</div>
      </div>
      <draggable v-model="showModel" :options="{group:'people', chosenClass: 'sortable-chosen',dragClass: 'sortable-drag'}">
        <el-tag type="primary" class="item" v-for="item in showModel">
          <div>{{item.label}}</div>
        </el-tag>
        <div style="min-height: 24px;width: 100px;display: inline-block">&nbsp;</div>
      </draggable>

      <div class="white-space"></div>
      <div class="white-space"></div>

      <div class="box-header">
        <div class="box-header__title">隐藏的字段</div>
      </div>
      <draggable v-model="hideModel" :options="{group:'people', chosenClass: 'sortable-chosen',dragClass: 'sortable-drag'}">
        <el-tag type="danger" class="item" v-for="item in hideModel" >
          <div>{{item.label}}</div>
        </el-tag>
        <div style="min-height: 24px;width: 100px;display: inline-block">&nbsp;</div>
      </draggable>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="showSort = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
  </span>
  </el-dialog>
</template>
<style scoped>
  .draggable-box{

  }
  .sortable-chosen{
    /*background: #11b95c;*/
  }
  .sortable-drag{
    /*background: #11b95c;*/
  }
  .box-header{
    margin-bottom: 15px;
  }
  .box-header__title{
    line-height: 50px;
  }
  .item+.item{
    margin-left: 15px;
  }
  .item div{
    display: inline-block;
    text-align: center;
  }
</style>
<script>
  import draggable from 'vuedraggable'
  export default{
    props: {
      value: {
        type: Array,
        default: []
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showModel: [],
        hideModel: []
      }
    },
    computed: {
      valueModel: {
        get: function () {
          return this.value
        },
        set: function (val) {
          this.$emit('input', val)
        }
      },
      showSort: {
        get: function () {
          return this.show
        },
        set: function (val) {
          this.$emit('show', val)
        }
      }
    },
    components: {
      draggable
    },
    created () {
      this.$set(this, 'showModel', this.valueModel.filter(item => {
        return item.show
      }))
      this.$set(this, 'hideModel', this.valueModel.filter(item => {
        return !item.show
      }))
    },
    methods: {
      submit () {
        let newShowModel = this.showModel.map(item => {
          return {
            ...item,
            show: true
          }
        })
        let newhideModel = this.hideModel.map(item => {
          return {
            ...item,
            show: false
          }
        })
        this.$emit('input', [...newShowModel, ...newhideModel])
        this.showSort = false
      }
    }
  }
</script>
