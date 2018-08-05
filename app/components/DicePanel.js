import React from 'react';
import PropTypes from 'prop-types';

export class DicePanel extends React.Component {
    /*
    A DicePanel can be one of 2 things:
    1. Empty
    2. A number

    For the first case, this.props.number will be undefined or null.
    For the second case, we should display the appropriate image.
    */
    render() {
        let number = this.props.number;

        let imgBase = "/app/assets/img/dicegame/";
        let imgPath;
        if (number) {
            imgPath = imgBase + "dice_" + number + ".png";
        } else {
            imgPath = imgBase + "empty_dice_panel.png";
        }

        return (
            <div className="DicePanel">
                <img src={imgPath}/>
            </div>
        );
    }
}

DicePanel.propTypes = {
    number: PropTypes.number
};