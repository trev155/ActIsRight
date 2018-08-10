import React from 'react';
import PropTypes from 'prop-types';
import { IdleDiceContainer } from './IdleDiceContainer';

export class DiceBoard extends React.Component {
    render() {
        let gameOverText;
        if (this.props.lifecycle.isRevealPhase && this.props.lifecycle.isGameWon) {
            gameOverText = "You WIN!";
        } else if (this.props.lifecycle.isRevealPhase && !this.props.lifecycle.isGameWon) {
            gameOverText = "You LOSE";
        } else {
            gameOverText = "";
        }

        let rollResult;
        if (this.props.lifecycle.isStarted && this.props.rolls.length > 0 && !this.props.lifecycle.isRevealPhase) {
            rollResult = "You rolled a: " + this.props.rolls[this.props.rolls.length - 1];
        } else {
            rollResult = "";
        }

        return (
            <div className="DiceBoard">
                <div className="idleDice">
                    <IdleDiceContainer idleDice={this.props.idleDice}/>
                </div>
                <div className="middleField">
                    <div className="gameOverText">
                        {gameOverText}
                    </div>
                </div>
                <div className="diceResult">
                    <div className="rollResult">
                        {rollResult}
                    </div>
                </div>
            </div>
        );
    }
}

DiceBoard.propTypes = {
    idleDice: PropTypes.array.isRequired,
    rolls: PropTypes.array,
    lifecycle: PropTypes.shape({
        isStarted: PropTypes.bool,
        isRollPhase: PropTypes.bool,
        isGuessPhase: PropTypes.bool,
        isDone: PropTypes.bool,
        isRevealPhase: PropTypes.bool,
        isGameWon: PropTypes.bool,
    }).isRequired
};