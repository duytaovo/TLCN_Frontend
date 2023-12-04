import useRouteElements from "./useRouteElements";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import "normalize.css";
import "src/assets/styles/global.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorBoundary from "./components/ErrorBoundary";
import { useContext } from "react";
import { AppContext } from "./contexts/app.context";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

function App() {
  const routeElements = useRouteElements();
  // const { reset } = useContext(AppContext);

  // useEffect(() => {
  //   LocalStorageEventTarget.addEventListener("clearLS", reset);
  //   return () => {
  //     LocalStorageEventTarget.removeEventListener("clearLS", reset);
  //   };
  // }, [reset]);
  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <ErrorBoundary>{routeElements}</ErrorBoundary>
        <ToastContainer />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;

