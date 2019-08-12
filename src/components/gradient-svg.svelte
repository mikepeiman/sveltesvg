<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  import { coords } from "./stores.js";
  import { Polygon } from "./polygon.js";
  import { findPolygonPoint } from "./findPolygonPoint.svelte";
  import { writable } from "svelte/store";



</script>

<style>
  .svg-card {
    background: none;
    position: relative;
    color: white;
    padding: 2rem;
    margin: 2rem;
    width: 50%;
    height: 250px;
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

  #pentagon {
    fill: rgba(75, 125, 175, 0.75);
    stroke: rgba(75, 125, 175, 1);
    stroke-width: 5;

  }
</style>

<div class="svg-card">

 <svg height="500" width="500" id="pentagon">
   <defs>
      <radialGradient id="Gradient1" gradientTransform="scale(0.5,2)" cx="50%" cy="55%" r="50%" fx="10%" fy="50%">
        <stop class="stop1" offset="0%" stop-color="gold" stop-opacity="1"/>
        <stop class="stop2" offset="50%" stop-color="green" stop-opacity=".5"/>
        <stop class="stop3" offset="100%" stop-color="blue" stop-opacity=".25" />
      </radialGradient>
    </defs>
    <polygon
      points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34 417,34,304,116" 
      fill="url('#Gradient1')" />
  </svg> 
</div>
