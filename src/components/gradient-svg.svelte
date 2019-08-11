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

  #pentagon {
    fill: rgba(75, 125, 175, 0.75);
    stroke: rgba(75, 125, 175, 1);
    stroke-width: 5;
  }
</style>

<div class="svg-card">
  <svg id="pentagon" />
  <!-- <svg height="210" width="500">
    <polygon
      points="200,10 892,496 250,190 160,210 "
      style="fill:lime;stroke:purple;stroke-width:1" />
  </svg> -->
</div>
