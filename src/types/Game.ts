import {Board, Tile} from './Board';
import {Player, Human, Computer} from './Player';
import {Stock} from './Stock';
import {readLine, readLineAndValidate} from '../utilities';

type GameOptions = {
  maxPlayers: number;
  numPlayers: number;
  highestPip: number;
};

interface IGame {
  start(): void;
  createPlayers(numPlayers: number): void;
  displayIntroduction(): void;
}

export class Game implements IGame {
  private stock: Stock = new Stock();
  private tiles: Tile[] = [];
  constructor(
    public players: Player[],
    public options: GameOptions,
    public board: Board
  ) {}
  static fromNewGame(): Game {
    /**
     * static builder function that initializes a new Game
     */
    const players: Player[] = [];
    const board: Board = Board.fromNewBoard();
    // maxPlayers dflt to 4
    // numPlayers dflt to 0 ; gotta get from user
    // highestPip dflt to 6 for now. Later I will add feature to maybe let
    // user choose
    const options: GameOptions = {
      maxPlayers: 4,
      numPlayers: 0,
      highestPip: 6,
    };
    const newGame = new Game(players, options, board);
    return newGame;
  }
  displayIntroduction(): void {
    console.log('Welcome to Console Dominoes!');
    console.log(
      'You get to decide how many players (1 - 4) and how many are humans. The remainder will be computers.'
    );
  }
  async start(): Promise<void> {
    // Kicks off the game. This is where most of the work will be done.
    this.displayIntroduction();
    const numPlayers = await this.getNumberOfPlayers();
    // number of players this game
    this.options.numPlayers = numPlayers;
    // get number of humans playing
    const numHumans = await this.getNumberOfHumanPlayers();
    // initialize players array.
    this.createPlayers(numHumans);
    // initialize stock
    this.stock.initialize();
    // shuffle stock
    this.stock.shuffle();
    // deal hand to players
    this.dealHands();
    // begin game?..
    this.play();
  }

  async play(): Promise<void> {
    // what does a game look like..
    let nextPlayer = 0;
    let isWinner = false;
    while (!isWinner) {
      nextPlayer = this.getNextPlayer(nextPlayer);
      await this.players[nextPlayer].play(this.board, this);
    }
  }

  getNextPlayer(nextPlayer: number): number {
    if (this.tiles.length > 0) {
      if (nextPlayer === this.tiles.length - 1) {
        nextPlayer = 0;
      } else {
        nextPlayer++;
      }
      return nextPlayer;
    } else {
      return this.decideFirstPlayer();
    }
  }

  decideFirstPlayer(): number {
    // find the player with the highest double
    let highestDouble: number;
    // index of player who owns current highest double
    let playerIndex = 0;
    this.players.forEach((player, i) => {
      player.hand.forEach(t => {
        if (t.pip1 === t.pip2) {
          if (t.pip1 > highestDouble) {
            highestDouble = t.pip1;
            playerIndex = i;
          }
        }
      });
    });
    return playerIndex;
  }
  dealHands() {
    /**
     * Deals hands to players
     */
    this.players.forEach(p => {
      p.hand = this.stock.dealHand();
    });
  }

  createPlayers(numHumanPlayers: number): void {
    /**
     * @param numHumanPlayers - number of human players
     */
    const players = [];
    // numHumanPlayers is the number of human players.
    // numPlayers is going to be between 0 and maxPlayers
    for (let playerCount = 0; playerCount < numHumanPlayers; playerCount++) {
      players.push(new Human(`P${playerCount + 1}`));
    }
    // create remaining players as Computers
    for (
      let playerCount = players.length;
      playerCount < this.options.numPlayers;
      playerCount++
    ) {
      players.push(new Computer(`C${playerCount}`));
    }
    this.players = players;
  }

  // Alert user to number of Computer players
  private validateNumPlayersInput(input: string): boolean {
    /**
     * Ensures input is an integer and a number between 1 and 4.
     * If not, logs message to user and returns false
     *
     * @param input - input user entered in command line
     *
     * @returns true - if the input is a number between 1 and 4
     *          false otherwise
     */
    const numPlayers = parseInt(input);
    if (isNaN(numPlayers) || numPlayers > 4 || numPlayers < 1) {
      console.log(
        `Input "${input}" is invalid. Number of players must be a number between 1 and 4`
      );
      return false;
    } else {
      return true;
    }
  }
  private validateNumHumansInput(
    input: string,
    options: {numPlayers: number}
  ): boolean {
    /**
     * Ensures input is an integer and a number between 0 and numPlayers
     *
     * @param input - input from commandline
     *
     * @returns boolean: true= input is a number between 0 and 4
     */
    const numHumans = parseInt(input);
    if (isNaN(numHumans) || numHumans > options.numPlayers || numHumans < 0) {
      console.log(
        `Input "${input}" is invalid. Number of human players must be a value between 0 and ${this.options.numPlayers}`
      );
      return false;
    } else {
      return true;
    }
  }
  async getNumberOfPlayers(): Promise<number> {
    let value = '';
    let numPlayers = 0;
    value = await readLineAndValidate(
      'Enter the number of Players (1 - 4):\n',
      this.validateNumPlayersInput,
      {}
    );
    // doesnt return till valid input is returned.
    numPlayers = parseInt(value);
    return numPlayers;
  }
  async getNumberOfHumanPlayers(): Promise<number> {
    const value = await readLineAndValidate(
      `Enter the number of Human Players (max ${this.options.numPlayers}):\n`,
      this.validateNumHumansInput,
      {numPlayers: this.options.numPlayers}
    );
    const numHumans = parseInt(value);
    return numHumans;
  }
}
