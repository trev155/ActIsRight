import React from 'react';
import PropTypes from 'prop-types';

export class IdleDiceContainer extends React.Component {
    /*
    The IdleDiceContainer is primarily a visual component that displays dice on the DiceBoard.

    The number of dice to display depends on the current game state - specifically, the size of the
    "rolls" array, which will have anywhere between 0 to 4 elements.

    The die face that gets displayed will be set randomly at the start of each game.
    */
    render() {
        let idleDice = this.props.idleDice.map(function(val, i) {
                return (
                    <div key={i}>
                        <img src={"/app/assets/img/dicegame/dice_" + val + ".png"}/>
                    </div>
                );
            }
        );

        return (
        <div className="idleDiceContainer">
            {idleDice}
        </div>
        );
    }
}

IdleDiceContainer.propTypes = {
    idleDice: PropTypes.array.isRequired
};