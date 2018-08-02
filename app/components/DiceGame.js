import React from 'react';
import { NumberDisplayBoard } from './NumberDisplayBoard';
import { DiceBoard } from './DiceBoard';

export class DiceGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="DiceGame">
                <NumberDisplayBoard/>
                <DiceBoard/>
            </div>
        );
    }
}