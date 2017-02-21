<template>
  <div>
    <div style="margin: 15px 30px;padding: 8px;background: #fff;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="wifi名称(SSID)">

          <div>
            <el-tag
                    @dblclick.native="handleDblclick(tag)"
                    v-for="tag in dynamicTags"
                    :closable="true"
                    :close-transition="true"
                    @close="handleClose(tag)"
            >
              <span v-if="!tag.editStatus">
              {{tag.name}}
              </span>
              <el-input v-else
                      class="input-edit-tag"
                      v-model="tag.name"
                      size="mini"
                      :autofocus="true"
                      @keyup.enter.native="tag.editStatus = false"
              >
              </el-input>
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>

        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<style>
  .el-tag+.el-tag {
    margin-left: 10px;
    /*margin-bottom: 10px;*/
  }
  .input-new-tag{
    width: 78px;
    margin-left: 10px;
  }
  .button-new-tag{
    margin-left: 10px;
    height: 24px;
    line-height: 22px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-edit-tag input{
    background: #8391a5;
    border: none;
    color: #fff;
  }
</style>
<script>
  import Vue from 'vue'
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
          this.dynamicTags.push({name: inputValue})
        }
        this.inputVisible = false
        this.inputValue = ''
      },

      handleDblclick (tag) {
        Vue.set(tag, 'editStatus', true)
        console.log('handleDblclick')
      }
    }
  }
</script>