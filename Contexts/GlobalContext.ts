import { createContext } from "react";
import { GlobalContextShape } from "../lib/ts/interfaces";

let GlobalContext = createContext<GlobalContextShape>([{ authorized: false }]);

export { GlobalContext };
