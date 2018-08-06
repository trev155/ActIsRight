import React from 'react';
import PropTypes from 'prop-types';

export class NumberPanel extends React.Component {
    /*
    A NumberPanel can be one of 4 modes:
    1. Empty, not Selected - no number is displayed
    2. Empty, Selected - no number is displayed, but a guess has been made and the panel has been outlined
    3. Filled, not Selected - a number is displayed, but the panel is not outlined
    4. Filled, Selected - a number is displayed, and the panel has been selected

    Props:
    - number: the number to be displayed in this panel
    - isFilled: whether the number should actually be displayed
    - isSelected: whether the panel should have a visual outline
    */
    render() {
        const imgBase = "/app/assets/img/dicegame/";
        let imgPath = imgBase + "number_" + this.props.number + ".png";

        // Choose what the internals of the NumberPanel will look like
        let frame;
        if (!this.props.isFilled && !this.props.isSelected) {
            frame = <div className="frame"></div>;
        }
        if (!this.props.isFilled && this.props.isSelected) {
            frame = <div className="frame selected"></div>;
        }
        if (this.props.isFilled && !this.props.isSelected) {
            frame = (
            <div className="frame">
                <img src={imgPath}/>
            </div>
            );
        }
        if (this.props.isFilled && this.props.isSelected) {
            frame = (
            <div className="frame selected">
                <img src={imgPath}/>
            </div>
            );
        }

        // Actual Rendering of the NumberPanel
        return (
            <div className="NumberPanel">
                {frame}
            </div>
        );
    }
}

NumberPanel.propTypes = {
    number: PropTypes.number,
    panelMode: PropTypes.number
};