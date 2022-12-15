import React from 'react';
import TypingTest from "./domain/TypingTest";
import Cookies from "universal-cookie";

function App() {
    const cookies = new Cookies()
    console.log(cookies.get("slemt_barn"))
  return (
    <div className="App">
      <TypingTest />
    </div>
  );
}

export default App;
