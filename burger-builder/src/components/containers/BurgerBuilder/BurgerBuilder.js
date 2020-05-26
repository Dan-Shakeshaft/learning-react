import React, { Component } from "react";
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import ordersApi from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // ordersApi.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedCount;

    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        //this.setState({purchaseable: sum > 0});

        return sum > 0;
    }

    purchasedCancelledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});

        // const orderDetails = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Dan Shakeshaft',
        //         address: {
        //             street: '6 Jasmine Grove',
        //             postcode: 'WA88DH',
        //             country: 'England',
        //         },
        //         email: 'Shakeylfc@gmail.com'
        //     },
        //     deliveryMethod: '1st Class'
        // };

        // ordersApi.post('/orders.json', orderDetails)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //     });
       

        // **** passing ingredients and price to different page via query params (solution without redux)

        // const query = [];

        // for (let i in this.state.ingredients) {
        //     query.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // query.push('price=' + this.state.totalPrice);

        // const queryString = query.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
    }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount <= 0) {
    //         return;
    //     }

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type] = updatedCount;

    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    render () {
        // const disableInfo = {
        //     ...this.state.ingredients
        // };
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        //let burger = this.state.error ? <p>Failed to retrieve ingredients</p> : <Spinner />;
        let burger = <Spinner />;

        //if (this.state.ingredients) { //this is using local state rather than state in redux
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    {/* <Burger ingredients={this.state.ingredients}/> */}
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        // ingredientAdded={this.addIngredientHandler}
                        // ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disableInfo={disableInfo}
                        //price={this.state.totalPrice}
                        price={this.props.price}
                        //purchaseable={this.state.purchaseable}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}/>
                </Auxiliary>
            );

            orderSummary = 
                <OrderSummary 
                    //ingredients={this.state.ingredients}
                    ingredients={this.props.ings}
                    //price={this.state.totalPrice}
                    price={this.props.price}
                    purchaseCancelled={this.purchasedCancelledHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, ordersApi));