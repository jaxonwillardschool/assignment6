async function drawBarChart() {
    const shooting_data = await axios.get('http://localhost:3000/barchart_data')
    console.log(shooting_data)
    var svg = d3.select(".graph").append("svg").attr("width", "300");
    const margin = 100
    const width = svg.attr("width") - margin
    const height = svg.attr("height") - margin


    const xScale = d3.scaleBand().range([0, width]).padding(0.4)
    const yScale = d3.scaleLinear().range([height, 0]);




    console.log('gonna get the data') 
    d3.json("http://localhost:3000/barchart_data").then(data => {
        var g = svg.append("g") .attr("transform", "translate(" + 100 + "," + 100 + ")");
        const rollup = d3.rollup(data, v => v.length, d => d.race);
        const yMax = d3.max(rollup, d => {
            console.log(d, d.value)
            return d[1] 
        })
        console.log(yMax)
        xScale.domain(data.map(d => d.race));
        yScale.domain([0, yMax])
        g.append("g")
         .attr("transform", "translate(0," + height + ")")
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


        return data
    })
    



}
drawBarChart()