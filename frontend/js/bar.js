async function drawBarChart() {
    const shooting_data = await axios.get('http://localhost:3000/barchart_data')
    console.log(shooting_data)
    // var svg = d3.select("graph").append("svg")
    // const margin = 200
    // const width = svg.attr("width") - margin
    // const height = svg.attr("height") - margin


    // const xScale = d3.scaleBand().range ([0, width]).padding(0.4)
    // const yScale = d3.scaleLinear().range ([height, 0]);

    // var g = svg.append("g")
    //            .attr("transform", "translate(" + 100 + "," + 100 + ")");


}
drawBarChart()