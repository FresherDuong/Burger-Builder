import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';
import { Route, Switch } from 'react-router-dom';

// Use Switch to load single route matched at a time, othewise React will load
// all the routes that tailored "path" in URL
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact={true} component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
