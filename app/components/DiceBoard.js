import React from 'react';

export class DiceBoard extends React.Component {
    render() {
        return (
            <div className="DiceBoard">
                <div className="idleDice">
                    Idle Dice
                </div>
                <div className="diceResult">
                    Dice Result
                </div>
            </div>
        );
    }
}