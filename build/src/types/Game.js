"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Board_1 = require("./Board");
const Player_1 = require("./Player");
const Stock_1 = require("./Stock");
const utilities_1 = require("../utilities");
class Game {
    constructor(players, options, board) {
        this.players = players;
        this.options = options;
        this.board = board;
        this.stock = new Stock_1.Stock();
        this.tiles = [];
    }
    static fromNewGame() {
        /**
         * static builder function that initializes a new Game
         */
        const players = [];
        const board = Board_1.Board.fromNewBoard();
        // maxPlayers dflt to 4
        // numPlayers dflt to 0 ; gotta get from user
        // highestPip dflt to 6 for now. Later I will add feature to maybe let
        // user choose
        const options = {
            maxPlayers: 4,
            numPlayers: 0,
            highestPip: 6,
        };
        const newGame = new Game(players, options, board);
        return newGame;
    }
    displayIntroduction() {
        console.log('Welcome to Console Dominoes!');
        console.log('You get to decide how many players (1 - 4) and how many are humans. The remainder will be computers.');
    }
    async start() {
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
    async play() {
        // what does a game look like..
        let nextPlayer = 0;
        let isWinner = false;
        while (!isWinner) {
            nextPlayer = this.getNextPlayer(nextPlayer);
            await this.players[nextPlayer].play(this.board, this);
        }
    }
    getNextPlayer(nextPlayer) {
        if (this.tiles.length > 0) {
            if (nextPlayer === this.tiles.length - 1) {
                nextPlayer = 0;
            }
            else {
                nextPlayer++;
            }
            return nextPlayer;
        }
        else {
            return this.decideFirstPlayer();
        }
    }
    decideFirstPlayer() {
        // find the player with the highest double
        let highestDouble;
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
    createPlayers(numHumanPlayers) {
        /**
         * @param numHumanPlayers - number of human players
         */
        const players = [];
        // numHumanPlayers is the number of human players.
        // numPlayers is going to be between 0 and maxPlayers
        for (let playerCount = 0; playerCount < numHumanPlayers; playerCount++) {
            players.push(new Player_1.Human(`P${playerCount + 1}`));
        }
        // create remaining players as Computers
        for (let playerCount = players.length; playerCount < this.options.numPlayers; playerCount++) {
            players.push(new Player_1.Computer(`C${playerCount}`));
        }
        this.players = players;
    }
    // Alert user to number of Computer players
    validateNumPlayersInput(input) {
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
            console.log(`Input "${input}" is invalid. Number of players must be a number between 1 and 4`);
            return false;
        }
        else {
            return true;
        }
    }
    validateNumHumansInput(input, options) {
        /**
         * Ensures input is an integer and a number between 0 and numPlayers
         *
         * @param input - input from commandline
         *
         * @returns boolean: true= input is a number between 0 and 4
         */
        const numHumans = parseInt(input);
        if (isNaN(numHumans) || numHumans > options.numPlayers || numHumans < 0) {
            console.log(`Input "${input}" is invalid. Number of human players must be a value between 0 and ${this.options.numPlayers}`);
            return false;
        }
        else {
            return true;
        }
    }
    async getNumberOfPlayers() {
        let value = '';
        let numPlayers = 0;
        value = await utilities_1.readLineAndValidate('Enter the number of Players (1 - 4):\n', this.validateNumPlayersInput, {});
        // doesnt return till valid input is returned.
        numPlayers = parseInt(value);
        return numPlayers;
    }
    async getNumberOfHumanPlayers() {
        const value = await utilities_1.readLineAndValidate(`Enter the number of Human Players (max ${this.options.numPlayers}):\n`, this.validateNumHumansInput, { numPlayers: this.options.numPlayers });
        const numHumans = parseInt(value);
        return numHumans;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map