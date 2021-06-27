import {Computer, Human, Player, BoardSide} from '@/types';
describe('Computer and Human implement IDominoes Player.\n should be able to loop over display type etc.', () => {
  const c1 = new Computer('comp1');
  const h1 = new Human('Billy');
  c1.move();
  h1.move({num1: 1, num2: 2}, BoardSide.Left);

  const players: Player[] = [c1, h1];

  players.forEach((p, i) => {
    console.log(`player ${i}, name: ${p.name}   playerType: ${p.type}`);
  });
});
