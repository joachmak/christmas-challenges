import ChristmasWrapper from "../components/ChristmasWrapper";
import ChristmasContainer from "../components/ChristmasContainer";
import {createUseStyles} from "react-jss";
import {ReactNode, useState} from "react";
import Cookies from 'universal-cookie';

const useStyles = createUseStyles({
    textDiv: {
        lineHeight: 1,
        textAlign: "center"
    },
    timer: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 100,
        lineHeight: 0,
        margin: "55px auto"
    },
    lineContainer: {
        display: "inline-block",
        padding: "2px 30px",
        margin: "auto",
        backgroundColor: "rgba(9, 23, 34, 1)",
        borderRadius: 5,
        minWidth: 400,
        boxSizing: "border-box",
    },
    flexContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
    },
    inputField: {
        border: "1px solid white",
        padding: "8px 10px",
        backgroundColor: "transparent",
        borderRadius: 5,
        color: "white",
        width: 400,
        boxSizing: "border-box",
        textAlign: "center",
        "&:focus": {
            outline: "none",
        }
    },
    pre: {
        fontFamily: "Sans-Serif",
        fontWeight: "bold",
        fontSize: 24,
    },
    btn: {
        transition: "all 0.1s ease-in-out",
        width: 400,
        boxSizing: "border-box",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid white",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgba(255,100,100,0.2)",
        }
    },
    zoomTxt: {
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(255,180,180)"
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "bold",
        lineHeight: 0.1,
        marginTop: 10,
    },
    snif1: {
        transform: "rotate(-10deg) translate(-20px, 5px)",
        fontSize: 20,
        fontWeight: "bold",
    },
    snif2: {
        transform: "rotate(10deg) translate(10px, -2px)",
        fontSize: 20,
        fontWeight: "bold",
    }
})

function generateLine(wordCount: number) {
    const availableWords = ["hei", "nisse", "jul", "aften", "gave", "mange", "på", "luke", "snø", "mann", "kveld",
    "ribbe", "torsk", "pølse", "pepper", "kake", "sang", "kirke", "hvordan", "hvem", "bibel", "lue", "hansker", "votter",
    "og", "i", "du", "fin", "søt", "grøt", "tre", "kule", "krans", "slede", "mat", "bjelle", "sang", "brus", "kake",
    "født", "hest", "ku", "ord", "man", "ler", "latter", "hamster", "katt", "rudolf", "penger"]
    let result = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(availableWords[Math.floor(Math.random()*(availableWords.length))])
    }
    return result;
}

function displayLine(line: string[], correctnessArr: number[], enableColor?: boolean): ReactNode[] {
    const wordArr: ReactNode[] = []
    line.forEach((word, idx) => {
        const correctness = correctnessArr[idx];
        if (correctness === 0 || !enableColor) wordArr.push(<span style={{color: "white"}}>{word}{" "}</span>)
        if (correctness === 1 && enableColor) wordArr.push(<span style={{color: "green"}}>{word}{" "}</span>)
        if (correctness === 2 && enableColor) wordArr.push(<span style={{color: "red"}}>{word}{" "}</span>)
    })
    return wordArr
}

export default function TypingTest() {
    const classes = useStyles();
    const wordCount = 10;
    const [lineOne, setLineOne] = useState(generateLine(wordCount));
    const [lineTwo, setLineTwo] = useState(generateLine(wordCount));
    const [wordIndex, setWordIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [correctnessArr, setCorrectnessArr] = useState(new Array(wordCount).fill(0));
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const [timer, setTimer] = useState(60);
    const [noCorrectWords, setNoCorrectWords] = useState(0);
    const [hasGameEnded, setHasGameEnded] = useState(false);
    const CODE = 6969;
    const printTimer = (seconds: number) => {
        if (seconds > 59) return "01:00"
        let secondsString = seconds.toString();
        if (secondsString.length < 2) secondsString = "0" + secondsString;
        return "00:" + secondsString;
    }
    const tick = (seconds: number) => {
        if (seconds > 55) {
            setTimeout(() => {
                tick(seconds - 1)
            }, 1000)
        }
        else {
            setHasGameEnded(true);
            if (calculateWpm() >= 60) {
                const cookies = new Cookies()
                cookies.set("slemt_barn", true, { path: '/' });
            }

        }
        setTimer(prev => prev - 1);
    }
    const onTextChange = (e: any) => {
        if (!isTimerStarted) {
            setIsTimerStarted(true);
            setTimeout(() => {
                tick(59)
            }, 1000)
        }
        let input: string = e.target.value;
        if (input.includes(" ")) {
            // SUBMIT WORD
            const currentWord = lineOne[wordIndex];
            const writtenWord = input.slice(0, input.length - 1);
            if (writtenWord === currentWord) {
                // CORRECT WORD
                setCorrectnessArr(prev => {
                    prev[wordIndex] = 1;
                    return Array.from(prev)
                })
                setNoCorrectWords(prev => prev + 1);
            } else {
                // WRONG WORD
                setCorrectnessArr(prev => {
                    prev[wordIndex] = 2;
                    return Array.from(prev)
                })
            }
            // GENERAL
            let newIndex = wordIndex + 1;
            if (newIndex >= wordCount) {
                // RESET INDEX, GENERATE NEW LINE
                newIndex = 0;
                setLineOne(lineTwo);
                setLineTwo(generateLine(wordCount));
                setCorrectnessArr(new Array(wordCount).fill(0));
            }
            setWordIndex(newIndex);
            input = "";
        }
        setUserInput(input);
    }
    const calculateWpm = () => {
        const timeElapsed = 60 - timer === 0 ? 1 : 60 - timer;
        return Math.round(noCorrectWords / (timeElapsed / 60));
    }
    const restartGame = () => {
        setLineOne(generateLine(wordCount))
        setLineTwo(generateLine(wordCount))
        setCorrectnessArr(new Array(wordCount).fill(0))
        setWordIndex(0)
        setUserInput("")
        setIsTimerStarted(false)
        setTimer(60);
        setNoCorrectWords(0)
        setHasGameEnded(false);
    }

    if (hasGameEnded && calculateWpm() >= 60)
        return (
            <ChristmasWrapper>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                    <ChristmasContainer>
                        <div className={classes.textDiv}>
                            <p className={classes.subtitle}>...{calculateWpm()} ord i minuttet?</p>
                            <p className={classes.snif1}>*snif*</p>
                            <p className={classes.snif2}>*snif*</p>
                            <p>Det lukter <span className={classes.zoomTxt}>juks</span> her O:</p>
                            <p>Slemme barn får ikke julegaver &gt;:l</p>
                        </div>
                    </ChristmasContainer>
                </div>
            </ChristmasWrapper>
        )

    if (hasGameEnded && calculateWpm() >= 51)
        return (
            <ChristmasWrapper>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                    <ChristmasContainer>
                        <div className={classes.textDiv}>
                            <p className={classes.subtitle}>WOOOOO, du klarte det :D</p>
                            <p>Du skrev hele <span className={classes.zoomTxt}>{calculateWpm()}</span> ord i minuttet O:</p>
                            <p>Koden er... {CODE}❤️</p>
                        </div>
                    </ChristmasContainer>
                </div>
            </ChristmasWrapper>
        )

    return (
        <div>
            <ChristmasWrapper>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
                    <ChristmasContainer>
                        <div className={classes.textDiv}>
                            <h2>God jul, Malin❤️</h2>
                            <hr style={{border: "1px dashed rgba(255,255,255,0.2)", width: 210}} />
                            <p>Jeg håper du har øvd på å skrive fort...</p>
                            <p>For å få koden til låsen må du nemlig greie å skrive mer enn <b>50 ord i minuttet</b>.</p>
                            <p>Timeren starter når du begynner å skrive!</p>
                            <pre className={classes.pre}>L Y K K E   T I L ❤️🎅🏻🎄</pre>
                        </div>
                        <p className={classes.timer}>{printTimer(timer)}</p>
                        <div className={classes.flexContainer}>
                            <div className={classes.lineContainer}>
                                <p>{displayLine(lineOne, correctnessArr, true)}</p>
                                <p>{displayLine(lineTwo, correctnessArr)}</p>
                            </div>
                            {
                                !hasGameEnded &&
                                <>
                                    <input value={userInput} className={classes.inputField} type="text" onChange={onTextChange} />
                                    <p>{calculateWpm()} ord/min</p>
                                </>
                            }
                            {
                                hasGameEnded && calculateWpm() < 51 &&
                                <>
                                    <button className={classes.btn} onClick={restartGame}><b>Prøv igjen &lt;3</b></button>
                                    <p>{calculateWpm()} ord/min</p>
                                </>
                            }
                        </div>
                    </ChristmasContainer>
                </div>
            </ChristmasWrapper>
        </div>
    )
}