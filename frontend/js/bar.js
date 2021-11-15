// https://www.tutorialsteacher.com/d3js/create-bar-chart-using-d3js

async function drawBarChart() {
    const shooting_data = await axios.get('http://localhost:3000/barchart_data')
    var svg = d3.select(".graph").append("svg").attr("width", "600").attr("height", "500");
    const margin = 200
    const width = svg.attr("width") - margin
    const height = svg.attr("height") - margin
    const xScale = d3.scaleBand().range([0, width]).padding(0.1)
    const yScale = d3.scaleLinear().range([height, 0])
    const originalColor = "#00759b"
    const highlight = "blue"




    d3.json("http://localhost:3000/barchart_data").then(data => {
        var g = svg.append("g") .attr("transform", "translate(" + 100 + "," + 100 + ")");
        const rollup = d3.rollup(data, v => v.length, d => d.race || "U");

        const yMax = d3.max(rollup, d => {
            return d[1] 
        })
        xScale.domain(Array.from(rollup.keys()))
        yScale.domain([0, yMax])
        g.append("g")
            .attr("transform", "translate(0," + height  +  ")")
            .call(d3.axisBottom(xScale));


        g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return d;
            }).ticks(10))
            .append("text")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("value");

        
         g.selectAll(".bar")
            .data(rollup)
            .enter().append("rect")
            .style("transition", "fill 0.2s linear")
            .style("fill", originalColor)
            .attr("x", function(d) { 
                return xScale(d[0]); })
            .attr("y", function(d) { return yScale(d[1]); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d[1]); })
            .on("mouseover", function(event, data) {
                const t = d3.select(this)
                d3.select(this).style("fill", highlight)
                g.append("text").attr("class","the-p").text(data[1]).attr("x", t.attr("x")).attr("y", t.attr("y") - 10).style("font-family", "calibri").attr("class", "num-deaths")
            })
            .on("mouseout", function(d) {
                d3.selectAll(".num-deaths").remove()
                d3.select(this).style("fill", originalColor)
            })

        g.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -60)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .style("font-family", "calibri")
            .text("Number of deaths");

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width + 100)
            .attr("y", 440)
            .style("font-family", "calibri")
            .text("Race");


        return data
    })
    



}
drawBarChart()