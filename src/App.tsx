import React, { useEffect, useState } from "react";
import TypingTest from "./domain/TypingTest";
import Countdown from "./domain/Countdown";
import { getChristmasDate } from "./utils/timeUtils";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const christmasDate = getChristmasDate();

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      {currentDate < christmasDate ? <Countdown /> : <TypingTest />}
    </div>
  );
}

export default App;
