import { getChristmasDate, getTimeDiff } from "../utils/timeUtils";
import ChristmasWrapper from "../components/ChristmasWrapper";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 100,
    textAlign: "center",
    fontFamily: "ChristmasFont",
  },
});

export default function Countdown() {
  const christmasDate = getChristmasDate();
  const currentDate = new Date();

  const getFormattedCounterString = (): string => {
    const timeDiff = getTimeDiff(currentDate, christmasDate);
    let hours = Math.floor(timeDiff / 3600).toString();
    let minutes = Math.floor((timeDiff % 3600) / 60).toString();
    let seconds = Math.floor(timeDiff % 60).toString();
    if (hours.length === 1) hours = "0" + hours;
    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;
    return hours + "h " + minutes + "m " + seconds + "s";
  };
  const classes = useStyles();

  return (
    <ChristmasWrapper>
      <div className={classes.container}>
        God jul om <br />
        {getFormattedCounterString()}
      </div>
    </ChristmasWrapper>
  );
}
