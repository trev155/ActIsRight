import React from 'react';
import { NumberPanel } from './NumberPanel';
import { DicePanel } from './DicePanel';

export class NumberDisplayBoard extends React.Component {
    render() {
        let rolls = this.props.gameData.rolls;
        let cost = this.props.gameData.cost;
        console.log(cost);

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
                    <DicePanel/>
                    <NumberPanel/>
                </div>
                <div className="col col3">
                    <NumberPanel/>
                    <DicePanel/>
                    <NumberPanel/>
                </div>
                <div className="col col4">
                    <NumberPanel/>
                    <DicePanel/>
                    <NumberPanel/>
                </div>
                <div className="col col5">
                    <NumberPanel/>
                    <DicePanel/>
                    <NumberPanel/>
                </div>
            </div>
        );
    }
}