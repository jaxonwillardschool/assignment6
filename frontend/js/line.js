//https://vizartpandey.com/creating-simple-line-charts-using-d3-js-part-01/

async function drawLineChart() {
    const tweet_data = await axios.get('http://localhost:3000/linechart_data')
    const width = 1000;
    const height = 500;
    const margin = 200;
    const padding = 5;
    const adj = 30;
    // we are appending SVG first
    const svg = d3.select(".graph").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " -"
            + adj + " "
            + (width + adj *3) + " "
            + (height + adj*3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);
    const groupByYear = d3.rollup(
    //   [tweet_data.data[0], tweet_data.data[1]],
      tweet_data.data,
      v => v.length,
      d => new Date(d.date).getFullYear()
    );

    const xScale = d3.scaleTime().range([0,width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    const timeConv = d3.timeParse("%d-%b-%Y");
    const xRange = d3.extent(groupByYear, function(d){
        return new Date(d[0], 0)})
    xScale.domain(xRange)
    yScale.domain([0, d3.max(groupByYear, d => {
        return d[1]
    })])

    const lineFunc = d3.line()
        .x(function(d) {
            console.log(d)
            return xScale(new Date(d[0], 0))
        })
        .y(function(d) {
            return yScale(d[1])
        })

    svg.append('svg:path')
        .attr('d', lineFunc(groupByYear))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        

    

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

    svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xaxis);

    svg.append("g")
        .attr("class", "axis")
        .call(yaxis);






  
}

drawLineChart();