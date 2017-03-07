<template>
  <div class="tag-edit">
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" @click="showInput">标签 +</el-button>

    <el-tag
      class="button-edit-tag"
      v-for="tag in dynamicTags"
      :closable="true"
      :close-transition="true"
      @close="handleClose(tag)"
    >
      <span>
      {{tag.name}}
      </span>
    </el-tag>
  </div>
</template>
<style scoped>
  .tag-edit .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .tag-edit .input-new-tag{
    width: 78px;
    border-radius: 18px;
    margin-right: 10px;
  }
  .tag-edit .button-new-tag{
    width: 78px;
    border-radius: 18px;
    margin-right: 10px;
  }

  .tag-edit .button-edit-tag{
    border-radius: 18px;
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
  }
</style>
<script>
  export default{
    data () {
      return {
        form: {},
        dynamicTags: [{name: '标签一'}, {name: '标签二'}, {name: '标签三'}],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },

      showInput () {
        this.inputVisible = true
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.dynamicTags.unshift({name: inputValue})
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>
