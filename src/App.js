import Navbar from "./Components/NavbarComponents";
import "./App.css";
import Routes from "./router";
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
