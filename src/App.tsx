import Lobby from "./components/Lobby";
import RootProvider from "./contexts/RootProvider";

function App() {
  return (
    <RootProvider>
      <Lobby />
    </RootProvider>
  );
}

export default App;
