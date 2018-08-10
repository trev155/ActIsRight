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
- if the panel is "higher" or "lower", or "neither"
*/
class DisplayPanelData {
    constructor(position) {
        this._position = position;
        this._isFilled = false;
        this._isSelected = false;
    }

    get number() {
        return this._number;
    }

    get position() {
        return this._position;
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

    set position(val) {
        this._position = val;
    }

    set isFilled(val) {
        this._isFilled = val;
    }

    set isSelected(val) {
        this._isSelected = val;
    }
}


export class NumberDisplayBoard extends React.Component {
    /*
    Helper function for setting the data of a NumberPanel (during rolls and guesses).

    panelData: a DisplayPanelData object
    actual: actual digit for this position, integer
    guess: user guess for this position, integer
    */
    setData(panelData, actual, guess) {
        if (panelData.position === "higher") {
            if (guess === 1) {
                panelData.isFilled = false;
                panelData.isSelected = true;
            } else if (guess === 0) {
                panelData.number = actual;
                panelData.isFilled = true;
                panelData.isSelected = true;
            }
        }

        if (panelData.position === "lower") {
            if (guess === -1) {
                panelData.isFilled = false;
                panelData.isSelected = true;
            } else if (guess === 0) {
                panelData.number = actual;
                panelData.isFilled = true;
                panelData.isSelected = true;
            }
        }

        return panelData;
    }

    /*
    Helper function for setting the data of a NumberPanel (in the reveal phase).

    panelData: a DisplayPanelData object
    roll: the roll value for this digit, integer
    actual: the actual value for this digit, integer
    */
    setDataReveal(panelData, roll, actual) {
        if (panelData.position === "higher") {
            if (roll < actual) {
                panelData.number = actual;
                panelData.isFilled = true;
            }
        }

        if (panelData.position === "lower") {
            if (roll > actual) {
                panelData.number = actual;
                panelData.isFilled = true;
            }
        }

        return panelData;
    }


    /*
    Render the NumberDisplayBoard.

    The NumberDisplayBoard consists of 2 main types of entities:
    - NumberPanels
    - DicePanels
    */
    render() {
        // Control NumberPanels depending on the game state
        let firstDigit = new DisplayPanelData("neither");
        let secondDigitHigher = new DisplayPanelData("higher");
        let secondDigitLower = new DisplayPanelData("lower");
        let thirdDigitHigher = new DisplayPanelData("higher");
        let thirdDigitLower = new DisplayPanelData("lower");
        let fourthDigitHigher = new DisplayPanelData("higher");
        let fourthDigitLower = new DisplayPanelData("lower");
        let fifthDigitHigher = new DisplayPanelData("higher");
        let fifthDigitLower = new DisplayPanelData("lower");

        if (this.props.lifecycle.isStarted) {
            firstDigit.number = parseInt(this.props.gameData.cost[0]);
            firstDigit.isFilled = true;
            firstDigit.isSelected = true;
        } else {
            firstDigit.isFilled = false;
            firstDigit.isSelected = false;
        }

        if (this.props.lifecycle.isStarted) {
            secondDigitHigher = this.setData(secondDigitHigher, parseInt(this.props.gameData.cost[1]), this.props.gameData.guesses[0]);
            secondDigitLower = this.setData(secondDigitLower, parseInt(this.props.gameData.cost[1]), this.props.gameData.guesses[0]);
            thirdDigitHigher = this.setData(thirdDigitHigher, parseInt(this.props.gameData.cost[2]), this.props.gameData.guesses[1]);
            thirdDigitLower = this.setData(thirdDigitLower, parseInt(this.props.gameData.cost[2]), this.props.gameData.guesses[1]);
            fourthDigitHigher = this.setData(fourthDigitHigher, parseInt(this.props.gameData.cost[3]), this.props.gameData.guesses[2]);
            fourthDigitLower = this.setData(fourthDigitLower, parseInt(this.props.gameData.cost[3]), this.props.gameData.guesses[2]);
            fifthDigitHigher = this.setData(fifthDigitHigher, parseInt(this.props.gameData.cost[4]), this.props.gameData.guesses[3]);
            fifthDigitLower = this.setData(fifthDigitLower, parseInt(this.props.gameData.cost[4]), this.props.gameData.guesses[3]);
        }

        if (this.props.lifecycle.isRevealPhase) {
            secondDigitHigher = this.setDataReveal(secondDigitHigher, this.props.gameData.rolls[0], this.props.gameData.cost[1]);
            secondDigitLower = this.setDataReveal(secondDigitLower, this.props.gameData.rolls[0], this.props.gameData.cost[1]);
            thirdDigitHigher = this.setDataReveal(thirdDigitHigher, this.props.gameData.rolls[1], this.props.gameData.cost[2]);
            thirdDigitLower = this.setDataReveal(thirdDigitLower, this.props.gameData.rolls[1], this.props.gameData.cost[2]);
            fourthDigitHigher = this.setDataReveal(fourthDigitHigher, this.props.gameData.rolls[2], this.props.gameData.cost[3]);
            fourthDigitLower = this.setDataReveal(fourthDigitLower, this.props.gameData.rolls[2], this.props.gameData.cost[3]);
            fifthDigitHigher = this.setDataReveal(fifthDigitHigher, this.props.gameData.rolls[3], this.props.gameData.cost[4]);
            fifthDigitLower = this.setDataReveal(fifthDigitLower, this.props.gameData.rolls[3], this.props.gameData.cost[4]);
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