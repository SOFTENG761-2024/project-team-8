import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./router/Router";
import { theme } from "./theme/theme";
import { AuthContextProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </MantineProvider>
  );
}

export default App;
