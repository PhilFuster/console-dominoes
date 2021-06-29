import {Board, BoardSide} from './Board';
import {Tile} from './Tile';
import {BoardView} from './BoardView';
import {Game} from './Game';
import {readLineAndValidate} from '../utilities';

export enum PlayerType {
  Human = 'H',
  Computer = 'C',
}
enum MenuOption {
  displayBoard = 1,
  displayHand = 2,
  skip = 3,
  help = 4,
}
// human can select either a menu option
// or a tile from their hand
enum MenuChoiceType {
  Menu = 'm',
  Tile = 't',
}

export abstract class Player {
  abstract readonly playerType: PlayerType;
  public hand: Tile[] = [];
  constructor(readonly name: string) {}
  abstract play(board: Board, game: Game): Promise<boolean> | boolean;
  toString() {
    return this.name;
  }
}
export class Human extends Player {
  readonly playerType = PlayerType.Human;
  async play(board: Board, game: Game): Promise<boolean> {
    /**
     * 1. prompt user to select a tile from their hand
     * 2. validate user's choice (probably a board function or something)
     * 3. submit move to board
     */
    // begin input loop
    const menuValidationArguments = {
      highestPip: game.options.highestPip,
      menuChoiceType: undefined,
      hand: this.hand,
    };
    this.displayHand();
    let gotMove = false;
    while (!gotMove) {
      const choice = await readLineAndValidate(
        `Enter a menu item:
                1: Display Board
                2: Display Hand
                3: Skip
                4: Help
              OR
              Choose a tile to play.
              Example of choosing a tile: 3-5
        `,
        this.validateMenuChoice,
        menuValidationArguments
      );
      if (menuValidationArguments.menuChoiceType === MenuChoiceType.Menu) {
        // perform the menu choice.
        const menuChoice = parseInt(choice);
        switch (menuChoice) {
          case MenuOption.displayBoard:
            BoardView.toConsole(board.get());
            break;
          case MenuOption.displayHand:
            this.displayHand();
            break;
          case MenuOption.skip:
            // TODO: Implement skip
            console.log(`${this.toString()} has skipped.`);
            break;
        }
      } else if (
        menuValidationArguments.menuChoiceType === MenuChoiceType.Tile
      ) {
        // user has chosen a valid tile that is within their hand..
        // Get the side of the board they wish to place tile on.
        // creating instance of tile for now b/c validation has not been completed.
        // will remove the tile from player hand at the end.
        const tileChoice = new Tile(parseInt(choice[0]), parseInt(choice[2]));
        const sideChoice = await readLineAndValidate(
          `Which side of the board will you place tile ${tileChoice.toString()}?\n
            Valid options: "L" or "R":\n
          `,
          this.validateBoardSideChoice,
          {}
        );
        // pass this info the board.
        const validMove = board.validateMove(
          tileChoice,
          sideChoice as BoardSide
        );
        if (!validMove) {
          // fkk invalid move restart..
          continue;
        } else {
          // submit move and do all that stuff
          gotMove = true;
        }
      }
    }
    return true;
  }
  validateMenuChoice(
    input: string,
    options: {
      highestPip: number;
      menuChoiceType: MenuChoiceType | undefined;
      hand: Tile[];
    }
  ): boolean {
    // 1 - 4 menu options or
    // a Tile to play.
    // validate menu choice makes sure the user entered a valid menu option.
    // or valid tile in player's hand
    const {highestPip, menuChoiceType, hand} = options;
    let menuOption: number;
    let tile: Tile;
    let inputRejected = false;
    let msg = '';
    if (input.length === 1) {
      // try to parse as menu option.
      menuOption = parseInt(input);
      if (isNaN(menuOption) || menuOption < 1 || menuOption > 4) {
        inputRejected = true;
        msg = `Invalid menu option: ${input}`;
      } else {
        options.menuChoiceType = MenuChoiceType.Menu;
      }
    } else if (input.length === 3) {
      // attempt to process a tile choice.
      const pip1 = parseInt(input[0]);
      const pip2 = parseInt(input[2]);
      const pip1Invalid = isNaN(pip1) || pip1 < 0 || pip1 > highestPip;
      const pip2Invalid = isNaN(pip2) || pip2 < 0 || pip2 > highestPip;
      if (pip1Invalid || pip2Invalid) {
        inputRejected = true;
        msg = `Invalid tile input: ${input}`;
      }
      tile = new Tile(pip1, pip2);
      // make sure the tile is in the player's hand.
      inputRejected = !hand.some(t => {
        return t.pip1 === tile.pip1 && t.pip2 === tile.pip2;
      });
      if (inputRejected) {
        msg = `Tile ${tile.toString()} not in Player's hand.`;
      } else {
        options.menuChoiceType = MenuChoiceType.Tile;
      }
    } else {
      // not valid input at all.
      // format is wrong etc.
      msg = `Invalid input: ${input}`;
      inputRejected = true;
    }
    if (inputRejected) {
      console.log(msg);
      return false;
    } else {
      return true;
    }
  }

  validateBoardSideChoice(input: string): boolean {
    if (input.length !== 1 || (input !== 'R' && input !== 'L')) {
      console.log(`Invalid input: ${input}`);
      return false;
    } else {
      return true;
    }
  }

  displayHand() {
    let rVal = '';
    this.hand.forEach((t, i) => {
      rVal += `${t.toString()}${i === this.hand.length - 1 ? '' : ', '}`;
    });
    console.log(rVal);
  }
}

export class Computer extends Player {
  readonly playerType = PlayerType.Computer;
  play(board: Board): boolean {
    return true;
  }
}
