import Content from './components/Content';
import Header from './components/UserInterface';
import UserInfoContextProvider from './contexts/UserInfoContext';

function App() {
  return (
    <div className="App">
      <UserInfoContextProvider>
        <Header />
        <Content />
      </UserInfoContextProvider>
    </div>
  );
}

export default App;
