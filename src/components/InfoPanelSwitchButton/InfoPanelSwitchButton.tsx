import React, { ReactNode, useState } from "react";
import "./InfoPanelSwitchButton.scss";
import { Item } from "services";
import { InfoPanel } from "components/InfoPanel";

interface InfoPanelSwitchButtonProps {
  className?: string;
  title?: string;
  item: Item;
}
export function InfoPanelSwitchButton(props: InfoPanelSwitchButtonProps) {
  const buttonClassName = `info-panel-switch-button`;
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const switchPanelState = () => {
    console.log("Panel", isPanelOpen);
    setIsPanelOpen(previousValue => !previousValue);
  };

  return (
    <div>
      <button className={buttonClassName} onClick={switchPanelState}>
        ⓘ
      </button>
      {isPanelOpen && <InfoPanel {...props} onClose={switchPanelState}></InfoPanel>}
    </div>
  );
}
