import React from "react";
import "./HpBar.scss";

interface HpBarProps {
    current: number;
    max: number;
    color: string;
}

export class HpBar extends React.Component<HpBarProps> {

    render() {
        if(this.props.current <= 0) return null;
        const percentage = ~~((this.props.current * 100) / this.props.max);
        const progressStyle = {
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