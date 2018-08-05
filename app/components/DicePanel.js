import React from 'react';

export class DicePanel extends React.Component {
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