execute = function() {
    let svg = d3.select("svg");
    // var projection = d3.geoMercator().translate([width/2, height/2]).scale(400).center([-120,54]);
    var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
        .scale(2500)
        .center([-107, 47])

    let path = d3.geoPath().projection(projection);
    let unitedStates = d3.json("gz_2010_us_040_00_500k.geojson");
    let bridges = d3.json("Montana_Bridges.geojson");
    let cities = d3.json("cities_us.geojson");
    Promise.all([unitedStates, bridges, cities]).then(function(values){
        svg.selectAll("path")
        .data(values[0].features.filter(function(d){return d.properties.NAME == "Montana"}))
        .enter()
        .append("path")
        .attr("class","continent")
        .attr("d", path)

        svg.selectAll("circle.bridge")
        .data(values[1].features)
        .enter()
        .append("svg:circle")
        .attr("fill", function(d) {
            if (d.properties.MDT_DECK_COND == "POOR") {
              return "#bf502b";
            } else if (d.properties.MDT_DECK_COND == "Fair-1") {
                return "#db7e05"
            } else if (d.properties.MDT_DECK_COND == "Fair-2") {
                return "#db7e05"
            }else if (d.properties.MDT_DECK_COND == "Good") {
              return "#28a9bd";
            }
            return 'grey';
          })
        .attr("cx", function(d) {
            coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
            return coords[0];
        })
        .attr("cy", function(d) {
            coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
            return coords[1];
        })
        .attr("r", function(d) {
            if (d.properties.MDT_DECK_COND == "POOR") {
                return 4;
            }else if (d.properties.MDT_DECK_COND == "Fair-1") {
                return 3;
            }else if (d.properties.MDT_DECK_COND == "Fair-2") {
                return 3;
            }else if (d.properties.MDT_DECK_COND == "Good") {
                return 2;
            }
            return 1;

        })
        svg.append("circle")
            .attr("cx",550)
            .attr("cy",130)
            .attr("r", 6)
            .style("fill", "#28a9bd")
        svg.append("circle")
            .attr("cx",550)
            .attr("cy",160)
            .attr("r", 6)
            .style("fill", "#db7e05")
        svg.append("circle")
            .attr("cx",550)
            .attr("cy",190)
            .attr("r", 6)
            .style("fill", "#bf502b")
        svg.append("circle")
            .attr("cx",550)
            .attr("cy",220)
            .attr("r", 6)
            .style("fill", "grey")

        svg.append("text")
            .attr("x", 570)
            .attr("y", 130)
            .text("Bridges in Good Condition")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 570)
            .attr("y", 160)
            .text("Bridges in Fair Condition")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 570)
            .attr("y", 190)
            .text("Bridges in Poor Condition")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle")
        svg.append("text")
            .attr("x", 570)
            .attr("y", 220)
            .text("Unspecified Bridge Conditions")
            .style("font-size", "15px")
            .attr("alignment-baseline","middle"),
        
        svg.selectAll("circle.city")
        .data(values[2].features.filter(function(d) {return d.properties.POPULATION > 5000;}), function(d) {return d})
        .enter()
        .append("svg:circle")
        .attr("fill", "black")
        .attr("cx", function(d) {
            coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
            console.log(coords[0] + "," +coords[1]);
            return coords[0];
        })
        .attr("cy", function(d) {
            coords = projection([d.geometry.coordinates[0], d.geometry.coordinates[1]]);
            return coords[1];
        })
        .attr("r", 10)
            
            

    })
}
//draw points function(d) {return projection([d.LONG_017, d.LAT_016])[0];} function(d) {return projection([d.LONG_017, d.LAT_016])[1];}
    

execute();