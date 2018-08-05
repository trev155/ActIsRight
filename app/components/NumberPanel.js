import React from 'react';
import PropTypes from 'prop-types';

export class NumberPanel extends React.Component {
    /*
    A NumberPanel can be one of 3 modes:
    1. Empty - no number is displayed
    2. Empty / Lit - no number is displayed, but a guess has been made
    3. Filled - a number if displayed

    This can be retrieved from the "this.props.panelMode" value, which is passed a number in {1, 2, 3}.

    Props:
    - number: the number to be displayed in this panel. value should be ignored if panelMode == 1 or panelMode == 2
    - panelMode: what kind of panel to display.
    */
    render() {
        const imgBase = "/app/assets/img/dicegame/";

        let number = this.props.number;
        let panelMode = this.props.panelMode;

        let imgPath;
        if (panelMode === 1) {
            imgPath = imgBase + "empty_number_panel.png";
        } else if (panelMode === 2) {
            imgPath = imgBase + "lit_number_panel.png";
        } else {
            imgPath = imgBase + "number_" + number + ".png";
        }

        return (
            <div className="NumberPanel">
                <img src={imgPath}/>
            </div>
        );
    }
}

NumberPanel.propTypes = {
    number: PropTypes.number,
    panelMode: PropTypes.number
};