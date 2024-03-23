import './main.css'
import React from "react";
import {createRoot} from "react-dom/client";
import HomeMessage from './components/homeMessage/homeMessage.jsx';

const App = () => {
  return (
    <div>
      <h1>Hello World!!</h1>
      <HomeMessage />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);


