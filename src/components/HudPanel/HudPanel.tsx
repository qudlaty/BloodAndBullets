import React from "react";
import "./HudPanel.scss";

interface HudPanelProps {
  title: string;
  children: JSX.Element;
}

export class HudPanel extends React.Component<HudPanelProps> {
  render() {
    return (
      <div className="hud-panel">
        <div className="hud-panel__title">{this.props.title}</div>
        <div className="hud-panel__content">{this.props.children}</div>
      </div>
    );
  }
}
