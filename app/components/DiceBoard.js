import React from 'react';
import PropTypes from 'prop-types';
import { IdleDiceContainer } from './IdleDiceContainer';

export class DiceBoard extends React.Component {
    render() {
        return (
            <div className="DiceBoard">
                <div className="idleDice">
                    <IdleDiceContainer idleDice={this.props.idleDice}/>
                </div>
                <div className="middleField">
                    Middle Field
                </div>
                <div className="diceResult">
                    Dice Result
                </div>
            </div>
        );
    }
}

DiceBoard.propTypes = {
    idleDice: PropTypes.array.isRequired
};