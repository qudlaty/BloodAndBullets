import React from "react";
import "./HpBar.scss";

interface HpBarProps {
    current: number;
    max: number;
    color: string;
}

export class HpBar extends React.Component<HpBarProps> {

    render() {
        let percentage = ~~((this.props.current * 100) / this.props.max);
        let progressStyle = {
            width: `${percentage}%`,
            backgroundColor: this.props.color
        };
        return(
            <div className="hpbar">
                <div className="hpbar__indicator" style={progressStyle}>

                </div>
                <span className="hpbar__text">
                        {this.props.current}
                </span>
            </div>
        );
    }
}