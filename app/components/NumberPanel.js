import React from 'react';

export class NumberPanel extends React.Component {
    render() {
        let number = this.props.number;

        let imgBase = "/app/assets/img/dicegame/";
        let imgPath;
        if (number) {
            imgPath = imgBase + "number_" + number + ".png";
        } else {
            imgPath = imgBase + "empty_number_panel.png";
        }

        return (
            <div className="NumberPanel">
                <img src={imgPath}/>
            </div>
        );
    }
}