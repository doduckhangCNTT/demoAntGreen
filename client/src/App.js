import React from "react";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import HandleRouter from "./routes/HandleRouter";

function App() {
  return (
    <>
      {/* <DataProvider> */}
      {/* <BrowserRouter> */}
      <Header />

      <HandleRouter />

      <Footer />
      {/* </BrowserRouter> */}
      {/* </DataProvider> */}
    </>
  );
}

export default App;
