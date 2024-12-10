import Velocity from 'velocity-animate';

export function init() {

  addEventListener('load', (event) => {
    
    generateTriangles(true);
    
    setInterval(() => { 
      generateTriangles();
    }, 6000);
    
  });

  const generateTriangles = (firstLoad = false) => {
     for (let i = 0; i < 14; i++) { 
        var triangle = document.createElement('div');

        triangle.classList.add('triangle');
        if (firstLoad)
          triangle.style.top = 'calc(50% + ' + randomIntFromInterval(1, 50) + '%)';
        else 
          triangle.style.top = 'calc(100% + ' + randomIntFromInterval(1, 100) + '%)';
        
        triangle.style.left = randomIntFromInterval(1, 100) + '%';

        document.getElementById("triangles").appendChild(triangle);

        animateTriangle(triangle); 
      }
  };

  const animateTriangle = (el) => {
    Velocity(el, { 
      top: '-60px' 
    }, {
      delay: 0,
      duration: randomIntFromInterval(24000, 30000),
      easing: 'swing',
      begin: () => {
        el.style.opacity = 0.1;
      },
      complete: () => {
        el.remove();
      }
    });
  };

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

}
