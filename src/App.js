import logo from './logo.svg';
import './App.css';
import { store } from "./app/store";
import { Articles } from "./app/features/articles/Articles";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <p>
            RTK Query Simple App
          </p>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/rtk-query/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn RTK Query
          </a>
          <Articles />
        </Provider>
      </header>
    </div>
  );
}

export default App;
