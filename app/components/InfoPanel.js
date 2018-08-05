import React from 'react';

export class InfoPanel extends React.Component {
    render() {
        return (
            <div className="InfoPanel">
                <div className="instructions">
                    <h2>Instructions</h2>
                    <p>
                    In Dice Game, you have to guess the price of a car. You will be shown the first digit of the
                    car. Then, you will roll a die. If the value of the die matches the next digit of the car,
                    then you move on to the next digit. Otherwise, you have to guess whether the digit is higher
                    or lower than the value on the die.
                    </p>
                </div>
                <div className="buttonSet1">
                    <div className="startButton">
                        <button onClick={this.props.handlers.startGameHandler}>Start Game</button>
                    </div>
                    <div className="rollButton">
                        <button onClick={this.props.handlers.rollHandler}>ROLL</button>
                    </div>
                </div>
                <div className="buttonSet2">
                    <div className="lowerButton">
                        <button onClick={this.props.handlers.lowerHandler}>Lower</button>
                    </div>
                    <div className="higherButton">
                        <button onClick={this.props.handlers.higherHandler}>Higher</button>
                    </div>
                </div>
                <div className="product">
                    <h2>Product Placeholder Product Name A Car Another Car</h2>
                    <img src="/app/assets/img/dicegame/placeholder.png"/>
                </div>
            </div>
        );
    }
}