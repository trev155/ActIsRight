import React from 'react';
import PropTypes from 'prop-types';
import { NumberPanel } from './NumberPanel';
import { DicePanel } from './DicePanel';

export class NumberDisplayBoard extends React.Component {
    /*
    Render the NumberDisplayBoard.

    The NumberDisplayBoard consists of 2 main types of entities:
    - NumberPanels
    - DicePanels

    The value of each NumberPanel depends on:
    - cost of the product
    - the guessed values array, the user guesses

    The value of each DicePanel depends on:
    - the values in the rolls array, the dice roll values
    */
    render() {
        // Left most digit should always be displayed, unless the game has not started yet
        let firstDigit;
        let firstDigitIsFilled;
        let firstDigitIsSelected;
        if (this.props.lifecycle.isStarted) {
            firstDigit = parseInt(this.props.gameData.cost[0]);
            firstDigitIsFilled = true;
            firstDigitIsSelected = true;
        } else {
            firstDigit = null;
            firstDigitIsFilled = false;
            firstDigitIsSelected = false;
        }

        // The rest of the digits
        let secondDigitHigher;
        let secondDigitLower;
        let thirdDigitHigher;
        let thirdDigitLower;
        let fourthDigitHigher;
        let fourthDigitLower;
        let fifthDigitHigher;
        let fifthDigitLower;

        let secondDigitHigherIsFilled;
        let secondDigitLowerIsFilled;
        let secondDigitHigherIsSelected;
        let secondDigitLowerIsSelected;

        let thirdDigitHigherIsFilled;
        let thirdDigitLowerIsFilled;
        let thirdDigitHigherIsSelected;
        let thirdDigitLowerIsSelected;

        let fourthDigitHigherIsFilled;
        let fourthDigitLowerIsFilled;
        let fourthDigitHigherIsSelected;
        let fourthDigitLowerIsSelected;

        let fifthDigitHigherIsFilled;
        let fifthDigitLowerIsFilled;
        let fifthDigitHigherIsSelected;
        let fifthDigitLowerIsSelected;

        if (this.props.lifecycle.isStarted) {
            if (this.props.gameData.guesses[0] === 1) {
                secondDigitHigherIsFilled = false;
                secondDigitHigherIsSelected = true;
            } else if (this.props.gameData.guesses[0] === -1) {
                secondDigitLowerIsFilled = false;
                secondDigitLowerIsSelected = true;
            } else if (this.props.gameData.guesses[0] === 0) {
                secondDigitHigher = parseInt(this.props.gameData.cost[1]);
                secondDigitLower = parseInt(this.props.gameData.cost[1]);
                secondDigitHigherIsFilled = true;
                secondDigitHigherIsSelected = true;
                secondDigitLowerIsFilled = true;
                secondDigitLowerIsSelected = true;
            }

            if (this.props.gameData.guesses[1] === 1) {
                thirdDigitHigherIsFilled = false;
                thirdDigitHigherIsSelected = true;
            } else if (this.props.gameData.guesses[1] === -1) {
                thirdDigitLowerIsFilled = false;
                thirdDigitLowerIsSelected = true;
            } else if (this.props.gameData.guesses[1] === 0) {
                thirdDigitHigher = parseInt(this.props.gameData.cost[2]);
                thirdDigitLower = parseInt(this.props.gameData.cost[2]);
                thirdDigitHigherIsFilled = true;
                thirdDigitHigherIsSelected = true;
                thirdDigitLowerIsFilled = true;
                thirdDigitLowerIsSelected = true;
            }

            if (this.props.gameData.guesses[2] === 1) {
                fourthDigitHigherIsFilled = false;
                fourthDigitHigherIsSelected = true;
            } else if (this.props.gameData.guesses[2] === -1) {
                fourthDigitLowerIsFilled = false;
                fourthDigitLowerIsSelected = true;
            } else if (this.props.gameData.guesses[2] === 0) {
                fourthDigitHigher = parseInt(this.props.gameData.cost[3]);
                fourthDigitLower = parseInt(this.props.gameData.cost[3]);
                fourthDigitHigherIsFilled = true;
                fourthDigitHigherIsSelected = true;
                fourthDigitLowerIsFilled = true;
                fourthDigitLowerIsSelected = true;
            }

            if (this.props.gameData.guesses[3] === 1) {
                fifthDigitHigherIsFilled = false;
                fifthDigitHigherIsSelected = true;
            } else if (this.props.gameData.guesses[3] === -1) {
                fifthDigitLowerIsFilled = false;
                fifthDigitLowerIsSelected = true;
            } else if (this.props.gameData.guesses[3] === 0) {
                fifthDigitHigher = parseInt(this.props.gameData.cost[4]);
                fifthDigitLower = parseInt(this.props.gameData.cost[4]);
                fifthDigitHigherIsFilled = true;
                fifthDigitHigherIsSelected = true;
                fifthDigitLowerIsFilled = true;
                fifthDigitLowerIsSelected = true;
            }
        }

        // If we're in the reveal phase, override some of the above.
        if (this.props.lifecycle.isRevealPhase) {
            if (this.props.gameData.rolls[0] < parseInt(this.props.gameData.cost[1])) {
                secondDigitHigher = parseInt(this.props.gameData.cost[1]);
                secondDigitHigherIsFilled = true;
            } else if (this.props.gameData.rolls[0] > parseInt(this.props.gameData.cost[1])) {
                secondDigitLower = parseInt(this.props.gameData.cost[1]);
                secondDigitLowerIsFilled = true;
            }

            if (this.props.gameData.rolls[1] < parseInt(this.props.gameData.cost[2])) {
                thirdDigitHigher = parseInt(this.props.gameData.cost[2]);
                thirdDigitHigherIsFilled = true;
            } else if (this.props.gameData.rolls[1] > parseInt(this.props.gameData.cost[2])) {
                thirdDigitLower = parseInt(this.props.gameData.cost[2]);
                thirdDigitLowerIsFilled = true;
            }

            if (this.props.gameData.rolls[2] < parseInt(this.props.gameData.cost[3])) {
                fourthDigitHigher = parseInt(this.props.gameData.cost[3]);
                fourthDigitHigherIsFilled = true;
            } else if (this.props.gameData.rolls[2] > parseInt(this.props.gameData.cost[3])) {
                fourthDigitLower = parseInt(this.props.gameData.cost[3]);
                fourthDigitLowerIsFilled = true;
            }

            if (this.props.gameData.rolls[3] < parseInt(this.props.gameData.cost[4])) {
                fifthDigitHigher = parseInt(this.props.gameData.cost[4]);
                fifthDigitHigherIsFilled = true;
            } else if (this.props.gameData.rolls[3] > parseInt(this.props.gameData.cost[4])) {
                fifthDigitLower = parseInt(this.props.gameData.cost[4]);
                fifthDigitLowerIsFilled = true;
            }
        }

        return (
            <div className="NumberDisplayBoard">
                <div className="col col1">
                    <NumberPanel number={firstDigit} isFilled={firstDigitIsFilled} isSelected={firstDigitIsSelected}/>
                </div>
                <div className="col col2">
                    <NumberPanel number={secondDigitHigher} isFilled={secondDigitHigherIsFilled} isSelected={secondDigitHigherIsSelected}/>
                    <DicePanel number={this.props.gameData.rolls[0]}/>
                    <NumberPanel number={secondDigitLower} isFilled={secondDigitLowerIsFilled} isSelected={secondDigitLowerIsSelected}/>
                </div>
                <div className="col col3">
                    <NumberPanel number={thirdDigitHigher} isFilled={thirdDigitHigherIsFilled} isSelected={thirdDigitHigherIsSelected}/>
                    <DicePanel number={this.props.gameData.rolls[1]}/>
                    <NumberPanel number={thirdDigitLower} isFilled={thirdDigitLowerIsFilled} isSelected={thirdDigitLowerIsSelected}/>
                </div>
                <div className="col col4">
                    <NumberPanel number={fourthDigitHigher} isFilled={fourthDigitHigherIsFilled} isSelected={fourthDigitHigherIsSelected}/>
                    <DicePanel number={this.props.gameData.rolls[2]}/>
                    <NumberPanel number={fourthDigitLower} isFilled={fourthDigitLowerIsFilled} isSelected={fourthDigitLowerIsSelected}/>
                </div>
                <div className="col col5">
                    <NumberPanel number={fifthDigitHigher} isFilled={fifthDigitHigherIsFilled} isSelected={fifthDigitHigherIsSelected}/>
                    <DicePanel number={this.props.gameData.rolls[3]}/>
                    <NumberPanel number={fifthDigitLower} isFilled={fifthDigitLowerIsFilled} isSelected={fifthDigitLowerIsSelected}/>
                </div>
            </div>
        );
    }
}

NumberDisplayBoard.propTypes = {
    gameData: PropTypes.shape({
        rolls: PropTypes.array,
        guesses: PropTypes.array,
        cost: PropTypes.string,
    }).isRequired,
    lifecycle: PropTypes.shape({
        isStarted: PropTypes.bool,
        isRollPhase: PropTypes.bool,
        isGuessPhase: PropTypes.bool,
        isDone: PropTypes.bool,
        isRevealPhase: PropTypes.bool
    }).isRequired
};