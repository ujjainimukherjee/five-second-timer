import './App.css';
import Timer from './components/Timer';

function App() {
  return (
    <div id="main">
      <Timer baseDuration="5000" reverseDuration="300" />
    </div>
  );
}

export default App;
