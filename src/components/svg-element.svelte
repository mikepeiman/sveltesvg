<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  export let headline = "Default text";
  export let bg = "rgba(60,120,180,1)";
  $: x = 0;
  $: y = 0;
  let points = 5;
  $: polygonPointsArray = [];
  let distance = 60;

  onMount(() => {
    let svg = document.getElementById("pentagon");
    let polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    console.log("mounted");
    svg.appendChild(polygon);
  });

  function Polygon() {
    // from https://gist.github.com/roboncode/4bf663b53d2dcf2f05efea22e8a20ea8

    let pointsList = [];
    let svg = document.getElementById("pentagon");
    this.node = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    function build(arg) {
      let res = [];
      for (let i = 0, l = arg.length; i < l; i++) {
        console.log(`inside of Polygon.build(): res ${res}`)
        res.push(arg[i].join(","));
      }
      return res.join(" ");
    }

    this.attribute = function(key, val) {
      if (val === undefined) return this.node.getAttribute(key);
      this.node.setAttribute(key, val);
    };

    this.getPoint = function(i) {
      return pointsList[i];
    };

    this.setPoint = function(i, x, y) {
      pointsList[i] = [x, y];
      this.attribute("points", build(pointsList));
    };

    this.points = function(points, l) {
      for (let i = 0; i < l; i += 1) {
        console.log(
          `i ${i} l ${l} this.points arguments[i] ${points[i]}, points[i+1] ${
            points[i + 1]
          } and pointsList: ${pointsList}`
        );
        if (points[i + 1] !== undefined) {
          pointsList.push([points[i],points[i + 1]]);
        }
      }
      this.attribute("points", build(pointsList));
    };

    this.points.apply(this, arguments);
  }

  function findPolygonPoint(x, y, svgElement, points, distance, iteration) {
    let svg = svgElement;
    let polygon = svg.childNodes[0];
    let angle = 360 / points * iteration;

    console.log(`angle: ${angle} x ${x}, y ${y}, svgElement ${svgElement}, points ${points}, distance ${distance}, iteration ${iteration}`);
    let result = {};
    let newX = Math.round(Math.cos((angle * Math.PI) / 180) * distance + x);
    let newY = Math.round(Math.sin((angle * Math.PI) / 180) * distance + y);
    angle += angle;
    if (iteration <= 0) {
      return polygonPointsArray;
    }
    result.x = x;
    result.y = y;
    polygonPointsArray = [...polygonPointsArray, [x, y]];
    console.log(`x ${x} and y ${y}: newX ${newX}, newY ${newY}`);
    console.log(`polygonPointsArray = ${polygonPointsArray}`)
    let point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    findPolygonPoint(newX, newY, svg, points, distance, iteration - 1);
    // return result;
  }

  export function getOrigin(e) {
    let svg = document.getElementById("pentagon");
    let polygon = svg.childNodes[0];
    polygonPointsArray = [];
    let iteration = points;

    // code to generate svg centered on click
    let rect = e.target.getBoundingClientRect()
    x = e.x-rect.left - distance/2;
    y = e.y-rect.top + distance;
    // end code to generate svg centered on click

    console.log(`getOrigin x ${x}, y ${y}, and e:`);
    console.log(e)

    console.log(`inside getOrigin for loop: findPolygon returns: `);
    findPolygonPoint(x, y, svg, points, distance, iteration);

    console.log("polygonPointsArray");
    console.log(polygonPointsArray);

    let penta = new Polygon();
    penta.points(polygonPointsArray, polygonPointsArray.length);
    console.log(polygonPointsArray.length);
    console.log("penta");
    console.log(penta);
    svg.appendChild(penta.node);

    console.log("penta.points");
    console.log(penta.points);
  }
</script>

<style>
  .svg-card {
    background: rgba(75, 125, 175, 0.75);
    position: relative;
    color: white;
    padding: 2rem;
    margin: 2rem;
    width: 50%;
    justify-self: center;
    align-self: center;
    /* border: 2px solid rgba(75,95,255,0.5); */
    border: 1px solid black;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.75);
  }
  h1 {
    text-align: center;
  }

  svg {
    stroke: black;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  #pentagon {
    fill: rgba(75, 125, 175, 0.75);
    stroke: rgba(75, 125, 175, 1);;
    stroke-width: 5;
  }
</style>

<div class="svg-card" on:click={getOrigin}>
  <h1 class="headline">{headline}</h1>
  <svg id="pentagon" />
  <!-- <svg height="210" width="500">
    <polygon
      points="200,10 892,496 250,190 160,210 "
      style="fill:lime;stroke:purple;stroke-width:1" />
  </svg> -->
</div>
