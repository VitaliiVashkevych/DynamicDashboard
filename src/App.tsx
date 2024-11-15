import { News } from "./components/News/News";
import { Weather } from "./components/Weather/Weather";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <header>
        <h1 className="text-red-600 text-2xl text-center">
          Weather & News App
        </h1>
      </header>

      <main>
        <Weather />
        <News />
      </main>

      <footer>
        <h4 className="text-sm text-center">By Vitalii Vashkevych</h4>
      </footer>
    </Provider>
  );
}

export default App;
