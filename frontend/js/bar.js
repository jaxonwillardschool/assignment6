async function drawBarChart() {
    const shooting_data = await axios.get('http://localhost:3000/barchart_data')
    console.log(shooting_data)
    var svg = d3.select(".graph").append("svg");
    const margin = 200
    const width = svg.attr("width") - margin
    const height = svg.attr("height") - margin


    const xScale = d3.scaleBand().range ([0, width]).padding(0.4)
    const yScale = d3.scaleLinear().range ([height, 0]);

    var g = svg.append("g") .attr("transform", "translate(" + 100 + "," + 100 + ")");



    console.log('gonna get the data') 
    d3.csv('http://localhost:3000/public/shootings.csv', function(e, data) {
        console.log(data, e)
        xScale.domain(data.map(function(d) { return d.year; }));
        yScale.domain([0, d3.max(data, function(d) { return d.value; })]);
        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return "$" + d;
         }).ticks(10))
         .append("text")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("value");
    })
    



}
drawBarChart()