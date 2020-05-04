console.log("Ok its working fine")
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var topwidth = width / 2;
var topheight = height / 2;
var tooltip = d3.select("body").append("div").style("opacity", "0").style("position", "absolute");

// var svgbottom = d3.select("body").append("svg").attr("class","amanra");//.attr("width","28%");

// ___________________________________________Univeriate Plot Using d3.js______________________________________________________________________________________________________
function Univariateplot(dataX, labelX, margin = { left: 40, bottom: 40, top: 20, right: 20 }, location = "body") {
    var svgtop = d3.select(location).append("svg").attr("width", topwidth).attr("height", topheight);
    // var margin = { left: 40, bottom: 40, top: 10, right: 20 };
    topwidth = topwidth - margin.left - margin.right;
    topheight = topheight - margin.bottom - margin.top;

    if (topwidth / dataX.length < 50) { barwidth = topwidth / dataX.length; } else { barwidth = 50; }
    dmax = Math.max(...dataX);
    barheight = topheight / dmax;

    var x = d3.scaleBand().domain(labelX).range([0, barwidth * dataX.length]);
    var xAxis = d3.axisBottom(x);
    var y = d3.scaleLinear().domain([0, dmax]).range([topheight, 0]);
    var yAxis = d3.axisLeft(y);

    console.log(barheight)
    console.log(dmax);
    var chartGroup = svgtop.append("g").attr("class", "group1").attr("transform", "translate(" + (margin.left) + ",0)");
    chartGroup.selectAll('ract').data(dataX).enter().append("rect")
        .attr("class", "barchart")
        .attr("width", barwidth - 2)
        .attr("height", function (d, i) { return d * barheight; })
        .attr("x", function (d, i) { return (barwidth) * i; })
        .style("fill", "blue")
        .style("opacity", "0.6")
        .on("mouseover", function (d, i) {
            tooltip.style("opacity", "0.75")
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX) + "px")
                // .style("left", barwidth * i + margin.left + margin.right + "px")
                .style("fill", "green");
            tooltip.html("<div class='tooltip'> <p> size : " + d + "<br> of index" + i + "</p></div>");
            // this.style.fill = "orange";
            this.style.opacity = "1";

        })
        // .on("mousemove",function(){
        //     this.style.fill = "green";
        // })
        .on("mouseout", function () {
            this.style.fill = "blue";
            this.style.opacity = "0.6";
            tooltip.text("");
        })
        .transition().duration(500)
        .attr("y", function (d, i) { return barheight * (dmax - d) + margin.top; })

        ;
    chartGroup.append("g")
        .attr("class", "x axis hidden")
        .attr("transform", "translate(0," + (topheight + margin.top) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-25)");

    chartGroup.append("g")
        .attr("class", "y axis hidden")
        .attr("transform", "translate(" + 0 + "," + margin.top + ")")
        .call(yAxis);
};

//____________________________________________________________________________________________________

function Bivariateplot(dataX1, dataX2, labelX, margin = { left: 40, bottom: 40, top: 20, right: 20 }, legend = [["total", "blue"], ["Patient", "red"]], locat = ["body", "50%", "50%"]) {
    var svgtop = d3.select(locat[0]).append("svg").attr("width", locat[1]).attr("height", locat[2]);
    // var margin = { left: 40, bottom: 40, top: 10, right: 20 };
    topwidth = locat[1] - margin.left - margin.right;
    topheight = locat[2] - margin.bottom - margin.top;

    if (topwidth / dataX1.length < 50) { barwidth = topwidth / dataX1.length; } else { barwidth = 50; }
    dmax = Math.max(...dataX1);
    barheight = topheight / dmax;

    var x = d3.scaleBand().domain(labelX).range([0, barwidth * dataX1.length]);
    var xAxis = d3.axisBottom(x);
    var y = d3.scaleLinear().domain([0, dmax]).range([topheight, 0]);
    var yAxis = d3.axisLeft(y);

    console.log(barheight)
    console.log(dmax);
    var chartGroup = svgtop.append("g").attr("class", "group1").attr("transform", "translate(" + (margin.left) + ",0)");
    chartGroup.selectAll('rect.barchart20').data(dataX1).enter().append("rect")
        .attr("class", "barchart20")
        .attr("width", barwidth - 2)
        .attr("height", function (d, i) { return d * barheight; })
        .attr("x", function (d, i) { return (barwidth) * i; })
        .style("fill", legend[0][1])
        .style("opacity", "0.6")
        .on("mouseover", function (d, i) {
            tooltip.style("opacity", "0.75")
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX) + "px")
                // .style("left", barwidth * i + margin.left + margin.right + "px")
                .style("fill", "green");
            tooltip.html("<div class='tooltip'> <p> size : " + d + "<br> of " + labelX[i] + "</p></div>");
            // this.style.fill = "orange";
            this.style.opacity = "1";

        })
        .on("mouseout", function () {
            // this.style.fill = legend[0][1];
            this.style.opacity = "0.6";
            tooltip.text("");
        })
        .transition().duration(500)
        .attr("y", function (d, i) { return barheight * (dmax - d) + margin.top; })

    chartGroup.selectAll('rect.barchart21').data(dataX2).enter().append("rect")
        .attr("class", "barchart21")
        .attr("width", barwidth - 2)
        .attr("height", function (d, i) { return d * barheight; })
        .attr("x", function (d, i) { return (barwidth) * i; })
        .style("fill", legend[1][1])
        .style("opacity", "0.6")
        .on("mouseover", function (d, i) {
            tooltip.style("opacity", "0.75")
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX) + "px")
                // .style("left", barwidth * i + margin.left + margin.right + "px")
                .style("fill", "green");
            tooltip.html("<div class='tooltip'> <p> size : " + d + "<br> of index" + i + "</p></div>");
            // this.style.fill = "orange";
            this.style.opacity = "1";

        })
        .on("mouseover", function (d, i) {
            tooltip.style("opacity", "0.75")
                .style("top", (d3.event.pageY) + "px")
                .style("left", (d3.event.pageX) + "px")
                // .style("left", barwidth * i + margin.left + margin.right + "px")
                .style("fill", "green");
            tooltip.html("<div class='tooltip'> <p> size : " + d + "<br> out of " + dataX1[i] + "</p></div>");
            // this.style.fill = "orange";
            this.style.opacity = "1";

        })
        // .on("mousemove",function(){
        //     this.style.fill = "green";
        // })
        .on("mouseout", function () {
            this.style.fill = legend[1][1];
            this.style.opacity = "0.6";
            // tooltip.text("");
        })
        .transition().duration(500)
        .attr("y", function (d, i) { return barheight * (dmax - d) + margin.top; })

        ;
    chartGroup.append("g")
        .attr("class", "x axis hidden")
        .attr("transform", "translate(0," + (topheight + margin.top) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-25)");

    chartGroup.append("g")
        .attr("class", "y axis hidden")
        .attr("transform", "translate(" + 0 + "," + margin.top + ")")
        .call(yAxis);
    chartGroup.append("text").selectAll("tspan")
        .data(legend)
        .enter().append("tspan")
        .attr("x", margin.left)
        .attr("y", function (d, i) { return margin.top + ((i + 1) * margin.top); })
        .attr("fill", function (d, i) { return d[1]; })
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "start")
        .attr("font-size", "20")
        .text(function (d) { return d[0]; });


    // var line = d3.line()
    //         .x(function(d,i){ return barwidth*i+(barwidth/2); })
    //         .y(function(d,i){ return barheight*(dmax-d) +margin.top; });
    // console.log(line(dataX1))
    // chartGroup.append("path")
    //           .attr("fill","none")
    //           .attr("stroke","yellow")
    //           .attr("d",line(dataX1));
};
