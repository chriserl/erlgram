import { createContext } from "react";
import { GlobalContextShape } from "../lib/ts/interfaces";

let GlobalContext = createContext<GlobalContextShape>([
	{ account: { authorized: false } },
]);

export { GlobalContext };
