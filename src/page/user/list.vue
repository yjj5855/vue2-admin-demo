<template>
  <div class="user-list">
    <div style="margin: 30px 0;background: #fff;">

      <!--第一行筛选条件-->
      <el-form :inline="true" class="form-inline">

        <el-form-item label="部门">
          <el-select  placeholder="请选择">
            <el-option label="部门一" value="1"></el-option>
            <el-option label="部门二" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input  placeholder="请填写" style="width: 194px;"></el-input>
        </el-form-item>

        <el-form-item label="员工状态">
          <el-select  placeholder="请选择">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-popover
          ref="popover1"
          placement="bottom"
          width="400"
          trigger="hover">
          <div style="padding: 10px;text-align: center;">
            <el-tag class="user-tag">标签一</el-tag>
            <el-tag class="user-tag" type="gray">标签二二</el-tag>
            <el-tag class="user-tag" type="primary">标签三三三</el-tag>
            <el-tag class="user-tag" type="success">标签四四四四</el-tag>
            <el-tag class="user-tag" type="warning">标签五</el-tag>
            <el-tag class="user-tag" type="danger">标签六</el-tag>
            <el-tag class="user-tag">标签一</el-tag>
            <el-tag class="user-tag" type="gray">标签二</el-tag>
            <el-tag class="user-tag" type="primary">标签三</el-tag>
            <el-tag class="user-tag" type="success">标签四</el-tag>
            <el-tag class="user-tag" type="warning">标签五</el-tag>
            <el-tag class="user-tag" type="danger">标签六</el-tag>
            <el-tag class="user-tag">标签一</el-tag>
          </div>
        </el-popover>
        <!--搜索-->
        <el-popover
          ref="popover2"
          placement="bottom"
          width="400"
          trigger="click">
          <div style="margin-bottom: 10px;">智能搜索</div>
          <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入任意信息搜索员工"
            @select="handleSelect"
          >
            <template slot="prepend">
              <i class="el-icon-search"></i>
            </template>
          </el-autocomplete>
        </el-popover>
        <el-button class="flex-button" type="primary" :plain="true" icon="fa-tag" style="width: 100%" v-popover:popover1>标签</el-button>
        <el-button class="flex-button" type="primary" :plain="true" icon="search" v-popover:popover2>搜索</el-button>
        <el-button class="flex-button" type="text" @click="showMore = !showMore">更多 <i class="el-icon-arrow-down" :style="{transition: 'transform .3s', transform: `rotate(${showMore?180:0}deg)`}"></i></el-button>
        <el-button class="flex-button" type="primary">查询</el-button>

      </el-form>

      <!--更多筛选条件-->
      <el-form :inline="true" class="form-inline" v-show="showMore">

        <el-form-item label="性别">
          <el-select  placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职务">
          <el-select  placeholder="请选择">
            <el-option label="销售" value="1"></el-option>
            <el-option label="运营" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="在职状态">
          <el-select  placeholder="请选择">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input  placeholder="请填写" style="width: 194px;"></el-input>
        </el-form-item>

      </el-form>

      <div class="white-space"></div>

      <!--布局header-->
      <el-row class="layout-header" type="flex" align="middle">
        <i class="el-icon-fa-list" :class="{active: layout == 'table'}" @click="layout = 'table'"></i>
        <i class="el-icon-fa-address-book-o" :class="{active: layout != 'table'}" @click="layout = ''"></i>
        <el-col style="flex: 1;">
          共 <span v-text="userBase.respData.total"></span> 条记录
        </el-col>
        <i class="el-icon-setting" @click="showSort = !showSort"></i>
      </el-row>

      <!--表格排序组件-->
      <draggable-sort :show="showSort" @show="onSortChange" v-model="tableColumKeyList"/>


      <!--布局body-->
      <el-table
        v-loading="userBase.loading"
        element-loading-text="拼命加载中"
        :data="userBase.respData.list"
        class="no-left-right-border"
        @cell-click="handleCellClick"
        style="width: 100%;margin-bottom: 10px;">

        <!--联系人布局-->
        <template v-if="layout != 'table'">
          <el-table-column
            width="400px"
            label="姓名/性别/工号/部门/职务">
            <template scope="scope">
              <el-row type="flex" style="padding: 10px 0;">
                <img src="" style="width: 50px;height: 50px;border-radius: 50%;margin-right: 10px;"/>
                <el-row style="flex: 1;" align="middle">
                  <el-col :span="12">
                    <div class="first-row-text">李四 男</div>
                    <div class="second-row-text">产品规划部</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="first-row-text">#1511</div>
                    <div class="second-row-text">产品经理</div>
                  </el-col>
                </el-row>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="手机号/QQ号">
            <template scope="scope">
              <div class="first-row-text">15099341234</div>
              <div class="second-row-text">394483223</div>
            </template>
          </el-table-column>
          <el-table-column
            label="座机/微信号">
            <template scope="scope">
              <div class="first-row-text">021-34566323</div>
              <div class="second-row-text">lifew12424324</div>
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱/星座">
            <template scope="scope">
              <div>394483223@qq.com</div>
              <div class="second-row-text">水瓶座</div>
            </template>
          </el-table-column>
        </template>

        <!--表格布局-->
        <template v-if="layout == 'table'">
          <el-table-column
            v-for="item in keyList" :key="item.key"
            :prop="item.key"
            :label="item.label">
          </el-table-column>
        </template>
      </el-table>

      <div class="white-space"></div>

      <el-row type="flex" align="middle" justify="space-between">
        <el-col style="flex:1">
          <el-button type="info">新增员工</el-button>
          <el-button type="success">员工信息导入</el-button>
          <el-button type="success">导出当前结果</el-button>
        </el-col>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userBase.paramsData.currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="userBase.paramsData.pageSize"
          layout="sizes, prev, pager, next"
          :total="userBase.respData.total">
        </el-pagination>
      </el-row>
    </div>

    <!--<choose-box-->
      <!--ref="chooseBox"-->
      <!--:choose-list="['BM', 'YG_STATUS']"-->
      <!--@confirm="chooseEnd">-->
    <!--</choose-box>-->
  </div>
</template>
<style scoped>
  .form-inline{
    display: flex;
    align-content: center;
  }
  .flex-button{
    flex: 1;
    height: 37px;
  }
  .user-tag{
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 20px;
  }
  .layout-header{
    color: #999;
    height: 30px;
    font-size: 14px;
    border-bottom: 1px #eee solid;
  }
  .layout-header>i{
    padding: 8px 5px;
  }
  .layout-header>i.active{
    color: #11b95c;
  }
  .first-row-text{
    color: #474747;
  }
  .second-row-text{
    font-size: 13px;
    color: #999;
  }
  /*.no-left-right-border{*/
    /*border-left: none!important;*/
  /*}*/
  /*.no-left-right-border::after{*/
    /*width: 0!important;*/
  /*}*/
  /*.no-left-right-border th{*/
    /*background: #fff;*/
  /*}*/
</style>
<script>
  import * as mutations from 'store/user/mutation-types'
//  import ChooseBox from 'components/choose-box.vue'
  import DraggableSort from 'components/draggable-sort.vue'

  function ajax (store, params) {
    return store.dispatch('FETCH_LIST_DATA', {
      ...store.state.user.base.paramsData,
      ...params
    })
  }

  export default{
    components: {
      DraggableSort
    },
    data () {
      return {
        // 布局相关
        layout: 'table',
        tableColumKeyList: [
          {key: 'entryDate', label: '时间', show: true},
          {key: 'name', label: '姓名', show: true},
          {key: 'province', label: '省份', show: true},
          {key: 'city', label: '城市', show: true},
          {key: 'address', label: '地址', show: false},
          {key: 'zipCode', label: '邮编', show: false},
          {key: 'userId', label: '用户ID', show: false}
        ],

        // 更多按钮相关
        showMore: false,

        // 智能搜索相关
        restaurants: [],
        state4: '',
        timeout: null,

        // 字段排序显示和隐藏
        showSort: false
      }
    },
    computed: {
      userBase () {
        return this.$store.state.user.base
      },
      keyList () {
        return this.tableColumKeyList.filter(item => item.show)
      }
    },
    watch: {
      tableColumKeyList (val) {
        this.layout = ''
        this.$nextTick(() => {
          this.layout = 'table'
        })
        console.log('tableColumKeyList 改变了', val)
      }
    },
    created () {
      ajax(this.$store)
        .then((data) => {
          console.log(data)
        })
        .catch((err) => {
          console.error(err)
        })
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '花名册', path: '/user/list'}])
    },
    mounted () {
      this.restaurants = this.loadAll()
    },
    methods: {
      handleClick () {
        this.$router.push('/user/base/1')
      },
      handleSizeChange (val) {
        if (this.userBase.paramsData.currentPage * val > this.userBase.respData.total) {
          this.$store.commit(mutations.UPDATE_BASE, {
            paramsData: {
              ...this.$store.state.user.base.paramsData,
              pageSize: val
            }
          })
        } else {
          ajax(this.$store, { pageSize: val })
        }
      },
      handleCurrentChange (val) {
        ajax(this.$store, { currentPage: val })
      },
      chooseEnd (data) {
        ajax(this.$store, { ...data })
      },
      handleIconClick (ev) {
        ajax(this.$store)
      },
      loadAll () {
        return [
          { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
          { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
          { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
          { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
          { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
          { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
          { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
          { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
          { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
          { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
          { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
          { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
          { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
          { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
          { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
          { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
          { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
          { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
          { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
          { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
          { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
          { 'value': '钱记', 'address': '上海市长宁区天山西路' },
          { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
          { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
          { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
          { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
          { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
          { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
          { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
          { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
          { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
          { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
          { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
          { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
          { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
          { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
          { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
          { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
          { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
          { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
          { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
          { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
          { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
          { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
          { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
          { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
          { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
          { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
        ]
      },
      querySearchAsync (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect (item) {
        console.log(item)
      },

      handleCellClick (row, column, cell, event) {
        console.log(row, column, cell, event)
        this.$router.history.push('/user/1')
      },

      onSortChange (val) {
        this.showSort = val
      }
    }
  }
</script>
