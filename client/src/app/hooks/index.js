import { useLocation } from "react-router-dom";

export function useQuery() {
	let location = useLocation();

	return new URLSearchParams(location.search);
}
