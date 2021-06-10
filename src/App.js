import {Footer, Header, MainContent} from './components'
import './index.scss'
import axios from 'axios'

axios.defaults.baseURL = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4'

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
