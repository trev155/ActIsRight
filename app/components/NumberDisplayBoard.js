import React from 'react';
import PropTypes from 'prop-types';
import { NumberPanel } from './NumberPanel';
import { DicePanel } from './DicePanel';

/*
A helper class that holds data for a single NumberPanel.
It holds data on:
- the number to be displayed
- whether the number should be displayed
- whether the panel should be selected
*/
class DisplayPanelData {
    constructor() {
        this._isFilled = false;
        this._isSelected = false;
    }

    get number() {
        return this._number;
    }

    get isFilled() {
        return this._isFilled;
    }

    get isSelected() {
        return this._isSelected
    }

    set number(num) {
        this._number = num;
    }

    set isFilled(val) {
        this._isFilled = val;
    }

    set isSelected(val) {
        this._isSelected = val;
    }
}


export class NumberDisplayBoard extends React.Component {
    setData() {

    }

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
        let firstDigit = new DisplayPanelData();
        let secondDigitHigher = new DisplayPanelData();
        let secondDigitLower = new DisplayPanelData();
        let thirdDigitHigher = new DisplayPanelData();
        let thirdDigitLower = new DisplayPanelData();
        let fourthDigitHigher = new DisplayPanelData();
        let fourthDigitLower = new DisplayPanelData();
        let fifthDigitHigher = new DisplayPanelData();
        let fifthDigitLower = new DisplayPanelData();

        if (this.props.lifecycle.isStarted) {
            firstDigit.number = parseInt(this.props.gameData.cost[0]);
            firstDigit.isFilled = true;
            firstDigit.isSelected = true;
        } else {
            firstDigit.isFilled = false;
            firstDigit.isSelected = false;
        }

        if (this.props.lifecycle.isStarted) {
            if (this.props.gameData.guesses[0] === 1) {
                secondDigitHigher.isFilled = false;
                secondDigitHigher.isSelected = true;
            } else if (this.props.gameData.guesses[0] === -1) {
                secondDigitLower.isFilled = false;
                secondDigitLower.isSelected = true;
            } else if (this.props.gameData.guesses[0] === 0) {
                secondDigitHigher.number = parseInt(this.props.gameData.cost[1]);
                secondDigitLower.number = parseInt(this.props.gameData.cost[1]);
                secondDigitHigher.isFilled = true;
                secondDigitHigher.isSelected = true;
                secondDigitLower.isFilled = true;
                secondDigitLower.isSelected = true;
            }

            if (this.props.gameData.guesses[1] === 1) {
                thirdDigitHigher.isFilled = false;
                thirdDigitHigher.isSelected = true;
            } else if (this.props.gameData.guesses[1] === -1) {
                thirdDigitLower.isFilled = false;
                thirdDigitLower.isSelected = true;
            } else if (this.props.gameData.guesses[1] === 0) {
                thirdDigitHigher.number = parseInt(this.props.gameData.cost[2]);
                thirdDigitLower.number = parseInt(this.props.gameData.cost[2]);
                thirdDigitHigher.isFilled = true;
                thirdDigitHigher.isSelected = true;
                thirdDigitLower.isFilled = true;
                thirdDigitLower.sSelected = true;
            }

            if (this.props.gameData.guesses[2] === 1) {
                fourthDigitHigher.isFilled = false;
                fourthDigitHigher.isSelected = true;
            } else if (this.props.gameData.guesses[2] === -1) {
                fourthDigitLower.isFilled = false;
                fourthDigitLower.isSelected = true;
            } else if (this.props.gameData.guesses[2] === 0) {
                fourthDigitHigher.number = parseInt(this.props.gameData.cost[3]);
                fourthDigitLower.number = parseInt(this.props.gameData.cost[3]);
                fourthDigitHigher.isFilled = true;
                fourthDigitHigher.isSelected = true;
                fourthDigitLower.isFilled = true;
                fourthDigitLower.isSelected = true;
            }

            if (this.props.gameData.guesses[3] === 1) {
                fifthDigitHigher.isFilled = false;
                fifthDigitHigher.isSelected = true;
            } else if (this.props.gameData.guesses[3] === -1) {
                fifthDigitLower.isFilled = false;
                fifthDigitLower.isSelected = true;
            } else if (this.props.gameData.guesses[3] === 0) {
                fifthDigitHigher.number = parseInt(this.props.gameData.cost[4]);
                fifthDigitLower.number = parseInt(this.props.gameData.cost[4]);
                fifthDigitHigher.isFilled = true;
                fifthDigitHigher.isSelected = true;
                fifthDigitLower.isFilled = true;
                fifthDigitLower.isSelected = true;
            }
        }

        // If we're in the reveal phase, override some of the above.
        if (this.props.lifecycle.isRevealPhase) {
            if (this.props.gameData.rolls[0] < parseInt(this.props.gameData.cost[1])) {
                secondDigitHigher.number = parseInt(this.props.gameData.cost[1]);
                secondDigitHigher.isFilled = true;
            } else if (this.props.gameData.rolls[0] > parseInt(this.props.gameData.cost[1])) {
                secondDigitLower.number = parseInt(this.props.gameData.cost[1]);
                secondDigitLower.isFilled = true;
            }

            if (this.props.gameData.rolls[1] < parseInt(this.props.gameData.cost[2])) {
                thirdDigitHigher.number = parseInt(this.props.gameData.cost[2]);
                thirdDigitHigher.isFilled = true;
            } else if (this.props.gameData.rolls[1] > parseInt(this.props.gameData.cost[2])) {
                thirdDigitLower.number = parseInt(this.props.gameData.cost[2]);
                thirdDigitLower.isFilled = true;
            }

            if (this.props.gameData.rolls[2] < parseInt(this.props.gameData.cost[3])) {
                fourthDigitHigher.number = parseInt(this.props.gameData.cost[3]);
                fourthDigitHigher.isFilled = true;
            } else if (this.props.gameData.rolls[2] > parseInt(this.props.gameData.cost[3])) {
                fourthDigitLower.number = parseInt(this.props.gameData.cost[3]);
                fourthDigitLower.isFilled = true;
            }

            if (this.props.gameData.rolls[3] < parseInt(this.props.gameData.cost[4])) {
                fifthDigitHigher.number = parseInt(this.props.gameData.cost[4]);
                fifthDigitHigher.isFilled = true;
            } else if (this.props.gameData.rolls[3] > parseInt(this.props.gameData.cost[4])) {
                fifthDigitLower.number = parseInt(this.props.gameData.cost[4]);
                fifthDigitLower.isFilled = true;
            }
        }

        return (
            <div className="NumberDisplayBoard">
                <div className="col col1">
                    <NumberPanel number={firstDigit.number} isFilled={firstDigit.isFilled} isSelected={firstDigit.isSelected}/>
                </div>
                <div className="col col2">
                    <NumberPanel number={secondDigitHigher.number} isFilled={secondDigitHigher.isFilled} isSelected={secondDigitHigher.isSelected}/>
                    <DicePanel number={this.props.gameData.rolls[0]}/>
                    <NumberPanel number={secondDigitLower.number} isFilled={secondDigitLower.isFilled} isSelected={secondDigitLower.isSelected}/>
                </div>
                <div className="col col3">
                    <NumberPanel number={thirdDigitHigher.number} isFilled={thirdDigitHigher.isFilled} isSelected={thirdDigitHigher.isSelected}/>
                    <DicePanel number={this.props.gameData.rolls[1]}/>
                    <NumberPanel number={thirdDigitLower.number} isFilled={thirdDigitLower.isFilled} isSelected={thirdDigitLower.isSelected}/>
                </div>
                <div className="col col4">
                    <NumberPanel number={fourthDigitHigher.number} isFilled={fourthDigitHigher.isFilled} isSelected={fourthDigitHigher.isSelected}/>
                    <DicePanel number={this.props.gameData.rolls[2]}/>
                    <NumberPanel number={fourthDigitLower.number} isFilled={fourthDigitLower.isFilled} isSelected={fourthDigitLower.isSelected}/>
                </div>
                <div className="col col5">
                    <NumberPanel number={fifthDigitHigher.number} isFilled={fifthDigitHigher.isFilled} isSelected={fifthDigitHigher.isSelected}/>
                    <DicePanel number={this.props.gameData.rolls[3]}/>
                    <NumberPanel number={fifthDigitLower.number} isFilled={fifthDigitLower.isFilled} isSelected={fifthDigitLower.isSelected}/>
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
        isRevealPhase: PropTypes.bool,
        isGameWon: PropTypes.bool
    }).isRequired
};