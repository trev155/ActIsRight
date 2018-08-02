import React from 'react';
import { NumberDisplayBoard } from './NumberDisplayBoard';
import { DiceBoard } from './DiceBoard';
import { InfoPanel } from './InfoPanel';

export class DiceGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="DiceGame">
                <div className="left">
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