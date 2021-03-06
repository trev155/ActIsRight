import React from 'react';
import PropTypes from 'prop-types';

export class InfoPanel extends React.Component {
    /*
    The InfoPanel contains instructions and the main gameplay buttons.

    Conditional Rendering of the Product:
    1. The game has not started
    - do not render the product, as there is nothing to display
    2. The game has started
    - render the product

    Which buttons should be rendered?
    1. Before the Game has started.
    - all panels empty
    - only button shown is the "Start Game" button
    2. Roll Phase
    - panels shown depends on the current game state
    - buttons shown are: "Restart Game", and "Roll"
    3. Guess Phase
    - panels shown depends on the cuurrent game state
    - buttons shown are: "Restart Game", "Lower", "Higher"
    4. Done (and not reveal phase)
    - all user rolls and guesses should be displayed at this point
    - only button shown is the "Reveal" button
    5. Reveal Phase
    - all user rolls and guesses displayed, as well as the actual product digits
    - only button shown is the "Restart Game" button
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
        let buttonSet2;
        if (!this.props.lifecycle.isStarted) {
            buttonSet1 = (
            <div className="buttonSet1">
                    <div className="startButton">
                        <button onClick={this.props.handlers.startGameHandler}>{btnText}</button>
                    </div>
                <div className="rollButton"></div>
            </div>
            );
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton"></div>
                <div className="higherButton"></div>
            </div>
            );
        }

        if (this.props.lifecycle.isRollPhase) {
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
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton"></div>
                <div className="higherButton"></div>
            </div>
            );
        }

        if (this.props.lifecycle.isGuessPhase) {
            buttonSet1 = (
            <div className="buttonSet1">
                    <div className="startButton">
                        <button onClick={this.props.handlers.startGameHandler}>{btnText}</button>
                    </div>
                    <div className="rollButton"></div>
            </div>
            );
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

        if (this.props.lifecycle.isDone && !this.props.lifecycle.isRevealPhase) {
            buttonSet1 = (
            <div className="buttonSet1">
                <div className="revealButton">
                    <button onClick={this.props.handlers.revealHandler}>Find out if you win!</button>
                </div>
            </div>
            );
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton"></div>
                <div className="higherButton"></div>
            </div>
            );
        }

        if (this.props.lifecycle.isDone && this.props.lifecycle.isRevealPhase) {
            buttonSet1 = (
            <div className="buttonSet1">
                    <div className="startButton">
                        <button onClick={this.props.handlers.startGameHandler}>{btnText}</button>
                    </div>
                <div className="rollButton"></div>
            </div>
            );
            buttonSet2 = (
            <div className="buttonSet2">
                <div className="lowerButton"></div>
                <div className="higherButton"></div>
            </div>
            );
        }

        // Perform the actual rendering
        return (
            <div className="InfoPanel">
                <div className="instructions">
                    <h2>Instructions</h2>
                    <p>
                    In Dice Game, you have to guess the price of a car.
                    First, you will be shown the first digit of the car.
                    Then, you will roll a die. If the value of the die matches the next digit of the car,
                    then you move on to the next digit. Otherwise, you have to guess whether the digit is higher
                    or lower than the value on the die. If you roll a 1 or a 6, the guess will be made for you.
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
        higherHandler: PropTypes.func.isRequired,
        revealHandler: PropTypes.func.isRequired
    }).isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.string,
        imgPath: PropTypes.string
    }).isRequired,
    lifecycle: PropTypes.shape({
        isStarted: PropTypes.bool,
        isRollPhase: PropTypes.bool,
        isGuessPhase: PropTypes.bool,
        isDone: PropTypes.bool,
        isRevealPhase: PropTypes.bool,
        isGameWon: PropTypes.bool
    }).isRequired
};
