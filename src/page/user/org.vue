<template>
  <div class="org-svg">

    <div id="infovis" style="width: 100%;height: 100vh;"></div>



    <el-row type="flex" class="zoom-slider" id="zoom-slider">
      <i class="el-icon-fa-minus-square-o" style="margin-right: 15px;font-size: 36px;"></i>

      <el-slider class="zoom" :min="0.5" :max="3" :step="0.1" v-model="event.scale"></el-slider>

      <i class="el-icon-fa-plus-square-o" style="margin-left: 15px;font-size: 16px;"></i>
    </el-row>

  </div>
</template>
<style lang="less">
  .org-svg{
    position: relative;
    .zoom-slider{
      position: absolute;
      bottom: 50px;
      right: 50px;
      width: 300px;

      .zoom{
        flex: 1;
      }
    }
    .node {
      cursor: pointer;

      .top-text{
        color: #1ab394;
      }
      .setting{
        display: none;
      }
      .bottom-text{
        display: block;
        font-size: 12px;
      }
      &:hover{
        .setting{
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
  var zm = null
  var svg = null

  var width = window.innerWidth * 20/24,
    height = window.innerHeight

  var root = {
    "name": "上海云聚力量网络科技发展投资集团公司",
    "children": [
      {
        "name": "华东大区",
        "children": []
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

      function collapse(d) {
        if (d.children) {
          d._children = d.children;
          d._children.forEach(collapse);
          d.children = null;
        }
      }

      root.children.forEach(collapse);
      update(root);

//      d3.select("#body").style("height", "800px");

      function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
          d.y = d.depth * 180;
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
          .style("fill", "#1ab394");

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
            return newD
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
