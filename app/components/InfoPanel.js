import React from 'react';
import PropTypes from 'prop-types';

export class InfoPanel extends React.Component {
    /*
    The InfoPanel contains instructions and the main gameplay buttons.
    */
    render() {
        let productName;
        let productPath;
        if (this.props.shouldRenderProduct) {
            productName = this.props.product.name;
            productPath = this.props.product.imgPath;
        } else {
            productName = "";
            productPath = "/app/assets/img/dicegame/placeholder.png";
        }

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
    shouldRenderProduct: PropTypes.bool.isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.string,
        imgPath: PropTypes.string
    })
};
