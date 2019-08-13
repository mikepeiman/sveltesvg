<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  import { coords } from "./stores.js";
  import { Polygon } from "./polygon.js";
  import { findPolygonPoint } from "./findPolygonPoint.svelte";
  import { writable } from "svelte/store";
  import emotion from "emotion/dist/emotion.umd.min.js";

  const { css } = emotion;

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
    console.log("mounted");
  });

  function toDegrees(angle) {
    return angle * (180 / Math.PI)
  }

  export function createPolygonAtClick(e) {
    let svg = document.getElementById("pentagons");
    let polygon = svg.childNodes[0];
    coords.set([]);
    // polygonPointsArray = [];
    let iteration = points;

    // code to generate svg centered on click
    let rect = e.target.getBoundingClientRect();
    // x = e.x - rect.left - distance / 2;
    // y = e.y - rect.top + distance;
    x = e.x - rect.left;
    y = e.y - rect.top;
    let radius = distance / (2 * Math.sin(toDegrees(180)));
    console.log(`Math.sin(toDegrees(180 / 5)): ${Math.sin(toDegrees(180))}`);
    
    // let radius = (distance / 1.17557);
    // let newX = Math.round(Math.cos((-90 * Math.PI) / 180) * radius + x);
    let newX = x
    let newY = y - radius;

    // end code to generate svg centered on click

    console.log(`createPolygonAtClick:
     target.x ${e.x} target.y ${e.y} 
     radius ${radius}
     calculated x ${x} calculated y ${y}
     newX ${newX} newY ${newY}
     and e:`);
    // confirmed my calculated x and y are at click relative to parent .svg-card
    console.log(e);
    let pushed = [];
    // console.log(`inside createPolygonAtClick for loop: findPolygonPoint returns: `);

    console.log(`radius !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ${radius}`);
    let peak = [x, y + radius];
    console.log(`peak !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ${peak}`);
    let centerX = Math.round(Math.cos((90 * Math.PI) / 180) * radius + x);
    let centerY = Math.round(Math.sin((90 * Math.PI) / 180) * radius + y);

    console.log(`center: ${centerX} ${centerY}`);
    findPolygonPoint(
      newX,
      newY,
      svg,
      points,
      distance,
      iteration,
      polygonPointsArray,
      pushed
    );

    // console.log("polygonPointsArray");
    // console.log(polygonPointsArray);
    polygonPointsArray.forEach(point => {
      // console.log(`point: ${point}`);
      // console.log(point);
      // console.log(`${point.x},${point.y}`);
    });

    let mapped = polygonPointsArray.map(point => [`${point.x},${point.y}`]);
    console.log(`mapped: ${mapped}`);
    console.log(`pushed: ${pushed}`);

    let penta = new Polygon();
    // penta.points(polygonPointsArray, polygonPointsArray.length);
    penta.points(mapped, mapped.length);

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
    console.log(`mapped: ${mapped}`);

    console.log(mapped);
    console.log(pushed);
    // console.log("penta.points");
    // console.log(penta.points);
    var center = function(arr) {
      var minX, maxX, minY, maxY;
      for (var i = 0; i < arr.length; i++) {
        minX = arr[i][0] < minX || minX == null ? arr[i][0] : minX;
        maxX = arr[i][0] > maxX || maxX == null ? arr[i][0] : maxX;
        minY = arr[i][1] < minY || minY == null ? arr[i][1] : minY;
        maxY = arr[i][1] > maxY || maxY == null ? arr[i][1] : maxY;
      }
      return [(minX + maxX) / 2, (minY + maxY) / 2];
    };
    console.log(center(pushed));
    let centerPoint = center(pushed);
    newY = newY + radius;
    const hoverRotate = css`
      transform: rotate(0deg);
      -ms-transform-origin: ${newX}px ${newY}px;
      -webkit-transform-origin: ${newX}px ${newY}px;
      transform: ${newX}px ${newY}px;
      transition: all 0.25s;
      &:hover {
        transform: rotate(72deg);
        -ms-transform-origin: ${newX}px ${newY}px;
        -webkit-transform-origin: ${newX}px ${newY}px;
        transform: ${newX}px ${newY}px;
      }
    `;
    //          
    penta.attribute("cx", `${newX}`);
    penta.attribute("cy", `${newY}`);
    penta.attribute("id", "testID");
    penta.attribute("class", `${hoverRotate}`);
    console.log(`penta center: ${newX}`);

    console.log(penta.center);
  }
</script>

<style lang="scss">
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
    & svg {
      transition: all 0.25s;
      // z-index: -1;
      & polygon {
        transform: rotate(0deg);
      }
    }
    &:hover svg {
      stroke: red;
      stroke-width: 10;

      & polygon {
        transform: rotate(72deg);
        &:hover {
          stroke-width: 1;
          stroke: blue;
        }
      }
    }
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
    transition: all 0.25s;
    & polygon {
      transform: rotate(0deg);
    }
  }

  #pentagons {
    // fill: rgba(75, 125, 175, 0.75);
    // stroke: rgba(75, 125, 175, 1);
    // stroke-width: 5;
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
