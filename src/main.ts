import {readLine} from './utilities';
import {Game} from './types/Game';
(async function main() {
  const game = Game.fromNewGame();
  // game really handles everything lol
  game.start();
})();
