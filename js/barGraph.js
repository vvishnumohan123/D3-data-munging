/*eslint-disable */
// Defining the D3 margin
let margin = { top: 60, right: 30, bottom: 100, left: 100},
  width = 900 - margin.right - margin.left,
   height = 500 - margin.top - margin.bottom;
// define svg
let svg_population = d3.select('#population')
        .append('svg')
        .attr({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
        })
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');
// Scale and Axis
let xScale = d3.scale.ordinal()
.rangeRoundBands([0,width], 0.1);
let yScale = d3.scale.linear()
.range([height, 0]);
// define axis
let xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');
let yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');
// Getting JSON data
d3.json('../outputdata/outputJson1Vishnu.json', function(error, data){
    if(error){
    console.log('Error');
    }
    data.forEach(function(d){
        d.LiteratePopulation = + d.LiteratePopulation;
        d.AgeGroup = d.AgeGroup;
        console.log(d.LiteratePopulation);
    });
    data.sort(function(a, b){
    return b.LiteratePopulation- a.LiteratePopulation;
    });
//  specify the domains of x and y scales
xScale.domain(data.map(function(d){
    return d.AgeGroup;
}));
yScale.domain([0, d3.max(data, function(d){
    return d.LiteratePopulation;
})]);
// draw the bars
svg_population.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', 0)
    .attr('y', height)
    .transition().duration(3000)
    .delay(function(d, i){
        return i*200;
    })
    .attr({
        'x': function(d){
        return xScale(d.AgeGroup);
        },
        'y': function(d){
        return yScale(d.LiteratePopulation);
        },
        'width': xScale.rangeBand(),
        'height': function(d){
        return height-yScale(d.LiteratePopulation);
        }
    });
// label the bars
/*
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(function (d){ return d.population2013; })
    .attr('x', function (d){ return xScale(d.country) + xScale.rangeBand()/2;
    })
    .attr('y', function(d){
    return yScale(d.population2013) + 12;
    })
    .style('fill', 'white')
    .style('text-anchor', 'left');
*/
//  append x axis and y axis
svg_population.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(xAxis)
    .selectAll('text')
    .attr('transform', 'rotate(-60)')
    .attr('dx', '-0.8em')
    .attr('dy', '-0.25em')
    .style('text-anchor', 'end')
    .style('font-size', '12px');
svg_population.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .selectAll('text')
    .attr('dx', '-0.8em')
    .attr('dy', '-0.25em')
    .style('text-anchor', 'end')
    .style('font-size', '12px');
});
/*eslint-enable */
