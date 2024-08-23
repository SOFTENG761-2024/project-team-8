import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import FileUpload from "./upload-file.tsx";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
        <FileUpload/>
    </MantineProvider>
  );
}

export default App;
