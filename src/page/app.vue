<template>
    <div style="background: #f0f3f3;">
      <transition name="top" appear v-if="!destroy">
        <common-header/>
      </transition>
      <el-row>
        <transition name="left" appear v-if="!destroy">
          <el-col :span="4">
            <common-menu/>
          </el-col>
        </transition>

        <transition name="right" appear v-if="!destroy">
          <el-col :span="20" class="page-content">
            <router-view></router-view>
          </el-col>
        </transition>
      </el-row>
    </div>
</template>
<style scoped>
  .page-content{
    padding: 20px;
  }

  .top-enter-active {
    animation: top-in .5s;
  }
  .top-leave-active {
    animation: top-out .5s;
  }
  @keyframes top-in {
    0% {
      transform: translateY(-100px)
    }
    100% {
      transform: translateY(0)
    }
  }
  @keyframes top-out {
    0% {
      transform: translateY(0)
    }
    100% {
      transform: translateY(-100px)
    }
  }

  .left-enter-active {
    animation: left-in .5s;
  }
  .left-leave-active {
    animation: left-out .5s;
  }
  @keyframes left-in {
    0% {
      transform: translateX(-260px)
    }
    100% {
      transform: translateX(0)
    }
  }
  @keyframes left-out {
    0% {
      transform: translateX(0)
    }
    100% {
      transform: translateX(-260px)
    }
  }

  .right-enter-active {
    animation: right-in .5s;
  }
  .right-leave-active {
    animation: right-out .5s;
  }
  @keyframes right-in {
    0% {
      transform: translateY(1200px)
    }
    100% {
      transform: translateY(0)
    }
  }
  @keyframes right-out {
    0% {
      transform: translateY(0)
    }
    100% {
      transform: translateY(1200px)
    }
  }

</style>
<script>
  import CommonHeader from '../components/common-header.vue'
  import CommonMenu from '../components/common-menu.vue'
  export default{
    data () {
      return {
        msg: 'hello vue',
        destroy: false
      }
    },
    components: {
      CommonHeader,
      CommonMenu
    },
    beforeRouteLeave (to, from, next) {
      this.destroy = true
      setTimeout(() => {
        next()
      }, 100)
    }
  }
</script>
