<template>
  <div class="org-svg">
    <div></div>

    <div id="infovis" style="width: 100%;height: 90vh;"></div>


    <!--缩放工具-->
    <el-row type="flex" class="zoom-slider" id="zoom-slider" align="middle">
      <i class="el-icon-fa-minus-circle" style="margin-right: 15px;color: #999;"></i>

      <el-slider class="zoom" :min="0.5" :max="3" :step="0.1" v-model="event.scale"></el-slider>

      <i class="el-icon-fa-plus-circle" style="margin-left: 15px;color: #999;"></i>
    </el-row>

  </div>
</template>
<style lang="less">
  .org-svg{
    position: relative;
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
      stroke: #ccc;
      stroke-width: 1px;
    }

    #infovis {
      overflow: hidden;
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
      height = window.innerHeight


  var i = 0,
      duration = 750,
      rectW = 140,
      rectH = 70;

  var tree = d3.layout.tree().nodeSize([250, 80]);
  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
      return [d.x + rectW / 2, d.y + rectH / 2];
    });

  export default{
    data () {
      return {
        event: {
          translate: [(width-rectW)/2, 20],
          scale: 1
        }
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
      }
    },
    created () {
      this.$store.commit('UPDATE_BREADCRUMB', [{name: '班步', path: '/'}, {name: '人员信息', path: '/user'}, {name: '组织架构', path: '/user/org'}])
    },
    mounted () {
      let self = this



      svg = d3.select("#infovis").append("svg").attr("width", width).attr("height", height)
        .call(zm = d3.behavior.zoom().scaleExtent([0.5,3]).on("zoom", redraw)).append("g")
        .attr('id', 'root-g')
        .attr("transform", "translate(" + (width-rectW)/2 + "," + 20 + ")");

      //necessary so that zoom knows where to zoom and unzoom from
      zm.translate([(width-rectW)/2, 20]);

      root.x0 = 0;
      root.y0 = height / 2;

      // Toggle children.
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

      root.children.forEach(toggleAll) // 显示第2层

//      for(let i1=0; i1< root.children.length ; i1++){
//        toggle(root.children[i1]) // 显示第3层
//        for(let i2=0; i2< root.children[i1].children.length ; i2++){
//          toggle(root.children[i1].children[i2]) // 显示第4层
//        }
//      }

      update(root)


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
          .attr("stroke", '#999999')
          .attr("stroke-width", 1)
          .style("fill", "#fff");

        // hover 矩形元素
        nodeEnter.append("rect")
          .attr('rx', 1)
          .attr('ry', 5)
          .attr("class", "setting")
          .attr('x', autoX)
          .attr("width", autoWidth)
          .attr("height", rectH / 2)
          .attr("y", rectH / 2)
          .attr("stroke", "#999999")
          .attr("stroke-width", 1)
          .style("fill", "#1ab394")

        // hover 下的 设置按钮
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
//          .attr("dy", ".35em")
          .attr("stroke", "#1ab394")
          .attr("text-anchor", "middle")
          .text(function (d) {
            return d.name;
          });

        // 底部 右侧
        nodeEnter.append("text")
          .attr("class", "bottom-text")
          .attr("x", rectW - 10)
          .attr("y", rectH - 17.5 )
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .text(function (d) {
            return '3000人数'
          })

        // 底部 左侧
        nodeEnter.append("text")
          .attr("class", "bottom-text")
          .attr("x", 10)
          .attr("y", rectH - 17.5 )
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
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
          .attr("stroke", "#999999")
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
          .attr("stroke", "black")
          .attr("stroke-width", 1);

        nodeExit.select("text");

        // Update the links…
        var link = svg.selectAll("path.link")
          .data(links, function (d) {
            return d.target.id;
          });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("x", rectW / 2)
          .attr("y", rectH / 2)
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
      }

      //Redraw for zoom
      function redraw() {
        self.event = d3.event
        svg.attr("transform",
          "translate(" + d3.event.translate + ")"
          + " scale(" + d3.event.scale + ")");
      }
    },
    methods: {

    }
  }
</script>
