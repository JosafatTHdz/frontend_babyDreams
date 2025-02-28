import { CSSProperties } from 'react';
import './App.css';
import Header from '../app/components/header';
import Footer from '../app/components/footer';
// import Control from '../app/screens/Control';
// import Inicio from '../app/screens/Inicio';
import EditeProfile from '../app/screens/EditeProfile';

function App() {
  return (
    <div style={styles.appContainer}>
      <Header />
      <main style={styles.mainContent}>
        <EditeProfile />
      </main>
      <Footer />
    </div>
  );
}

export default App;

const styles: { [key: string]: CSSProperties } = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f9f9f9',
    // padding: '16px', 
    boxSizing: 'border-box',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
};
