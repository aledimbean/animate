import { styler,decay, value, listen, pointer, spring } from "popmotion";

const ball = document.querySelector(".box");
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, "mousedown touchstart").start(e => {
  e.preventDefault();
  pointer(ballXY.get()).start(ballXY);
});

listen(document, "mouseup touchend").start(() => {
  spring({
    from: ballXY.get(),
    velocity: ballXY.getVelocity(),
    to: { x: 0, y: 0 },
    stiffness: 200
  }).start(ballXY);
});



const slider = document.querySelector('.carousel');
const sliderdDivStyler = styler(slider);
const sliderX = value(0, sliderdDivStyler.set('x'));

listen(slider, 'mousedown touchstart')
  .start(() => {
    pointer({ x: sliderX.get() })
      .pipe(({ x }) => x)
      .start(sliderX);
  });

listen(document, 'mouseup touchend')
  .start(() => {
    decay({
      from: sliderX.get(),
      velocity: sliderX.getVelocity(),
      // power: 0.8,
      // timeConstant: 350,
      // restDelta: 0.5,
      // modifyTarget: v => v
    }).start(sliderX);
  });
