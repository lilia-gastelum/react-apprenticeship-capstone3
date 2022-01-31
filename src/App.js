import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { NotesContextProvider } from "./utils/contexts/NotesContext";
import Notes from "./pages/Notes";
import Archive from "./pages/Archive";
import { useAuth } from "./utils/providers/Auth.provider";
import { TermContextProvider } from "./utils/contexts/TermContext";
import { SideBarContextProvider } from "./utils/contexts/SideBarContext";
import Login from "./pages/Login";
import Private from "./components/Private";

function App() {
  const { authenticated } = useAuth();
  console.log(authenticated);
  return (
    <BrowserRouter>
      <Switch>
        <TermContextProvider>
          <SideBarContextProvider>
            <div className="App">
              {authenticated ? (
                <>
                  <Header />
                  <SideBar />
                  <NotesContextProvider>
                    <Private>
                      <Route exact path="/home">
                        <Notes />
                      </Route>
                      <Route exact path="/archive">
                        <Archive />
                      </Route>
                    </Private>
                  </NotesContextProvider>
                </>
              ) : (
                <>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                </>
              )}
              {/* {!authenticated &&(
              <Redirect  exact from="**" to={"/login"} />
              )} */}
            </div>
          </SideBarContextProvider>
        </TermContextProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
