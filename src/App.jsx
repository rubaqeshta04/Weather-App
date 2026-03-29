import "./App.css";
import Weather from "./components/Weather";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Container maxWidth="sm" className="">
            <div className="h-screen flex justify-center items-center">
              <Weather />
            </div>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
