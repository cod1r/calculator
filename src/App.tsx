import React, { useState } from 'react';
import { themes } from './contexts/themes';
import './App.css';
import Calculator from "./components/Calculator";
const Theme = React.createContext(themes.dark);
function App() {
  const [theme, setTheme] = useState(themes.light);
  return (
    <Theme.Provider value={theme}>
        <Theme.Consumer>
        {theme =>
            <div style={{backgroundColor: theme, height: '100%'}}>
              <button onClick={()=>setTheme(theme === themes.light ? themes.dark:themes.light)}>Toggle</button>
              <Calculator></Calculator>
            </div>
        }
        </Theme.Consumer>
    </Theme.Provider>
  );
}

export default App;
