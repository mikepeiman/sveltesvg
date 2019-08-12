<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  import { coords } from "./stores.js";
  import { Polygon } from "./polygon.js";
  import { findPolygonPoint } from "./findPolygonPoint.svelte";
  import { writable } from "svelte/store";

  $: x = 0;
  $: y = 0;
  let points = 5;
  let distance = 140;
  // let polygonPointsArray = []

  let polygonPointsArray;
  const unsubscribe = coords.subscribe(value => {
    polygonPointsArray = value;
  });

  onMount(() => {
    let svg = document.getElementById("pentagons");
    let polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    console.log("mounted");
    svg.appendChild(polygon);
  });

  export function createPolygonAtClick(e) {
    let svg = document.getElementById("pentagons");
    let polygon = svg.childNodes[0];
    coords.set([])
    // polygonPointsArray = [];
    let iteration = points;

    // code to generate svg centered on click
    let rect = e.target.getBoundingClientRect();
    x = e.x - rect.left - distance / 2;
    y = e.y - rect.top + distance;
    // end code to generate svg centered on click

    console.log(`createPolygonAtClick x ${x}, y ${y}, and e:`);
    console.log(e);

    // console.log(`inside createPolygonAtClick for loop: findPolygonPoint returns: `);
    findPolygonPoint(
      x,
      y,
      svg,
      points,
      distance,
      iteration,
      polygonPointsArray
    );

    console.log("polygonPointsArray");
    console.log(polygonPointsArray);
    polygonPointsArray.forEach(point => {
      console.log(`point: ${point}`);
      console.log(point);
      console.log(`${point.x},${point.y}`);
      
      
      
    })
    let mapped = polygonPointsArray.map(point => [`${point.x},${point.y}`])
    console.log(`mapped: ${mapped}`);
    

    let penta = new Polygon();
    // penta.points(polygonPointsArray, polygonPointsArray.length);
    penta.points(mapped, mapped.length)

    let elX = svg.parentNode.offsetWidth;
    let elY = svg.parentNode.offsetHeight;
    let hueFactorX = (360 / elX).toFixed(2);
    let hueFactorY = (360 / elY).toFixed(2);
    let aFactorY = (1 / elY).toFixed(5);
    let hueX = x * hueFactorX;
    let hueY = y * hueFactorY;
    let alphaY = (y * aFactorY).toFixed(2);
    // console.log(`alpha factor: ${aFactorY}, alphaY ${alphaY}`);
    penta.attribute("fill", `hsla(${hueX},100%,50%,${alphaY})`);
    // console.log(
    //   `!!!!!!!!!!!!!!!!!!!!!!!!!!!!! svg parent width ${elX} ${hueFactorX}, ${elY} ${hueFactorY}`
    // );
    // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!! hueX ${hueX} hueY ${hueY}`);

    // console.log(polygonPointsArray.length);
    // console.log("penta");
    // console.log(penta);
    svg.appendChild(penta.node);

    // console.log("penta.points");
    // console.log(penta.points);
  }
</script>

<style>
  .svg-card {
    background: none;
    position: relative;
    color: white;
    padding: 2rem;
    margin: 2rem;
    width: 50%;
    height: 20vh;
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
    z-index: -1;
  }

  #pentagons {
    fill: rgba(75, 125, 175, 0.75);
    stroke: rgba(75, 125, 175, 1);
    stroke-width: 5;
  }
</style>

<div class="svg-card" on:click={createPolygonAtClick}>
  <svg id="pentagons" />
  <!-- <svg height="210" width="500">
    <polygon
      points="200,10 892,496 250,190 160,210 "
      style="fill:lime;stroke:purple;stroke-width:1" />
  </svg> -->
</div>
