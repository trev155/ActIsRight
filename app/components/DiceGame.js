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
                    <div className="banner">
                        <img src="/app/assets/img/dicegame.png" height="95%" width="100%"/>
                    </div>
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