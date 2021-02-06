import React from "react";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import AppStack from "./AppStack";

const App = () => (
  <Provider store={store}>
    <AppStack />
  </Provider>
);

export default App;
