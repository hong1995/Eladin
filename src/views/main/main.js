// 2) Image Slider

var slider = document.querySelector('.slider');
var slides = document.querySelector('.slides');
var slide = document.querySelectorAll('.slide');

var currentSlide = 0;

setInterval(function () {
  var from = -(960 * currentSlide);
  var to = from - 960;
  slides.animate(
    {
      marginLeft: [from + 'px', to + 'px'],
    },
    {
      duration: 1000,
      easing: 'ease',
      iterations: 1,
      fill: 'both',
    }
  );
  currentSlide++;
  if (currentSlide === slide.length - 1) {
    currentSlide = -1;
  }
  console.log(currentSlide, slide.length);
}, 4000);
