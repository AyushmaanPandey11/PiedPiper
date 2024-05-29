import persistStore from "redux-persist/es/persistStore";
import Body from "./components/Body";
import appStore from "./utils/redux/appStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
function App() {

  let persistor = persistStore(appStore);

  return (
    <div >
      <Provider store={appStore} >
        <PersistGate persistor={persistor}>
          <Body />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
