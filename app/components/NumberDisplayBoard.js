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
        let firstDigitMode;
        if (this.props.gameData.hasStarted) {
            firstDigit = parseInt(this.props.gameData.cost[0]);
            firstDigitMode = 3;
        } else {
            firstDigit = null;
            firstDigitMode = 1;
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

        let secondModeHigher = 1;
        let secondModeLower = 1;
        let thirdModeLower = 1;
        let thirdModeHigher = 1;
        let fourthModeLower = 1;
        let fourthModeHigher = 1;
        let fifthModeHigher = 1;
        let fifthModeLower = 1;

        if (this.props.gameData.hasStarted) {
            if (this.props.gameData.guesses[0] === 1) {
                secondModeHigher = 2;
            } else if (this.props.gameData.guesses[0] === -1) {
                secondModeLower = 2;
            } else if (this.props.gameData.guesses[0] === 0) {
                secondDigitHigher = parseInt(this.props.gameData.cost[1]);
                secondDigitLower = parseInt(this.props.gameData.cost[1]);
                secondModeHigher = 3;
                secondModeLower = 3;
            }

            if (this.props.gameData.guesses[1] === 1) {
                thirdModeHigher = 2;
            } else if (this.props.gameData.guesses[1] === -1) {
                thirdModeLower = 2;
            } else if (this.props.gameData.guesses[1] === 0) {
                thirdDigitHigher = parseInt(this.props.gameData.cost[2]);
                thirdDigitLower = parseInt(this.props.gameData.cost[2]);
                thirdModeHigher = 3;
                thirdModeLower = 3;
            }

            if (this.props.gameData.guesses[2] === 1) {
                fourthModeHigher = 2;
            } else if (this.props.gameData.guesses[2] === -1) {
                fourthModeLower = 2;
            } else if (this.props.gameData.guesses[2] === 0) {
                fourthDigitHigher = parseInt(this.props.gameData.cost[3]);
                fourthDigitLower = parseInt(this.props.gameData.cost[3]);
                fourthModeHigher = 3;
                fourthModeLower = 3;
            }

            if (this.props.gameData.guesses[3] === 1) {
                fifthModeHigher = 2;
            } else if (this.props.gameData.guesses[3] === -1) {
                fifthModeLower = 2;
            } else if (this.props.gameData.guesses[3] === 0) {
                fifthDigitHigher = parseInt(this.props.gameData.cost[4]);
                fifthDigitLower = parseInt(this.props.gameData.cost[4]);
                fifthModeHigher = 3;
                fifthModeLower = 3;
            }
        }

        return (
            <div className="NumberDisplayBoard">
                <div className="col col1">
                    <NumberPanel number={firstDigit} panelMode={firstDigitMode}/>
                </div>
                <div className="col col2">
                    <NumberPanel number={secondDigitHigher} panelMode={secondModeHigher}/>
                    <DicePanel number={this.props.gameData.rolls[0]}/>
                    <NumberPanel number={secondDigitLower} panelMode={secondModeLower}/>
                </div>
                <div className="col col3">
                    <NumberPanel number={thirdDigitHigher} panelMode={thirdModeHigher}/>
                    <DicePanel number={this.props.gameData.rolls[1]}/>
                    <NumberPanel number={thirdDigitLower} panelMode={thirdModeLower}/>
                </div>
                <div className="col col4">
                    <NumberPanel number={fourthDigitHigher} panelMode={fourthModeHigher}/>
                    <DicePanel number={this.props.gameData.rolls[2]}/>
                    <NumberPanel number={fourthDigitLower} panelMode={fourthModeLower}/>
                </div>
                <div className="col col5">
                    <NumberPanel number={fifthDigitHigher} panelMode={fifthModeHigher}/>
                    <DicePanel number={this.props.gameData.rolls[3]}/>
                    <NumberPanel number={fifthDigitLower} panelMode={fifthModeLower}/>
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
        hasStarted: PropTypes.bool
    }).isRequired
};