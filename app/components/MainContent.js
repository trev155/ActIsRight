import React from 'react';
import { GameSelection } from './GameSelection';
import { DiceGame } from './DiceGame/DiceGame';

export class MainContent extends React.Component {
    render() {
        return (
            <div className="MainContent">
                <GameSelection/>
                <div className="GameSection">
                    <DiceGame/>
                </div>
            </div>
        );
    }
}