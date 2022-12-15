import {ReactNode} from "react";

interface Props {
    children?: ReactNode
}

export default function ChristmasWrapper(props: Props) {
    return (
        <div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
            <div className="snowflake">
                ❅
            </div>
            <div className="snowflake">
                ❆
            </div>
            <div className="snowflake">
                ❄
            </div>
            { props.children }
        </div>
    )
}