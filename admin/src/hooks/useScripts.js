import { useContext } from "react";
import ScriptsContext from "../contexts/scriptsContext";

const useScripts = () => {
  return useContext(ScriptsContext);
};

export default useScripts;
