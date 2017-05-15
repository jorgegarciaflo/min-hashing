/**
 * Created by moh on 21/04/17.
 */
'use strict';
angular.module('projSemApp').directive('myTopicDirective', function(){
    function link(scope, el, attr){
        var posy=67;
        var rayon = 60;
        var posx = 0 ;

        var canvas = d3.select(el[0])
            .append("svg");


    scope.$watch('data', function(data){

        if(!data){ return; }

        var j= d3.max( data, function(d){return d.id;});
        var h;
        if (j<=8){ h=2.45*rayon;}   else {h= j/8 * 2.45* rayon;}
        var w = 8 *2.25 * rayon;
        console.log(h);

                      canvas.attr("width", w)
                        .attr("height",h);


        var tooltip = d3.select(el[0])
            .append("text")
            .style("position", "absolute")
            .style("z-index", "2")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "12px")
            .style("background-color", "rgba(0, 0, 0, 0.75)")
            .style("border-radius", "6px")
            .style("font", "11px sans-serif")
            .text("tooltip");

        function mymouseoverfunction() {
            d3.select(this)

                .append("text")
                .attr("class","topicname")
                .attr("text-anchor","middle")
                .text(function(d){return "Topic" + " "+d.id})

                .attr("fill", "red")
                .attr("font-family", "sans-serif")
                .attr("font-size", "26px");
            d3.select(this).selectAll("text.word").attr("opacity",.1);
            d3.select(this).select("circle").attr("stroke-width",4)
                .attr("r",rayon + 5)
                .attr("fill", "#495CFF")
                .style("fill-opacity", .5)
                .attr("stroke","red")
                .on("mouseover",function(d) {
                    tooltip.text("The Topic contains : "+ d.words.length +" words" );
                    tooltip.style("visibility", "visible");});


        }


        function mymouseoutfunction(){
            d3.select("text.topicname").remove();
            d3.select(this).selectAll("text.word").attr("opacity",1);
            d3.select(this).select("circle")
                .on("mouseout", function(){return tooltip.style("visibility", "hidden");})

                .attr("stroke-width",2)
                .attr("stroke","black")
                .attr("r",rayon)
                .attr("fill", "#DCDCDC")
                .style("fill-opacity", .5)
            ;
        }

        var groupe = canvas.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform",  function(d)
                {
                    if (d.id%8 != 0 ){
                        posx=(d.id%8)*2.1 * rayon;

                    }
                    else if(d.id % 8 == 0 ){
                        posx=8* 2.1 * rayon;
                        //return posx;
                    }

                    if ((d.id) == 1)
                    {
                        posy = posy ;
                    } else if ((d.id)  % 8 == 1){
                        posy = posy + 2.1* rayon;
                    };

                    return "translate ("+posx+","+posy+")";}
            )
            .attr("width",120)
            .attr("height",120)
            .on("mouseout",mymouseoutfunction)
            .on("mousemove", function() {return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseover",mymouseoverfunction)
                .append("a")
                .attr("xlink:href",function (d) {return  "#!/words/"+d.id;});


        var cercles = groupe.append("circle")
            .attr ("r",rayon)
            .attr("fill", "#DCDCDC")
            .style("fill-opacity", .5)
            .style("opacity", function(d){ return 0.45;})
            .attr ("stroke","black").attr("stroke-width",.8);

        var k=0;
        for (var i=-36;i<=36;i=i+12){
            var labels = groupe.append("text")
                .attr("class","word")
                .attr("text-anchor","middle")
                .text(function(d){return d.words[k].Word;})
                .attr("y", i )
                .attr("fill", "#000000")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px");
                k++;
        }


    }, true);
    }

    return {
        link: link,
        restrict: 'E',
        scope: {
            data: '='}
    };
});