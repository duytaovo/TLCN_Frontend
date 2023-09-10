import useRouteElements from "./useRouteElements";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import "normalize.css";
import "src/assets/styles/global.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ErrorBoundary from "./components/ErrorBoundary";

const theme = createTheme({
  direction: "rtl",
  // other theme properties
});

function App() {
  const routeElements = useRouteElements();

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
