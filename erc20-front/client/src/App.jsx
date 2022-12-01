import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import "./App.css";
import ERC20 from "./components/ERC/ERC20";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <ERC20 />
          <hr />
          <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
