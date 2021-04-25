# 👀 p5js - Pong

Browser implementation of the old Arcade game Pong using the great [p5js](https://p5js.org/) Javascript library. The game includes different player modes (human/computer) a counter, basic sound effects and gimmicks like increasing ball speed when ball bounces from the player paddles. Many thanks to [Daniel Shiffman](https://shiffman.net/) for his very inspiring [Youtube videos](https://www.youtube.com/c/TheCodingTrain/playlists), which made me aware of the great p5js library and inspired me to get in touch with it.

![Animated GIF](./screenshot.gif)

## Live Demo

You can play a live demo with [two human players](https://cwsoft.github.io/p5js-pong/) or [human vs. computer](https://cwsoft.github.io/p5js-pong/?rightPlayer=computer) thanks to Github Pages. If you don´t like keyboard controls, you can play [against the computer using the mouse](https://cwsoft.github.io/p5js-pong/?rightPlayer=computer&leftControl=mouse) as well.

## Basic Usage

1.  Download files to your computer or view [live demo](https://cwsoft.github.io/p5js-pong/).
2.  Browse index.html (or index.html?rightPlayer=computer) in a modern browser (e.g. Firefox).
3.  Press `SPACE` to start a new round, `P` to pause the game or `F5` to start from scratch.
4.  By default, left player moves paddle via `CURSOR_UP` and `CURSOR_DOWN`, right player via `q` (UP) and `a` (DOWN) keys.
5.  One can overwrite defaults by adding optional GET parameters to the main index URL:
    - `?rightPlayer=computer`
    - `?leftControl=mouse`
    - `?rightControl=mouse`
    - Example URL: https://cwsoft.github.io/p5js-pong/?rightPlayer=computer&leftControl=mouse

## Whats next

As this was my very first trial with the p5js library, game layout could possibly improved in a lot of areas. If you want to get your hands on, just download the files and change them to your needs. Possible improvements could be code clean-up and refactoring (e.g. get rid of public fields and properties, add collision detection to individual objects, add features like multiple balls or items to allow speed up of the ball etc. As my time is limited, feel free to improve or add features as you like.

Have fun
cwsoft
