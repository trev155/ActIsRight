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
    - isDone: boolean, indicates if the game is "done", the interim between the last guess and the reveal phase
    - isRevealPhase: boolean, indicates if all rolls / guesses are complete
    - isGameWon: boolean, indicates if the user won the game
    - idleDiceFaces: array of 4 integers from 1 to 6. Represents the idle dice faces that will be displayed in the DiceBoard
    */
    constructor() {
        // Prices based on the following sites: thecarconnection.com
        this.allProducts = [
            {name: "2016 Acura ILX", cost: "21252", imgPath: "/app/assets/img/dicegame/2016_acura_ilx.jpg"},
            {name: "2009 Audi Q7 Prestige", cost: "16432", imgPath: "/app/assets/img/dicegame/2009_audi_q7_prestige.jpg"},
            {name: "2017 Hyundai Elantra SE", cost: "13644", imgPath: "/app/assets/img/dicegame/2017_hyundai_elantra_se.jpg"},
            {name: "2014 Dodge Durango", cost: "21641", imgPath: "/app/assets/img/dicegame/2014_dodge_durango.jpg"},
            {name: "2016 Jaguar XF Prestige", cost: "21641", imgPath: "/app/assets/img/dicegame/2016_jaguar_xf_prestige.jpg"},
            {name: "2011 Toyota Avalon", cost: "16144", imgPath: "/app/assets/img/dicegame/2011_toyota_avalon.jpg"},
            {name: "2013 Lincoln MKS", cost: "14622", imgPath: "/app/assets/img/dicegame/2013_lincoln_mks.jpg"},
            {name: "2017 Infiniti QX60", cost: "36513", imgPath: "/app/assets/img/dicegame/2017_infiniti_qx60.jpg"},
            {name: "2016 Chevrolet Malibu", cost: "13634", imgPath: "/app/assets/img/dicegame/2016_chevrolet_malibu.jpg"},
            {name: "2018 Ford Mustang Ecoboost", cost: "21641", imgPath: "/app/assets/img/dicegame/2018_ford_mustang_ecoboost.jpg"}
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
        this.isDone = false;
        this.isRevealPhase = false;
        this.isGameWon = false;
        this.idleDiceFaces = [];
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
        this.isDone = false;
        this.isRevealPhase = false;
        this.isGameWon = false;

        this.idleDiceFaces = [];
        for (let i = 0; i < 4; i++) {
            this.idleDiceFaces.push(Math.floor((Math.random() * 6) + 1));
        }
        return this;
    }

    /*
    Generate the next roll value.
    If the value matches the next digit of the product, move on to the next digit.
    Otherwise, move into the guess phase.
    */
    roll() {
        // Play sound effect
        new Audio("/app/assets/audio/diceroll.mp3").play();

        let currentRoll = Math.floor((Math.random() * 6) + 1);
        this.rolls.push(currentRoll);

        const index = this.rolls.length;
        if (currentRoll === parseInt(this.product.cost[index])) {
            this.guesses.push(0);
            if (this.guesses.length === 4) {
                this.isRollPhase = false;
                this.isDone = true;
            }
            return this;
        }

        // if the roll was a 1 or 6, then we take care of the guess phase automatically
        if (currentRoll === 1 || currentRoll === 6) {
            if (currentRoll === 1) {
                this.guesses.push(1);
            } else if (currentRoll === 6) {
                this.guesses.push(-1);
            }
            // check the case where this was the last guess
            if (this.guesses.length === 4) {
                this.isDone = true;
            } else {
                this.isRollPhase = true;
            }
        } else {
            this.isGuessPhase = true;
            this.isRollPhase = false;
        }

        return this;
    }

    /*
    Generate the next guess value.
    Takes in one parameter, which is the user guess (0, 1, or -1 for match, higher, lower).
    */
    guess(val) {
        // Play sound effect
        new Audio("/app/assets/audio/ding.mp3").play();

        this.guesses.push(val);

        // indicates that this was the last guess
        if (this.guesses.length === 4) {
            this.isGuessPhase = false;
            this.isRollPhase = false;
            this.isDone = true;
        } else {
            this.isRollPhase = true;
            this.isGuessPhase = false;
        }

        return this;
    }

    /*
    Reveal the actual retail price of the product.
    This is done on the visual side by setting isRevealPhase = true, and passing this state to the other components.

    This function should also determine if the user won or lost the game. Indicate this with the isGameWon field.
    */
    reveal() {
        this.isRevealPhase = true;

        // Determine if game won
        let incorrectGuess = false;
        for (let i = 0; i < this.rolls.length; i++) {
            if (this.guesses[i] === 0) {
                continue;
            } else if (this.guesses[i] === 1 && this.rolls[i] < parseInt(this.product.cost[i + 1])) {
                continue;
            } else if (this.guesses[i] === -1 && this.rolls[i] > parseInt(this.product.cost[i + 1])) {
                continue;
            } else {
                incorrectGuess = true;
                break;
            }
        }
        this.isGameWon = !incorrectGuess;

        // Play music on victory or loss
        if (this.isGameWon) {
            new Audio("/app/assets/audio/priceisright_victory.mp3").play();
        } else {
            new Audio("/app/assets/audio/priceisright_losehorn.mp3").play();
        }

        return this;
    }
}


/*
This class is the primary entry point for the entire "DiceGame".
It is a stateful component, so it sends out event handlers and data to other components, which in turn
update this parent component. The DiceGame component is the top-level component. It maintains the
state of the game.
*/
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
        this.handleRevealClick = this.handleRevealClick.bind(this);
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

    handleRevealClick() {
        console.log("reveal");

        this.setState({
            game: this.state.game.reveal()
        });
    }

    /*
    Render the DiceGame.

    The DiceGame consists of 3 major panels:
    1. NumberDisplayBoard - where the numbers appear
    2. DiceBoard - where the dice appear (mostly for visual aesthethics)
    3. InfoPanel - where instructions and game controls appear
    */
    render() {
        console.log(this.state.game);

        // Game information that the NumberDisplayBoard uses to determine what to display
        let gameData = {
            rolls: this.state.game.rolls,
            guesses: this.state.game.guesses,
            cost: this.state.game.product.cost,
        };

        // Button click handlers meant to be passed into the InfoPanel
        let handlers = {
            startGameHandler: this.handleStartGameClick,
            rollHandler: this.handleRollClick,
            lowerHandler: this.handleLowerClick,
            higherHandler: this.handleHigherClick,
            revealHandler: this.handleRevealClick
        };

        // Game lifecycle information that can be used to determine what to render
        let lifecycle = {
            isStarted: this.state.game.isGameStarted,
            isRollPhase: this.state.game.isRollPhase,
            isGuessPhase: this.state.game.isGuessPhase,
            isDone: this.state.game.isDone,
            isRevealPhase: this.state.game.isRevealPhase,
            isGameWon: this.state.game.isGameWon
        };

        // The Idle Dice faces to display
        let idleDice = Array.from(this.state.game.idleDiceFaces);
        idleDice = idleDice.splice(0, 4 - this.state.game.rolls.length);

        return (
            <div className="DiceGame">
                <div className="left">
                    <div className="banner">
                        <img src="/app/assets/img/dicegame/dicegame.png"/>
                    </div>
                    <NumberDisplayBoard gameData={gameData} lifecycle={lifecycle}/>
                    <DiceBoard idleDice={idleDice} rolls={this.state.game.rolls} lifecycle={lifecycle}/>
                </div>
                <div className="right">
                    <InfoPanel handlers={handlers} product={this.state.game.product} lifecycle={lifecycle}/>
                </div>
            </div>
        );
    }
}