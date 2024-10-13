import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { Router } from "./router/Router";
import { theme } from "./theme/theme";

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
