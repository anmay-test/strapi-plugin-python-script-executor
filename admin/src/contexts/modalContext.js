import React, { createContext } from "react";
const ModalContext = createContext();

// const ModalContextProvider = ({ children }) => {
//   const [modal, setModal] = useState(false);
//   const toggleModal = () => setModal(!modal);

//   return (
//     <ModalContext.Provider value={{ modal, toggleModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

// export default ModalContextProvider;
export default ModalContext;
