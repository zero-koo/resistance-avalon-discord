import { DiscordSdkProvider } from "./contexts/DiscordSdkContext";
import { ParticipantsProvider } from "./contexts/ParticipantsContext";

function App() {
  return (
    <DiscordSdkProvider>
      <ParticipantsProvider>
        <div>App</div>
      </ParticipantsProvider>
    </DiscordSdkProvider>
  );
}

export default App;
