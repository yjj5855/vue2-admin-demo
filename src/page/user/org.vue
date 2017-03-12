<template>
  <div class="org-svg">
    <el-tooltip content="点击按钮后，右键另存为可以保存组织架构图" placement="bottom" effect="light">
      <el-button @click="exportImage" style="position: absolute;top: 0;left: 0;">预览图片</el-button>
    </el-tooltip>

    <div id="infovis" :style="{width: width}" style="height: calc(100vh - 130px);"></div>

    <div class="fixed-box" :class="{active: showFixedBox}">
      <i class="el-icon-close fixed-box-close" :class="{active: showFixedBox}" @click="showFixedBox = false"></i>
      <canvas id="canvas"></canvas>
    </div>


    <!--缩放工具-->
    <el-row type="flex" class="zoom-slider" id="zoom-slider" align="middle">
      <i class="el-icon-fa-minus-circle" style="margin-right: 15px;color: #999;"></i>

      <el-slider class="zoom" :min="0.5" :max="1" :step="0.1" v-model="event.scale"></el-slider>

      <i class="el-icon-fa-plus-circle" style="margin-left: 15px;color: #999;"></i>
    </el-row>

  </div>
</template>
<style lang="less">
  .org-svg{
    position: relative;
    margin: 0 -15px;
    .zoom-slider{
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 200px;

      .zoom{
        flex: 1;
      }
    }
    .node {
      cursor: pointer;

      .top-text{
        color: #1ab394;
      }
      .setting,.setting-text{
        display: none;
      }
      .setting-text{
        font: normal normal normal 14px/1 FontAwesome!important;

        &::after{
          content: "\f007"
        }
      }
      .bottom-text{
        display: block;
        font-size: 12px;
      }
      &:hover{
        rect{
          stroke: #1ab394;
        }
        .setting,.setting-text{
          display: block;
        }
        .bottom-text{
          display: none;
        }
      }
    }
    .node circle {
      fill: #fff;
      stroke: steelblue;
      stroke-width: 1px;
    }
    .node text {
      font-size: 13px;
      font-weight: 300;
    }
    .link {
      fill: none;
    }

    #infovis {
      overflow: hidden;
    }

    .fixed-box{
      z-index: 100;
      background: #fff;
      overflow: auto;
      visibility: hidden;
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;

      &.active{
         visibility: visible;
      }
    }
    .fixed-box-close{
      z-index: 101;
      background: #eee;
      padding: 10px;
      visibility: hidden;
      position: fixed;
      top:20px;
      left:20px;
      &.active{
        visibility: visible;
      }
    }
  }

</style>
<script>

  var root = {
    "name": "上海云聚力量网络科技发展投资集团公司",
    "children": [
      {
        "name": "华东大区",
        "children": [
          {
            "name": "上海",
            "children": [{
              "name": "浦东",
              "size": 3938
            }, {
              "name": "黄浦",
              "size": 3812
            }, {
              "name": "长宁",
              "size": 6714
            }, {
              "name": "静安",
              "size": 743
            }]
          }
        ]
      },
      {
        "name": "华北大区",
        "children": [
          {
            "name": "北京",
            "children": [{
              "name": "AgglomerativeCluster",
              "size": 3938
            }, {
              "name": "CommunityStructure",
              "size": 3812
            }, {
              "name": "HierarchicalCluster",
              "size": 6714
            }, {
              "name": "MergeEdge",
              "size": 743
            }]
          }, {
            "name": "天津",
            "children": [{
              "name": "BetweennessCentrality",
              "size": 3534
            }, {
              "name": "LinkDistance",
              "size": 5731
            }, {
              "name": "MaxFlowMinCut",
              "size": 7840
            }, {
              "name": "ShortestPaths",
              "size": 5914
            }, {
              "name": "SpanningTree",
              "size": 3416
            }]
          }, {
            "name": "河北",
            "children": [{
              "name": "AspectRatioBanker",
              "size": 7074
            }]
          }]
      },
      {
        "name": "华南大区",
        "children": []
      },
      {
        "name": "华西大区",
        "children": []
      },
      {
        "name": "西北大区",
        "children": []
      }
    ]
  };

  var svg = null,
      zm = null

  var width = window.innerWidth * 20/24,
      height = window.innerHeight - 110

  var i = 0,
      duration = 750,
      rectW = 140,
      rectH = 70;

  var clickLink = {}

  export default{
    data () {
      return {
        // 自定义svg宽度
        width: '100%',

        event: {
          translate: [(width-rectW)/2, 20],
          scale: 1
        },

        showFixedBox: false
      }
    },
    components: {

    },
    watch: {
      'event.scale' (val) {
        svg.call(zm.scale(val))
        d3.select('#root-g')
          .attr("transform",
            "translate(" + this.event.translate + ")"
            + " scale(" + val + ")");
      },
      'event.translate' (val) {
        svg.call(zm.translate(val))
        d3.select('#root-g')
          .attr("transform",
            "translate(" + val + ")"
            + " scale(" + this.event.scale + ")");
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '组织架构', path: '/user/org'}])
    },
    mounted () {
      this.drawOrgSvg(root)
    },
    methods: {
      exportImage () {
//        this.event = {
//          scale: 0.5,
//          translate: [(width-rectW)/2, 20]
//        }
        // 添加 连线的css
        svg.selectAll('path.link')
          .attr("style", "fill: none;stroke: #ccc;stroke-width: 1px;")
        svg.selectAll('rect.setting,image.setting-text')
          .style("display", "none")

        this.$nextTick(()=>{

          //log: true => 打印log信息
          //ignoreMouse: true => 忽略鼠标事件
          //ignoreAnimation: true => 忽略动画
          //ignoreDimensions: true => 不尝试调整画布
          //ignoreClear: true => 不清除画布
          //offsetX: int => 在×方向上的偏移量
          //offsetY: int => 在y方向上的偏移量
          //scaleWidth: int => 当前绘图的缩放宽度
          //scaleHeight: int => 当前绘图的缩放高度
          //renderCallback: function => 第一次渲染完成后将调用的回调函数
          //forceRedraw: function => 如果返回真，会在每个frame里调用这个函数，然后重绘
          //useCORS: true => 是否允许跨域，如果是，则尝试用跨域图片，这样可以不用污染canvas
          canvg('canvas', `<svg width="${width}" height="${height}">${document.querySelector('#root-svg').innerHTML}</svg>`,{
            scaleWidth: 6000,
            scaleHeight: 6000 * height/width,
            renderCallback: () => {
              console.log('画好了')

              this.showFixedBox = true

//              setTimeout(()=>{
//                window.html2canvas(document.querySelector("#canvas"), {
//                  allowTaint: true,
//                  onrendered: function (canvas) {
//                    var url = canvas.toDataURL()
//
//                    // 以下代码为下载此图片功能
//                    var triggerDownload = document.createElement('a')
//                    triggerDownload.setAttribute('href', url)
//                    triggerDownload.setAttribute('download', '组织架构.png')
//
//                    document.body.appendChild(triggerDownload)
//                    triggerDownload.click()
//                    triggerDownload.remove()
//                  }
//                })
//              }, 20000)

            }
          })

          svg.selectAll('path.link')
            .attr("style", "")
          svg.selectAll('rect.setting,image.setting-text')
            .style("display", "")


        })
      },
      drawOrgSvg (root) {
        let self = this
        var tree = d3.layout.tree().nodeSize([250, 80]);
        var diagonal = d3.svg.diagonal()
          .projection(function (d) {
            return [d.x + rectW / 2, d.y + rectH / 2];
          });


        svg = d3.select("#infovis").append("svg").attr("id", 'root-svg').attr("width", width).attr("height", height)
          .call(zm = d3.behavior.zoom().scaleExtent([0.5,1]).on("zoom", redraw)).append("g")
          .attr('id', 'root-g')
          .attr("transform", "translate(" + (width-rectW)/2 + "," + 20 + ")");

        //necessary so that zoom knows where to zoom and unzoom from
        zm.translate([(width-rectW)/2, 20]);

        root.x0 = 0;
        root.y0 = height / 2;

        root.children.forEach(toggleAll) // 显示第2层

//      for(let i1=0; i1< root.children.length ; i1++){
//        toggle(root.children[i1]) // 显示第3层
//        for(let i2=0; i2< root.children[i1].children.length ; i2++){
//          toggle(root.children[i1].children[i2]) // 显示第4层
//        }
//      }

        update(root)

        function toggle(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
        }

        function toggleAll(d) {
          if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
          }
        }

        function update(source) {

          // Compute the new tree layout.
          var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

          // Normalize for fixed-depth.
          nodes.forEach(function (d) {
            d.y = d.depth * 150;
          });

          // Update the nodes…
          var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
              return d.id || (d.id = ++i);
            });

          // Enter any new nodes at the parent's previous position.
          var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
              return "translate(" + source.x0 + "," + source.y0 + ")";
            })
            .on("click", click);

          // 外边框
          nodeEnter.append("rect")
            .attr('rx', 5)
            .attr('x', autoX)
            .attr("width", autoWidth)
            .attr("height", rectH)
            .attr("stroke", '#cccccc')
            .attr("stroke-width", 1)
            .style("fill", "#fff");

          // 分隔线
          nodeEnter.append("path")
            .attr('x', autoX)
            .attr('y', rectH / 2)
            .attr("stroke", '#cccccc')
            .attr("stroke-width", 1)
            .attr("d", function (d) {
              return `M${autoX(d)+10},${rectH/2}L${autoX(d)+autoWidth(d)-10},${rectH/2}`
            })

          // hover 矩形元素
          nodeEnter.append("rect")
            .attr('rx', 1)
            .attr('ry', 5)
            .attr("class", "setting")
            .attr('x', autoX)
            .attr("width", autoWidth)
            .attr("height", rectH / 2)
            .attr("y", rectH / 2)
            .attr("stroke", "#cccccc")
            .attr("stroke-width", 1)
            .style("fill", "#1ab394")

          // hover 下的 右边按钮
          nodeEnter.append('image')
            .attr("class", "setting-text")
            .attr('x', function (d) {
              return autoX(d) + autoWidth(d) - rectH / 3 - 10
            })
            .attr("y", rectH / 1.75)
            .attr("width", rectH / 3)
            .attr("height", rectH / 3)
            .attr('xlink:href', 'http://www.zhangxinxu.com/study/image/svg/svg.png')
            .on('click', function (d) {
              d3.event.stopPropagation()
              self.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                callback: action => {
                  self.$message({
                    type: 'info',
                    message: `action: ${ action }`
                  });
                }
              });
            })

          // hover 下的 左边按钮
          nodeEnter.append('image')
            .attr("class", "setting-text")
            .attr('x', function (d) {
              return autoX(d) + autoWidth(d) - rectH / 3 * 2 - 10 * 2
            })
            .attr("y", rectH / 1.75)
            .attr("width", rectH / 3)
            .attr("height", rectH / 3)
            .attr('xlink:href', 'http://www.zhangxinxu.com/study/image/svg/svg.png')
            .on('click', function (d) {
              console.log(d)
            })


          // 顶部 名称
          nodeEnter.append("text")
            .attr("x", rectW / 2)
            .attr("y", 24)
            .attr("style", "font-size: 13px;font-weight: 300")
            .attr("stroke", "#1ab394")
            .attr("text-anchor", "middle")
            .text(function (d) {
              return d.name;
            });

          // 底部 右侧
          nodeEnter.append("text")
            .attr("class", "bottom-text")
            .attr("x", function (d) {
              return autoX(d) + autoWidth(d) - 10
            })
            .attr("y", rectH - 17.5 )
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("style", "font-size: 13px;font-weight: 300")
            .text(function (d) {
              return '3000人数'
            })

          // 底部 左侧
          nodeEnter.append("text")
            .attr("class", "bottom-text")
            .attr("x", function (d) {
              return autoX(d) + 10
            })
            .attr("y", rectH - 17.5 )
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .attr("style", "font-size: 13px;font-weight: 300")
            .text(function (d) {
              return '121家公司'
            })


          // Transition nodes to their new position.
          var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });

          nodeUpdate.select("rect")
            .attr('x', autoX)
            .attr("width", autoWidth)
            .attr("height", rectH)
            .attr("stroke", "#cccccc")
            .attr("stroke-width", 1)
            .style("fill", "#fff");

          nodeUpdate.select("text")
            .style("fill-opacity", 1);

          // Transition exiting nodes to the parent's new position.
          var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
              return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

          nodeExit.select("rect")
            .attr('x', autoX)
            .attr("width", autoWidth)
            .attr("height", rectH)
            .attr("stroke", "#cccccc")
            .attr("stroke-width", 1);

          nodeExit.select("text");

          // Update the links…
          var link = svg.selectAll("path.link")
            .data(links, function (d) {
              return d.target.id;
            });

          // Enter any new links at the parent's previous position.
          link.enter().insert("path", "g")
            .attr("class", function (d) {
              if(d.source.link){
                d.target.link = d.source.link + `.link_${d.source.id}_${d.target.id}|`
              }else{
                d.target.link = `.link_${d.source.id}_${d.target.id}|`
              }
              return `link link_${d.source.id}_${d.target.id}`;
            })
            .attr("x", rectW / 2)
            .attr("y", rectH / 2)
            .attr('stroke', '#cccccc')
            .attr('stroke-width', '1px')
            .attr("d", function (d) {
              var o = {
                x: source.x0,
                y: source.y0
              };
              var newD = diagonal({
                source: o,
                target: o
              })
              return newD.replace('C', 'L')
            })

          // Transition links to their new position.
          link.transition()
            .duration(duration)
            .attr("d", function (d) {
              return diagonal(d).replace('C', 'L')
            });

          // Transition exiting nodes to the parent's new position.
          link.exit().transition()
            .duration(duration)
            .attr('stroke', '#cccccc')
            .attr('stroke-width', '1px')
            .attr("d", function (d) {
              var o = {
                x: source.x,
                y: source.y
              };
              var newD = diagonal({
                source: o,
                target: o
              }).replace('C', 'L')
              return newD
            })
            .remove();

          // Stash the old positions for transition.
          nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
        }

        function autoWidth(d) {
          if(d.name && d.name.length > 10){
            return Math.min(240, rectW + (d.name.length - 10)*13)
          }
          return rectW
        }

        function autoX(d) {
          if(d.name && d.name.length > 10){
            return Math.max(-50, -((d.name.length - 10)*13) /2)
          }
          return 0
        }

        // Toggle children on click.
        function click(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);

          if(d.parent){
            svg.selectAll('path.link')
              .attr('stroke', '#ccc')
              .attr('stroke-width', '1px')

            let linkList = d.link.split('|') || [];
            let select = linkList.join(',');

            svg.selectAll(select.substr(0, select.length-1))
              .attr('stroke', '#1ab394')
              .attr('stroke-width', '2px')

          }
        }

        //Redraw for zoom
        function redraw() {
          self.event = d3.event
          svg.attr("transform",
            "translate(" + d3.event.translate + ")"
            + " scale(" + d3.event.scale + ")");
        }
      }
    }
  }
</script>
