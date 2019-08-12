<script>
  // import { css } from 'emotion'
  import { onMount } from "svelte";
  import { coords } from "./stores.js";
  import { Polygon } from "./polygon.js";
  import { findPolygonPoint } from "./findPolygonPoint.svelte";
  import { writable } from "svelte/store";

  function getBounds(e) {
    console.log(`e.EventTarget: ${e.target}`);
    let bounds = e.target.getBoundingClientRect()
    let w = parseFloat((bounds.width).toFixed(5))
    let h = parseFloat((bounds.height).toFixed(5))
    console.log(w,h);
    
    
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
    /* stroke: black; */
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* z-index: -1; */
  }

  polygon {
        position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    stroke-width: 0;
  }

  #pentagon-1 {
    /* fill: rgba(75, 125, 175, 0.75); */
    /* stroke: rgba(75, 125, 175, 1); */
    stroke-width: 0;
  }
</style>

<div class="svg-card">

  <svg viewBox="0 0 500 250" preserveAspectRatio="none" height="100%" width="100%" id="pentagon" on:click="{getBounds}">
    <defs>
      <!-- <radialGradient
        id="gradientRad1"
        gradientTransform="rotate(72)"
        cx="50%"
        cy="50%"
        r="50%"
        fx="50%"
        fy="50%">
        <stop class="stop1" offset="0%" stop-color="red" stop-opacity="1" />
        <stop class="stop2" offset="50%" stop-color="white" stop-opacity="0" />
        <stop
          class="stop3"
          offset="100%"
          stop-color="blue"
          stop-opacity="1" />
      </radialGradient> -->
      <linearGradient
        id="fire"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%">
        <stop class="stop1" offset="0%" stop-color="red" stop-opacity="1" />
        <stop class="stop2" offset="100%" stop-color="white" stop-opacity="0" />

      </linearGradient>
      <linearGradient
        id="earth"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%">
        <stop class="stop1" offset="0%" stop-color="brown" stop-opacity="1" />
        <stop class="stop2" offset="100%" stop-color="white" stop-opacity="0" />

      </linearGradient>
      <linearGradient
        id="metal"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%">
        <stop class="stop1" offset="0%" stop-color="grey" stop-opacity="1" />
        <stop class="stop2" offset="100%" stop-color="white" stop-opacity="1" />

      </linearGradient>
      <linearGradient
        id="water"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%">
        <stop class="stop1" offset="0%" stop-color="blue" stop-opacity="1" />
        <stop class="stop2" offset="100%" stop-color="white" stop-opacity="0" />

      </linearGradient>
      <linearGradient
        id="wood"
        x1="0%"
        x2="100%"
        y1="0%"
        y2="0%">
        <stop class="stop1" offset="0%" stop-color="green" stop-opacity="1" />
        <stop class="stop2" offset="100%" stop-color="white" stop-opacity="0" />

      </linearGradient>

      <polygon
        id="polygon-fire"
        transform="rotate(0 0 0)"
        transform-origin="center"
        points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
        417,34,304,116"
        fill="url(#fire)" />
      <polygon
        id="polygon-earth"
        transform="rotate(72 0 0)"
        transform-origin="center"
        points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
        417,34,304,116"
        fill="url(#earth)" />
      <polygon
        id="polygon-metal"
        transform="rotate(144 0 0)"
        transform-origin="center"
        points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
        417,34,304,116"
        fill="url(#metal)" />
      <polygon
        id="polygon-water"
        transform="rotate(216 0 0)"
        transform-origin="center"
        points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
        417,34,304,116"
        fill="url(#water)" />
      <polygon
        id="polygon-wood"
        transform="rotate(288 0 0)"
        transform-origin="center"
        points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
        417,34,304,116"
        fill="url(#wood)" />
      <filter id="blend-it" x="0" y="0" width="100%" height="100%">
        <feImage xlink:href="#polygon-fire" result="fireR" x="0" y="0" width="100%" height="100%" />
        <feImage xlink:href="#polygon-earth" result="earthR" x="0" y="0" width="100%" height="100%"/>
        <feImage
          xlink:href="#polygon-metal"
          result="metalR"
          x="0"
          y="0"
width="100%" height="100%"/>
        <feImage
          xlink:href="#polygon-water"
          result="waterR"
          x="0"
          y="0"
width="100%" height="100%" />
        <feImage
          xlink:href="#polygon-wood"
          result="woodR"
          x="0"
          y="0"
width="100%" height="100%"/>
        <feBlend in="fireR" in2="earthR" mode="multiply" result="fire-earth" />
        <feBlend in="waterR" in2="woodR" mode="multiply" result="water-wood" />
        <feBlend
          in="fire-earth"
          in2="water-wood"
          mode="multiply"
          result="four-elements" />
        <feBlend
          in="four-elements"
          in2="metalR"
          mode="multiply"
          result="five-elements" />
        <feComposite in="five-elements" in2="SourceGraphic" operator="in" />
      </filter>

    </defs>
    <polygon
      id="pentagon-1"
      points="347.1999816894531,249.25,487,249 487,249,530,116 530,116,417,34
      417,34,304,116"
      filter="url(#blend-it)"
      cx="0"
      cy="0" />

  </svg>
</div>
