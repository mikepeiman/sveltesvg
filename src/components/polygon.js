export function Polygon() {
  // from https://gist.github.com/roboncode/4bf663b53d2dcf2f05efea22e8a20ea8

  let pointsList = [];
  let svg = document.getElementById("pentagon");
  this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  function build(arg) {
    let res = [];
    for (let i = 0, l = arg.length; i < l; i++) {
      // console.log(`inside of Polygon.build(): res ${res}`);
      // console.log(res)
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
      pointsList.push([points[i]]);
    }
    this.attribute("points", build(pointsList));
  };

  this.points.apply(this, arguments);
}
