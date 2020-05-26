import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './components/containers/Orders/Orders';

class App extends Component {

  state = {
    show: true
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            {this.state.show ? <Route path="/" exact component={BurgerBuilder} /> : null}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
