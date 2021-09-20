import Home from "./app/pages/Home";
import Search from "./app/pages/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./app/shared/Header";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/search" component={Search} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
