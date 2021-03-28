import { ConnectedRouter } from "connected-react-router";
import { history } from "./stores/store";
import routes from "./routes/routes";

function App() {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
}

export default App;
