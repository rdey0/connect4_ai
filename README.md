# Connect 4 AI

Play connect 4 against game search algorithms of varying difficulty. [running instance](https://rdey0.github.io/connect4_ai/)

# How it Works

The web application was created with React and the AI algorithms were written in JavaScript.

# Algorithms

## Mostly Random

As the name suggests, this AI mostly makes moves at random. The only time this AI doesn't make random moves is when it senses and responds to imminent victory or defeat.

## Monte Carlo

This algorithm will simulate random games to completion starting from the current board state and will select the move which resulted in the most wins and fewest losses.

## Minimax

Minimax exhaustively searches all board states n moves ahead of the current board state and then evaluates them based on a heuristic (essentially a metric of how favorable the board state is). Minimax seeks to minimize it's potential loss and maximize it's potential gain.

## Alpha-Beta

Alpha-beta is very similar to minimax except it doesn't search states which a competent opponent would never make (like voluntarily setting up a 4-in-a-row). By refusing to search these states, Alpha-beta is able to 'think' much faster, allowing it to search more moves in advance than minimax.

## Adaptive Depth Heuristic (ADH)
ADH is similar to alpha-beta except it changes its heuristic function and progressively increases its search depth (the amount of moves it is thinking in advance) as the game continues.


