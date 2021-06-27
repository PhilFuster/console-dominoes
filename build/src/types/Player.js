"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computer = exports.Human = exports.Player = exports.PlayerType = void 0;
const BoardView_1 = require("./BoardView");
const utilities_1 = require("../utilities");
var PlayerType;
(function (PlayerType) {
    PlayerType["Human"] = "H";
    PlayerType["Computer"] = "C";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
var MenuOption;
(function (MenuOption) {
    MenuOption[MenuOption["displayBoard"] = 1] = "displayBoard";
    MenuOption[MenuOption["displayHand"] = 2] = "displayHand";
    MenuOption[MenuOption["skip"] = 3] = "skip";
    MenuOption[MenuOption["help"] = 4] = "help";
})(MenuOption || (MenuOption = {}));
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }
}
exports.Player = Player;
// human can select either a menu option
// or a tile from their hand
var MenuChoiceType;
(function (MenuChoiceType) {
    MenuChoiceType["Menu"] = "m";
    MenuChoiceType["Tile"] = "t";
})(MenuChoiceType || (MenuChoiceType = {}));
class Human extends Player {
    constructor() {
        super(...arguments);
        this.playerType = PlayerType.Human;
    }
    async play(board, game) {
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
        const choice = await utilities_1.readLineAndValidate(`Enter a menu item:
              1: Display Board
              2: Display Hand
              3: Skip
              4: Help
            OR
            Choose a tile to play.
            Example of choosing a tile: 3-5
      `, this.validateMenuChoice, menuValidationArguments);
        if (menuValidationArguments.menuChoiceType === MenuChoiceType.Menu) {
            // perform the menu choice.
            console.log(`User chose menu option: ${choice}`);
            const menuChoice = parseInt(choice);
            switch (menuChoice) {
                case MenuOption.displayBoard:
                    BoardView_1.BoardView.toConsole([
                        { pip1: 0, pip2: 0 },
                        { pip1: 0, pip2: 4 },
                        { pip1: 4, pip2: 6 },
                        { pip1: 6, pip2: 6 },
                        { pip1: 6, pip2: 1 },
                        { pip1: 1, pip2: 1 },
                        { pip1: 1, pip2: 0 },
                    ]);
                    break;
            }
        }
        else if (menuValidationArguments.menuChoiceType === MenuChoiceType.Tile) {
            // user has chosen a tile that is within their hand..
            // Get the side of the board they wish to place tile on.
            // then validate that this works for the board.
            console.log(`User chose tile: ${choice}`);
        }
        return true;
    }
    validateMenuChoice(input, options) {
        // 1 - 4 menu options or
        // a Tile to play.
        // validate menu choice makes sure the user entered a valid menu option.
        // or valid tile in player's hand
        const { highestPip, menuChoiceType, hand } = options;
        let menuOption;
        let tile;
        let inputRejected = false;
        let msg = '';
        if (input.length === 1) {
            // try to parse as menu option.
            menuOption = parseInt(input);
            if (isNaN(menuOption) || menuOption < 1 || menuOption > 4) {
                inputRejected = true;
                msg = `Invalid menu option: ${input}`;
            }
            else {
                options.menuChoiceType = MenuChoiceType.Menu;
            }
        }
        else if (input.length === 3) {
            // attempt to process a tile choice.
            const pip1 = parseInt(input[0]);
            const pip2 = parseInt(input[2]);
            const pip1Invalid = isNaN(pip1) || pip1 < 0 || pip1 > highestPip;
            const pip2Invalid = isNaN(pip2) || pip2 < 0 || pip2 > highestPip;
            if (pip1Invalid || pip2Invalid) {
                inputRejected = true;
                msg = `Invalid tile input: ${input}`;
            }
            tile = { pip1, pip2 };
            // make sure the tile is in the player's hand.
            inputRejected = !hand.some(t => {
                return t.pip1 === tile.pip1 && t.pip2 === tile.pip2;
            });
            if (inputRejected) {
                msg = `Tile ${tile.pip1}-${tile.pip2} not in Player's hand.`;
            }
            else {
                options.menuChoiceType = MenuChoiceType.Tile;
            }
        }
        else {
            // not valid input at all.
            // format is wrong etc.
            msg = `Invalid input: ${input}`;
            inputRejected = true;
        }
        if (inputRejected) {
            console.log(msg);
            return false;
        }
        else {
            return true;
        }
    }
    displayHand() {
        let rVal = '';
        this.hand.forEach((t, i) => {
            rVal += `${t.pip1} - ${t.pip2}${i === this.hand.length - 1 ? '' : ', '}`;
        });
        console.log(rVal);
    }
}
exports.Human = Human;
class Computer extends Player {
    constructor() {
        super(...arguments);
        this.playerType = PlayerType.Computer;
    }
    play(board) {
        return true;
    }
}
exports.Computer = Computer;
//# sourceMappingURL=Player.js.map