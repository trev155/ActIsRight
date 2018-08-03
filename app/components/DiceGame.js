import React from 'react';
import { NumberDisplayBoard } from './NumberDisplayBoard';
import { DiceBoard } from './DiceBoard';
import { InfoPanel } from './InfoPanel';

class GameState {
    constructor() {
        // cost should always be a 5-digit number
        this.product = {
            name: null,
            cost: null,
            imgPath: null
        };
        // array of at most 4 values (integers, range 1-6) representing user rolls
        this.rolls = []
        // array of at most 4 values (booleans) representing whether the user guessed higher or lower (true = higher)
        this.guesses = []

        this.isGameStarted = false;
        this.isRollPhase = false;
        this.isGuessPhase = false;
    }
}

export class DiceGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: new GameState()
        };
    }

    render() {
        console.log(this.state);

        return (
            <div className="DiceGame">
                <div className="left">
                    <div className="banner">
                        <img src="/app/assets/img/dicegame.png" height="95%" width="100%"/>
                    </div>
                    <NumberDisplayBoard/>
                    <DiceBoard/>
                </div>
                <div className="right">
                    <InfoPanel/>
                </div>
            </div>
        );
    }
}