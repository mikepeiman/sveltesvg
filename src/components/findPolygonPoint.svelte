<script context="module">
  import { coords } from "./stores.js";
  export function findPolygonPoint(x, y, svgElement, points, distance, iteration, polygonPointsArray) {
      let svg = svgElement;
      let polygon = svg.childNodes[0];
      let angle = (360 / points) * iteration;
    ``
      console.log(
        `angle: ${angle} x ${x}, y ${y}, svgElement ${svgElement}, points ${points}, distance ${distance}, iteration ${iteration}`
      );
      let result = {};
      let newX = Math.round(Math.cos((angle * Math.PI) / 180) * distance + x);
      let newY = Math.round(Math.sin((angle * Math.PI) / 180) * distance + y);
      angle += angle;
      if (iteration <= 0) {
        console.log(`base condition of findPolygonPoint: array ${polygonPointsArray}`);
        coords.set(polygonPointsArray)
        return polygonPointsArray;
      }
      result.x = x;
      result.y = y;
      console.log(`x ${x} and y ${y}: newX ${newX}, newY ${newY}`);
      console.log(`polygonPointsArray = ${polygonPointsArray}`);
      console.log(polygonPointsArray);
      
      let point = svg.createSVGPoint();
      point.x = x;
      point.y = y;
      polygonPointsArray = [...polygonPointsArray, point]
      findPolygonPoint(newX, newY, svg, points, distance, iteration - 1, polygonPointsArray);
    }
</script>
