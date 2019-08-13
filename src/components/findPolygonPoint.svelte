<script context="module">
  import { polygonPoints } from "./stores.js";
  export function findPolygonPoint(x, y, svgElement, points, distance, iteration, polygonPointsArray, pushed) {
      let result = {};

      result.x = x;
      result.y = y;
      let svg = svgElement;
      let polygon = svg.childNodes[0];
      let angle = ((360 / points) * iteration) + 144;

      let newX = Math.round(Math.cos((angle * Math.PI) / 180) * distance + x);
      let newY = Math.round(Math.sin((angle * Math.PI) / 180) * distance + y);
      
      angle += angle;
      if (iteration <= 0) {
        console.log(`base condition of findPolygonPoint: array ${polygonPointsArray}`);
        polygonPoints.set(polygonPointsArray)
        return polygonPointsArray;
      }

      pushed.push([x,y])
      let point = svg.createSVGPoint();
      point.x = x;
      point.y = y;

      polygonPointsArray = [...polygonPointsArray, point]
      findPolygonPoint(newX, newY, svg, points, distance, iteration - 1, polygonPointsArray, pushed);
    }
</script>
