$(document).ready(function() {
  var dSet = [];
  var dCrashes = [];
  var sSelectedState = $("#select-state").val();
  setAndGo();
  $("#select-state").on("change", function() {
    sSelectedState = $("#select-state").val();
    setAndGo();
  });

  function setAndGo() {
    if (sSelectedState !== "*") {
      dSet = dataFatalities.filter(function(d) {
        return d.State == sSelectedState;
      });
      dCrashes = dataFatalCrashes.filter(function(d) {
        return d.State == sSelectedState;
      });
    } else {
      dSet = dataFatalities;
      dCrashes = dataFatalCrashes;
    }
    generateGraphs();
  }
  //console.log(JSON.stringify(dAverageAge));
  // d3.select(".chart1").selectAll("div").data(dAverageAge).enter().append("div").style("width", function (d) {
  //     return d.value + "px";
  // }).text(function (d) {
  //     return d.key;
  // });

  // Write the createVisualization function
  // This will contain the script that creates the chart
  function createVisualization(sChart, data, sLabelY) {
    // Width and height of SVG
    var w = 150;
    var h = 175;

    // Get length of dataset
    var arrayLength = data.length; // length of dataset
    var maxValue = d3.max(data, function(d) {
      return +d.value;
    }); // get maximum
    var x_axisLength = 100; // length of x-axis in our layout
    var y_axisLength = 100; // length of y-axis in our layout

    // Use a scale for the height of the visualization
    var yScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, y_axisLength]);

    //Create SVG element
    var svg = d3
      .select(sChart)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // Select and generate rectangle elements
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return i * (x_axisLength / arrayLength) + 30; // Set x coordinate of rectangle to index of data value (i) *25
      })
      .attr("y", function(d) {
        return h - yScale(d.value); // Set y coordinate of rect using the y scale
      })
      .attr("width", x_axisLength / arrayLength - 1)
      .attr("height", function(d) {
        return yScale(d.value); // Set height of using the scale
      })
      .attr("fill", "steelblue")
      .on("mouseover", function(d) {
        return tooltip
          .style("visibility", "visible")
          .text(d.key + ": " + d.value);
      })
      .on("mousemove", function(d) {
        return tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px")
          .text(d.key + ": " + d.value);
      })
      .on("mouseout", function(d) {
        return tooltip.style("visibility", "hidden");
      });

    // Create y-axis
    svg
      .append("line")
      .attr("x1", 30)
      .attr("y1", 75)
      .attr("x2", 30)
      .attr("y2", 175)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    // Create x-axis
    svg
      .append("line")
      .attr("x1", 30)
      .attr("y1", 175)
      .attr("x2", 130)
      .attr("y2", 175)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    // y-axis label
    svg.append("g").attr("class", "y label").append("text").text(sLabelY);

    // Create Tooltip and set it to be hidden
    var tooltip = d3
      .select(sChart)
      .append("div")
      .attr("class", "chart-tooltip");
  } // end of function

  function generateGraphs() {
    $(".chart1").empty();
    $(".chart2").empty();

    var dAverageAge = d3
      .nest()
      .key(function(d) {
        return d.Crash_Type;
      })
      .rollup(function(v) {
        return Math.ceil(
          d3.mean(v, function(d) {
            return d.Age;
          })
        );
      })
      .sortKeys(d3.ascending)
      .entries(dSet);

    var dFatalitiesByMonth = d3
      .nest()
      .key(function(d) {
        return d.Month;
      })
      .rollup(function(v) {
        return Math.ceil(
          d3.sum(v, function(d) {
            return d.Number_of_Fatalities;
          })
        );
      })
      .entries(dCrashes);

    function sortByMonth(arr) {
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      arr.sort(function(a, b) {
        return months.indexOf(a.key) - months.indexOf(b.key);
      });
    }

    createVisualization(".chart1", dAverageAge, "Average Age");

    sortByMonth(dFatalitiesByMonth);
    createVisualization(".chart2", dFatalitiesByMonth, "Fatalities");
  }
});
