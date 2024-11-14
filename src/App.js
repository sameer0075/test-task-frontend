import MainRoute from "./routes";
import AuthState from "./context";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <AuthState>
        <MainRoute />
      </AuthState>
    </div>
  );
}

export default App;
