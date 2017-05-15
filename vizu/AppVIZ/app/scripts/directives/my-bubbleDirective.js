/**
 * Created by moh on 05/04/17.
 */
'use strict';
angular.module('projSemApp').directive('myBubbleDirective', function(){
  function link(scope, el, attr){

    var width=652;
    var height=450;
    var canvas=d3.select(el[0])
                  .append("svg")
                  .attr("width",width)
                  .attr("height",height)
                  .append("g")
                  .attr("transform","translate(0,0)");

    var defs= canvas.append("defs") ;


    //scale qui va gerer les rayons des BUBBLES
    var radiusSCL=d3.scaleSqrt().domain([1600,5000]).range([30,80]);
        //injection des données du controller dans la directive
    scope.$watch('data', function(data){

      if(!data){ return; }

      var simulation=d3.forceSimulation()
        .force("x",d3.forceX(width/2).strength(0.05))
        .force("y",d3.forceY(height/2).strength(0.05))
        .force("collide",d3.forceCollide(function (d){return radiusSCL(d.NumberOfWords)+10;}));

      var circles=canvas.selectAll(".circle_language")
        .data(data)
        .enter()
        .append("circle")
        .attr("class","circle_language")
        .attr("r",function (d){return radiusSCL(d.NumberOfWords);})
        .attr("fill",function(d){return "url(#"+ d.Name +")"})
        .attr("stroke","grey").attr("stroke-width",2)
        .on("click",function (d) {
          if(d.isClicked){d3.select(this).attr("stroke","grey").attr("stroke-width",2);d.isClicked=false;}
        else{d3.select(this).attr("stroke","grey").attr("stroke-width",4);d.isClicked=true;};
          scope.handleClick({lang: d.Name});});

      defs.selectAll(".lgge_pattern")
        .data(data)
        .enter()
        .append("pattern")
        .attr("class","lgge_pattern")
        .attr("id",function(d){return d.Name;})
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("opacity","0.5")
        .attr("xlink:href",function(d){  return d.img_path;});

      simulation.nodes(data)
        .on('tick',ticked);

      function ticked(){
        circles
          .attr("cx",function(d){return d.x;})
          .attr("cy",function(d){return d.y;});
      }


    }, true);
  }
  return {
    link: link,
    restrict: 'E',
    scope: {
      data: '=' ,
      handleClick:'&',
    }
  };
});/**
 * Created by moh on 05/04/17.
 */
