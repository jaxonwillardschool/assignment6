//https://vizartpandey.com/creating-simple-line-charts-using-d3-js-part-01/
//https://www.sitepoint.com/creating-simple-line-bar-charts-using-d3-js/

async function drawLineChart() {
    const tweet_data = await axios.get('http://localhost:3000/linechart_data')
    // const width = 1000;
    // const height = 500;
    // const margin = 200;
    // const padding = 5;
    // const adj = 30;
    // const svg = d3.select(".graph").append("svg")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", "-"
    //         + adj + " -"
    //         + adj + " "
    //         + (width + adj *3) + " "
    //         + (height + adj*3))
    //     .style("padding", padding)
    //     .style("margin", margin)
    //     .classed("svg-content", true);
    var svg = d3.select(".graph").append("svg").attr("width", "600").attr("height", "500");
    var g = svg.append("g") .attr("transform", "translate(" + 100 + "," + 100 + ")");

    const margin = 200
    const width = svg.attr("width") - margin
    const height = svg.attr("height") - margin
    const groupByYear = d3.rollup(
      tweet_data.data,
      v => v.length,
      d => new Date(d.date).getFullYear()
    );
    const xScale = d3.scaleTime().range([0,width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    const xRange = d3.extent(groupByYear, d => new Date(d[0], 0))
    xScale.domain(xRange);
    yScale.domain([0, d3.max(groupByYear, d => d[1] )]);
    const lineFunc = d3.line()
        .x(d => xScale(new Date(d[0], 0)))
        .y(d => yScale(d[1]));

    g.append('svg:path')
        .attr('d', lineFunc(groupByYear))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
        

    

    // const line = d3.line()
    //     .x(d => {
    //         console.log(d)
    //         return xScale(d) 
    //     })
    //     .y(d => {
    //         return yScale(d)
    //     })

    // const lines = svg.selectAll("lines")
    //     .data(groupByYear)
    //     .enter()
    //     .append("g")

    // lines.append("path")
    //     .attr("d" , (d) => { 
    //         return line(d)})
    //     .attr("stroke", "black")
    //     .attr("fill", "black")








    const yaxis = d3.axisLeft().scale(yScale); 
    const xaxis = d3.axisBottom().scale(xScale);

    g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

    g.append("g")
        .attr("class", "axis")
        .call(yaxis);
    g.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -60)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-family", "calibri")
        .text("Tweets");

    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width + 100)
        .attr("y", 440) 
        +        .style("font-family", "calibri")
        .text("Year");





  
}

drawLineChart();