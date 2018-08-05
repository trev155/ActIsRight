import React from 'react';
import PropTypes from 'prop-types';

export class InfoPanel extends React.Component {
    /*
    The InfoPanel contains instructions and the main gameplay buttons.
    */
    render() {
        // Conditional Rendering of the product - depends if the game has started
        let productName;
        let productPath;
        if (this.props.lifecycle.isStarted) {
            productName = this.props.product.name;
            productPath = this.props.product.imgPath;
        } else {
            productName = "";
            productPath = "/app/assets/img/dicegame/placeholder.png";
        }

        // Conditional Rendering of buttons - depends on the lifecycle state of the game
        let btnText;
        if (this.props.lifecycle.isStarted) {
            btnText = "Restart Game";
        } else {
            btnText = "Start Game"
        }

        let buttonSet1;
        if (this.props.lifecycle.isGuessPhase) {
            buttonSet1 = (
            <div className="buttonSet1">
                <div className="startButton">
                    <button onClick={this.props.handlers.startGameHandler}>{btnText}</button>
                </div>
                <div className="rollButton"></div>
            </div>
            );
        } else {
            buttonSet1 = (
            <div className="buttonSet1">
                <div className="startButton">
                    <button onClick={this.props.handlers.startGameHandler}>{btnText}</button>
                </div>
                <div className="rollButton">
                    <button onClick={this.props.handlers.rollHandler}>ROLL</button>
                </div>
            </div>
            );
        }

        let buttonSet2;
        if (this.props.lifecycle.isRollPhase) {
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton"></div>
                <div className="higherButton"></div>
            </div>
            );
        } else {
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton">
                    <button onClick={this.props.handlers.lowerHandler}>Lower</button>
                </div>
                <div className="higherButton">
                    <button onClick={this.props.handlers.higherHandler}>Higher</button>
                </div>
            </div>
            );
        }

        // Perform the actual rendering
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

                {buttonSet1}
                {buttonSet2}

                <div className="product">
                    <h2>{productName}</h2>
                    <img src={productPath}/>
                </div>
            </div>
        );
    }
}

InfoPanel.propTypes = {
    handlers: PropTypes.shape({
        startGameHandler: PropTypes.func.isRequired,
        rollHandler: PropTypes.func.isRequired,
        lowerHandler: PropTypes.func.isRequired,
        higherHandler: PropTypes.func.isRequired
    }).isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.string,
        imgPath: PropTypes.string
    }),
    lifecycle: PropTypes.shape({
        isStarted: PropTypes.bool,
        isRollPhase: PropTypes.bool,
        isGuessPhase: PropTypes.bool,
        isRevealPhase: PropTypes.bool
    })
};
