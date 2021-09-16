import Home from "./app/pages/Home";
import Search from "./app/pages/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./app/shared/Header";
function App() {
	return (
		<Router>
			<Header/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/search" component={Search} />
			</Switch>
		</Router>
	);
}

export default App;
