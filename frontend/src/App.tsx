import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import FileUpload from "./upload-file.tsx";
import { theme } from "./theme/theme";


function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
        <FileUpload/>
    </MantineProvider>
  );
}

export default App;
