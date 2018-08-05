import React from 'react';
import { NumberDisplayBoard } from './NumberDisplayBoard';
import { DiceBoard } from './DiceBoard';
import { InfoPanel } from './InfoPanel';

class GameEngine {
    /*
    Constructor for the GameEngine, which represents the game's current state.
    The GameEngine starts with no data.
    */
    constructor() {
        // cost should always be a 5-digit number
        this.product = {
            name: null,
            cost: null,
            imgPath: null
        };
        // array of at most 4 values (integers, range 1-6) representing user rolls
        this.rolls = []
        // array of at most 4 values representing whether the user guessed higher or lower, where:
        // true = higher, false = lower, null = dice match
        this.guesses = []

        this.isGameStarted = false;
        this.isRollPhase = false;
        this.isGuessPhase = false;
        this.isRevealPhase = false;

        // Prices based on the following sites: thecarconnection.com,
        this.allProducts = [
            {name: "2016 Acura ILX", cost: "21252", imgPath: "/app/assets/img/dicegame/2016_acura_ilx.jpg"},
            {name: "2009 Audi Q7 Prestige", cost: "16432", imgPath: "/app/assets/img/dicegame/2009_audi_q7_prestige.jpg"},
            {name: "2017 Hyundai Elantra SE", cost: "13644", imgPath: "/app/assets/img/dicegame/2017_hyundai_elantra_se.jpg"}
        ];
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

    /* End the current game. */
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
            this.guesses.push(null);
            return this;
        }

        // if the roll was a 1 or 6, then we auto-set the guess and skip the guess phase
        if (currentRoll === 1) {
            this.guesses.push(true);
        } else if (currentRoll === 6) {
            this.guesses.push(false);
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
            game: this.state.game.guess(false)
        });
    }

    handleHigherClick() {
        console.log("higher");

        this.setState({
            game: this.state.game.guess(true)
        });
    }

    render() {
        console.log(this.state.game);
        let gameData = {
            rolls: this.state.game.rolls,
            guesses: this.state.game.guesses,
            cost: this.state.game.product.cost
        };

        let handlers = {
            startGameHandler: this.handleStartGameClick,
            rollHandler: this.handleRollClick,
            lowerHandler: this.handleLowerClick,
            higherHandler: this.handleHigherClick
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
                    <InfoPanel handlers={handlers} shouldRenderProduct={this.state.game.isGameStarted} product={this.state.game.product}/>
                </div>
            </div>
        );
    }
}