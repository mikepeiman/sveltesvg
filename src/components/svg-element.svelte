<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  import { polygonPoints, polygonOrigin } from "./stores.js";
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
  let origin

  let polygonPointsArray;
  // const unsubscribe = polygonPoints.subscribe(value => {
  //   polygonPointsArray = value;
  // });

  onMount(() => {
    let svg = document.getElementById("pentagons");
    console.log("mounted");
  });

  function toDegrees(angle) {
    return angle * (180 / Math.PI)
  }

  export function createPolygonAtClick(e) {
    console.log(`e.target.nodeName: ${e.target.nodeName}`);
    let node = e.target.nodeName
    node === 'svg' ? e : e = e.EventTarget.parentNode
    
    let svg = document.getElementById("pentagons");
    let polygon = svg.childNodes[0];
    polygonPoints.set([]);
    let iteration = points;

    let rect = e.target.getBoundingClientRect();
    x = e.x - rect.left;
    y = e.y - rect.top;
    let radius = distance / (2 * Math.sin(toDegrees(180)));
    let newX = x
    let newY = y - radius;

    console.log(`createPolygonAtClick:
     target.x ${e.x} target.y ${e.y} 
     radius ${radius}
     calculated x ${x} calculated y ${y}
     newX ${newX} newY ${newY}
     and e:`);

    console.log(e);
    let pushed = [];

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
      $polygonPoints,
      pushed
    );

    let mapped = $polygonPoints.map(point => [`${point.x},${point.y}`]);
    console.log(`mapped: ${mapped}`);
    console.log(`pushed: ${pushed}`);

    let penta = new Polygon();
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

    svg.appendChild(penta.node);
    console.log(`mapped: ${mapped}`);

    console.log(mapped);
    console.log(pushed);

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
        z-index: -1;
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
