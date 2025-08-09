import Header from "./components/Header";
import { CurrentPage, useLocation } from "./hooks/usePage";
import "./index.css";
function App() {
  const { pathname, navigate } = useLocation();

  return (
    <>
      <Header key={pathname} navigate={navigate} />
      <main>
        <CurrentPage key={pathname} />
      </main>
    </>
  );
}

export default App;
