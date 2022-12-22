import {ReactNode} from "react";
import {createUseStyles} from "react-jss";

interface Props {
    children?: ReactNode;
}

const useStyles = createUseStyles({
    container: {
        color: "#f1f1f1",
        padding: "70px 20px 20px",
        backgroundColor: "#0C1E2D",
        boxShadow: "0 0 10px rgba(255,255,255,0.05)",
        width: 800,
        borderRadius: 5,
        boxSizing: "border-box",
        border: "5px solid #0f273a"
    },
})

export default function ChristmasContainer(props: Props) {
    const classes = useStyles();
    return (
        <div style={{position: "relative"}}>
            <div className={"snow"} style={{top: 15, backgroundColor: "darkgreen"}}>&nbsp;</div>
            <div className={"snow"} style={{top: 10, backgroundColor: "darkred"}}>&nbsp;</div>
            <div className={"snow"}>&nbsp;</div>
            <div className={classes.container}>
                {
                    props.children
                }
            </div>
        </div>
    )
}