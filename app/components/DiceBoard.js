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
                    Dice Result
                </div>
            </div>
        );
    }
}

DiceBoard.propTypes = {
    idleDice: PropTypes.array.isRequired,
    lifecycle: PropTypes.shape({
        isStarted: PropTypes.bool,
        isRollPhase: PropTypes.bool,
        isGuessPhase: PropTypes.bool,
        isDone: PropTypes.bool,
        isRevealPhase: PropTypes.bool,
        isGameWon: PropTypes.bool,
    }).isRequired
};