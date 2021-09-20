import Home from "./app/pages/Home";
import Search from "./app/pages/Search";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./app/shared/Header";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import setAuthToken from "./app/utils/setAuthToken";
import { loadUser } from "./app/actions/auth.actions";
import { LOGOUT } from "./app/constants/types";
function App() {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());

		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch({ type: LOGOUT });
		});
	}, []);
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
