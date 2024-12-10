if (window.matchMedia('(min-width: 640px)').matches) {

  let constrain = 200;
  let mouseOverContainer = document.body;
  let ex1Layer = document.querySelector('.page-title');

  function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;
    
    return 'perspective(200px) '
      + '   rotateX('+ calcX +'deg) '
      + '   rotateY('+ calcY +'deg) ';
  };

  function transformElement(el, xyEl) {
    el.style.transform  = transforms.apply(null, xyEl);
  }

  mouseOverContainer.onmousemove = function(e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([ex1Layer]);

    window.requestAnimationFrame(function(){
      transformElement(ex1Layer, position);
    });
  };
}