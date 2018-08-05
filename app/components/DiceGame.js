import React from 'react';
import { NumberDisplayBoard } from './NumberDisplayBoard';
import { DiceBoard } from './DiceBoard';
import { InfoPanel } from './InfoPanel';

class GameEngine {
    /*
    Constructor for the GameEngine, which represents the game's current state.
    The GameEngine starts with empty data fields.

    Field Descriptions:
    - allProducts: array of product data, one will be selected when the game starts.
    - product: represents the current product of this game. It's cost must be a 5 digit number, each digit in {1 to 6}
    - rolls: array of at most 4 integers in {1 to 6}. Represents the dice rolls the user has rolled so far
    - guesses: array of at most 4 integers in {-1, 0, 1}. Represents the user guesses so far. 1 = higher, -1 = lower, 0 = match
    - isGameStarted: boolean, indicates if the game has started
    - isRollPhase: boolean, indicates if the game should prompt the user for a roll
    - isGuessPhase: boolean, indicates if the game should prompt the user for a guess
    - isRevealPhase: boolean, indicates if all rolls / guesses are complete
    */
    constructor() {
        // Prices based on the following sites: thecarconnection.com
        this.allProducts = [
            {name: "2016 Acura ILX", cost: "21252", imgPath: "/app/assets/img/dicegame/2016_acura_ilx.jpg"},
            {name: "2009 Audi Q7 Prestige", cost: "16432", imgPath: "/app/assets/img/dicegame/2009_audi_q7_prestige.jpg"},
            {name: "2017 Hyundai Elantra SE", cost: "13644", imgPath: "/app/assets/img/dicegame/2017_hyundai_elantra_se.jpg"}
        ];

        this.product = {
            name: null,
            cost: null,
            imgPath: null
        };
        this.rolls = []
        this.guesses = []

        this.isGameStarted = false;
        this.isRollPhase = false;
        this.isGuessPhase = false;
        this.isRevealPhase = false;
    }

    /*
    Start a game. Returns a new GameEngine object.
    It will be initially configured to be in the first roll phase.
    */
    startGame() {
        this.product = this.allProducts[Math.floor(Math.random() * this.allProducts.length)];
        this.rolls = [];
        this.guesses = [];
        this.isGameStarted = true;
        this.isRollPhase = true;
        this.isGuessPhase = false;
        this.isRevealPhase = false;
        return this;
    }

    /*
    End the current game.
    */
    endGame() {
        this.product = {name: null, cost: null, imgPath: null};
        this.rolls = [];
        this.guesses = [];
        this.isGameStarted = false;
        this.isRollPhase = false;
        this.isGuessPhase = false;
        this.isRevealPhase = false;
        return this;
    }

    /*
    Generate the next roll value.
    If the value matches the next digit of the product, move on to the next digit.
    Otherwise, move into the guess phase.
    */
    roll() {
        let currentRoll = Math.floor((Math.random() * 6) + 1);
        this.rolls.push(currentRoll);

        // for debug
        console.log(currentRoll)
        console.log(this.product.cost[this.rolls.length]);

        const index = this.rolls.length;
        if (currentRoll === parseInt(this.product.cost[index])) {
            this.guesses.push(0);
            return this;
        }

        // if the roll was a 1 or 6, then we auto-set the guess and skip the guess phase
        if (currentRoll === 1) {
            this.guesses.push(1);
        } else if (currentRoll === 6) {
            this.guesses.push(-1);
        } else {
            this.isRollPhase = false;
            this.isGuessPhase = true;
        }

        return this;
    }

    /*
    Generate the next guess value.
    Takes in one parameter, which is true or false (true = "higher").
    */
    guess(val) {
        this.guesses.push(val);

        // indicates that this was the last guess
        if (this.rolls.length === 4) {
            this.isGuessPhase = false;
            this.isRevealPhase = true;
        } else {
            this.isRollPhase = true;
            this.isGuessPhase = false;
        }
        return this;
    }
}

export class DiceGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new GameEngine()
        };

        // Event Handler Bindings
        this.handleStartGameClick = this.handleStartGameClick.bind(this);
        this.handleRollClick = this.handleRollClick.bind(this);
        this.handleLowerClick = this.handleLowerClick.bind(this);
        this.handleHigherClick = this.handleHigherClick.bind(this);
    }

    handleStartGameClick() {
        console.log("start game");

        this.setState({
            game: this.state.game.startGame()
        });
    }

    handleRollClick() {
        console.log("roll");

        this.setState({
            game: this.state.game.roll()
        });
    }

    handleLowerClick() {
        console.log("lower");

        this.setState({
            game: this.state.game.guess(-1)
        });
    }

    handleHigherClick() {
        console.log("higher");

        this.setState({
            game: this.state.game.guess(1)
        });
    }

    render() {
        console.log(this.state.game);

        // intended to be passed into the NumberDisplayBoard
        let gameData = {
            rolls: this.state.game.rolls,
            guesses: this.state.game.guesses,
            cost: this.state.game.product.cost,
            hasStarted: this.state.game.isGameStarted
        };

        // intended to be passed into the InfoPanel
        let handlers = {
            startGameHandler: this.handleStartGameClick,
            rollHandler: this.handleRollClick,
            lowerHandler: this.handleLowerClick,
            higherHandler: this.handleHigherClick
        };
        // intended to be passed into the InfoPanel
        let lifecycle = {
            isStarted: this.state.game.isGameStarted,
            isRollPhase: this.state.game.isRollPhase,
            isGuessPhase: this.state.game.isGuessPhase,
            isRevealPhase: this.state.game.isRevealPhase
        };

        return (
            <div className="DiceGame">
                <div className="left">
                    <div className="banner">
                        <img src="/app/assets/img/dicegame/dicegame.png" height="95%" width="100%"/>
                    </div>
                    <NumberDisplayBoard gameData={gameData}/>
                    <DiceBoard/>
                </div>
                <div className="right">
                    <InfoPanel handlers={handlers} product={this.state.game.product} lifecycle={lifecycle}/>
                </div>
            </div>
        );
    }
}