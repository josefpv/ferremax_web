import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";

//components
import Productos from "./components/Productos";
import Ventas from "./components/Ventas";
import Despachos from "./components/Despachos";
import Clientes from "./components/Clientes";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Productos} exact />
        <Route path="/ventas" component={Ventas} />
        <Route path="/despachos" component={Despachos} />
        <Route path="/clientes" component={Clientes} />
      </Switch>
    </Router>
  );
}

export default App;
