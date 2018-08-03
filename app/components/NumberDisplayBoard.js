import React from 'react';
import { NumberPanel } from './NumberPanel';
import { DicePanel } from './DicePanel';

export class NumberDisplayBoard extends React.Component {
    render() {
        return (
            <div className="NumberDisplayBoard">
                <div className="col col1">
                    <NumberPanel/>
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