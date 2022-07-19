import Balance from "./components/balance/Balance";
import ControlPanel from "./components/controlPanel/ControlPanel";
import RecentDisplay from "./components/controlPanel/recentDisplay/RecentDisplay";

function App() {
  return (
    <div className="App">
      <ControlPanel />
      <RecentDisplay />
      <Balance />
    </div>
  );
}

export default App;
