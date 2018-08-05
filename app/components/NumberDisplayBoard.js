import React from 'react';
import { NumberPanel } from './NumberPanel';
import { DicePanel } from './DicePanel';

export class NumberDisplayBoard extends React.Component {
    render() {
        let rolls = this.props.gameData.rolls;
        let cost = this.props.gameData.cost;

        // for debug
        console.log("debug");
        console.log(cost);
        console.log(rolls);

        let firstDigit;
        if (cost) {
            firstDigit = cost[0];
        } else {
            firstDigit = null;
        }

        return (
            <div className="NumberDisplayBoard">
                <div className="col col1">
                    <NumberPanel number={firstDigit}/>
                </div>
                <div className="col col2">
                    <NumberPanel/>
                    <DicePanel number={rolls[0]}/>
                    <NumberPanel/>
                </div>
                <div className="col col3">
                    <NumberPanel/>
                    <DicePanel number={rolls[1]}/>
                    <NumberPanel/>
                </div>
                <div className="col col4">
                    <NumberPanel/>
                    <DicePanel number={rolls[2]}/>
                    <NumberPanel/>
                </div>
                <div className="col col5">
                    <NumberPanel/>
                    <DicePanel number={rolls[3]}/>
                    <NumberPanel/>
                </div>
            </div>
        );
    }
}