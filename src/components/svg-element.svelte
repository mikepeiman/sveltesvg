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

  // function recursivePolygon(points, polygonPointsArray) {
  //   if(points === 0) {
  //     return polygonPointsArray
  //   }
  //   return recursivePolygon(points-1, findPolygonPoint())
  // }

  // function findPolygonPoint(x, y, angle, distance) {
  //   let svg = document.getElementById("pentagon");
  //   // console.log(`svg childnodes`);
  //   // console.log(svg.childNodes);
  //   let polygon = svg.childNodes[0];
  //   let result = {};
  //   x = Math.round(Math.cos((angle * Math.PI) / 180) * distance + x);
  //   y = Math.round(Math.sin((angle * Math.PI) / 180) * distance + y);
  //   polygonPointsArray = [...polygonPointsArray, result];
  //   result.x = x;
  //   result.y = y;
  //   console.log(`x and y: ${x},${y}`)
  //   let point = svg.createSVGPoint();
  //   point.x = x;
  //   point.y = y;
  //   polygon.points.appendItem(point);
  //   console.log("point");
  //   console.log(point);
  //   // console.log("result");
  //   // console.log(result);
  //   console.log("polygon");
  //   console.log(polygon.points);

  //   // return result;
  // }

  function findPolygonPoint(x, y, svgElement, points, distance) {
    let svg = svgElement
    let polygon = svg.childNodes[0]
    let angle = 360 / points;
    let result = {};
    let newX = Math.round(Math.cos((angle * Math.PI) / 180) * distance + x);
    let newY = Math.round(Math.sin((angle * Math.PI) / 180) * distance + y);
    if(points <== 0) {
      return polygonPointsArray
    }
    result.x = x;
    result.y = y;
    polygonPointsArray = [...polygonPointsArray, result];
    console.log(`x ${x} and y ${y}: newX ${newX}, newY ${newY}`);
    let point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    polygon.points.appendItem(point);
    console.log("point");
    console.log(point);
    // console.log("result");
    // console.log(result);
    console.log("polygon");
    console.log(polygon.points);
    return findPolygonPoint(newX, newY, svg, points, distance)
    // return result;
  }
  export function getOrigin(e) {
    let svg = document.getElementById("pentagon");
    let polygon = svg.childNodes[0];
    polygonPointsArray = [];
    // console.log('getOrigin')
    // console.log(e)
    x = e.x + distance;
    y = e.y;
    console.log(`getOrigin x ${x}, y ${y}`);
    // for (let i = 1; i <= points; i++) {
      //  console.log('polygonPointsArray:')
      //  console.log(polygonPointsArray)

      console.log(`inside getOrigin for loop: findPolygon returns: `);
      findPolygonPoint(x, y, svg, points, distance);

      // console.log(findPolygonPoint(polygonPointsArray[i].x, polygonPointsArray[i].y, 72, distance))
      // console.log(findPolygonPoint(x, y, 72, distance))
      // polygonPointsArray.push(findPolygonPoint(x, y, 72, distance))
    // }
    console.log(polygonPointsArray);
  }

  function sameClick() {
    console.log("sameClick");
  }

  // function craftPentagon(x,y, distance) {
  //   let points = []
  //   points.
  // }

  // 1. set start point (by user mouseclick)
  // 2. set distance (by user drag input)
  // 3. create points array on component mount
  //    3a. call findPolygonPoint for each point in numberOfPoints (user input)
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

  svg,
  polygon {
    stroke: black;
    position: absolute;
  }

  #pentagon {
    fill: blue;
    stroke: purple;
  }
</style>

<div class="svg-card" on:click={getOrigin} on:click={sameClick}>
  <h1 class="headline">{headline} YO</h1>
  <svg id="pentagon" />
  <svg height="210" width="500">
    <polygon
      points="200,10 892,496 250,190 160,210 "
      style="fill:lime;stroke:purple;stroke-width:1" />
  </svg>
</div>
