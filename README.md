# 👀 p5js - Pong

Browser implementation of the old Arcade game Pong using the great [p5js](https://p5js.org/) Javascript library. The game includes different player modes (human/computer) a counter, basic sound effects and gimmicks like increasing ball speed when ball bounces from the player paddles. Many thanks to [Daniel Shiffman](https://shiffman.net/) for his very inspiring [Youtube videos](https://www.youtube.com/c/TheCodingTrain/playlists), which made me aware of the great p5js library and inspired me to get in touch with it.

![Animated GIF](./screenshot.gif)

## Live Demos via Github Pages

Thanks to Github Pages, you can try out different Pong variations in your browser on the fly:

- [human vs. computer](https://cwsoft.github.io/p5js-pong/) human paddle moved via keyboard
- [human vs. human](https://cwsoft.github.io/p5js-pong/?leftPaddle=keyboard&rightPaddle=keyboard) both paddles moved via keyboard
- [human touchpad vs. computer](https://cwsoft.github.io/p5js-pong/?leftPaddle=touchpad) human paddle moved via touchpad
- [human mouse vs. computer](https://cwsoft.github.io/p5js-pong/?leftPaddle=mouse) human paddle moved via mouse
- [computer vs. computer](https://cwsoft.github.io/p5js-pong/?leftPaddle=computer&rightPaddle=computer) just watch

## Basic Usage

1.  Browse main `index.html` with a modern browser (e.g. Firefox, Chrome).
2.  Press `SPACE` or touch on screen to start a new round, `P` to pause the game or `F5` to start from scratch.
3.  Paddles are moved with keyboard `CURSOR_UP`, `CURSOR_DOWN`, respective `q` (UP) and `a` (DOWN) by default.
4.  Defaults can be overwritten by adding optional GET parameters `leftPaddle` and/or `rightPaddle` to main index URL:
    - `?leftPaddle=computer|keyboard|mouse|touchpad`
    - `?rightPaddle=computer|keyboard|mouse|touchpad`
    - Note: Not all possible variations are supported, just the most common ones

## Known Limitations

There is only limited support for ONE human player using a touch devices like an iPad.

## Contribution

As this was my very first trial with the p5js library, game layout could be improved in a lot of areas. If you want to get your hands on, just download the files and change them to your needs. Possible improvements could be code clean-up and refactoring (e.g. get rid of public fields and properties, add Typescript support, add collision detection to the individual objects, add new features like multiple balls or add magic items to allow to change the ball speed or manipulate it´s velocity vector by gravity or wind forces etc.

If you implemented new features, fixed some odd bugs or improved code quality, it would be nice to share your code with me via the [Github Issues](https://github.com/cwsoft/p5js-pong/issues) panel or send me a pull request to review and possibly take over your contributions into my code base.

Have fun
cwsoft
