import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import { UserLogin } from "./components/Authentication/UserLogin.tsx";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
      <UserLogin />
    </MantineProvider>
  );
}

export default App;
