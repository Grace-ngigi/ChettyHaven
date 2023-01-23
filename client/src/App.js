import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Rescue from "./pages/rescue";
import Adopt from "./pages/adopt";
import Petcare from "./pages/petcare";
import Bar from "./pages/bar";
import Pie from "./pages/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rescue" element={<Rescue />} />
              <Route path="/petcare" element={<Petcare />} />
              <Route path="/adopt" element={<Adopt />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
