//https://www.d3-graph-gallery.com/graph/stackedarea_wideinput.html
//https://www.geeksforgeeks.org/d3-js-area-method/
const confirmedCases = "Cases (confirmed plus probable)";
const newCases = "New cases";
const caseDate = "Date";
const formatClass = (c) => c.replaceAll(" ", "").replaceAll("(","").replaceAll(")","")

async function drawLineChart() {
    const covid = await axios.get('http://localhost:3000/areachart_data')
    var svg = d3.select(".graph").append("svg").attr("width", "600").attr("height", "500");
    var g = svg.append("g") .attr("transform", "translate(" + 100 + "," + 100 + ")");
    const margin = 200;
    const width = svg.attr("width") - margin;
    const height = svg.attr("height") - margin;
    d3.json('http://localhost:3000/areachart_data').then(data => {
        console.log(data)
        const createChart = (attribute) => {
            const formatNumber = (num) => parseFloat(num.replace(',', ''));
            const xScale = d3.scaleTime().range([0,width])
            const yScale = d3.scaleLinear().rangeRound([height, 0])
            const xRange = d3.extent(data, d=>new Date(d[caseDate]))
            xScale.domain(xRange)
            yScale.domain([0, d3.max(data, d => formatNumber(d[attribute]))])
            const lineFunc=d3.area()
                .x(d => xScale(new Date(d[caseDate])))
                .y0(d => yScale(formatNumber(d[attribute])))
                .y1(d => height)
            g.append('svg:path')
                .attr('d', lineFunc(data))
                .attr('stroke', 'blue')
                .attr('stroke-width', 1)
                .attr('fill', 'blue')
                .attr('class', 'areachart')

            const xaxis = d3.axisBottom().scale(xScale);
            const yaxis = d3.axisLeft().scale(yScale)
            g.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xaxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" );
            g.append("g")
                .attr("class", "axis")
                .attr("class", formatClass(attribute))
                .call(yaxis);

            
            g.append("text")
                .attr("class", "y label")
                .attr("class", formatClass(attribute))
                .attr("text-anchor", "end")
                .attr("y", -70)
                .attr("dy", ".75em")
                .attr("transform", "rotate(-90)")
                .style("font-family", "calibri")
                .text(attribute);


            svg.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", width + 100)
                .attr("y", 460) 
                .style("font-family", "calibri")
                .text("Date");
        }
        createChart(confirmedCases)

        const button = d3.select("button");
        button
            .on("click", (d,e) => {
                d3.selectAll('.areachart')
                    .join(
                        (enter) => createChart(newCases) ,
                        (update) => console.log('update'),
                        (exit) => {
                            d3.selectAll("."+ formatClass(confirmedCases)).remove();
                            d3.select('.areachart').remove();
                        }
                    )

            })

    })
}


drawLineChart();