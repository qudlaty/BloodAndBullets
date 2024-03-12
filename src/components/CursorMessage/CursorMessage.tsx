import React from "react";
import "./CursorMessage.scss";

interface CursorMessageProps {
  messageText: string;
  messageTimeInMs?: number;
  messageColor?: string;
}

export function CursorMessage({
  messageText = "!",
  messageTimeInMs = 1000,
  messageColor = "#eee",
}: CursorMessageProps) {
  const cursorMessageStyle = {
    color: messageColor,
    animation: `fade-out ${messageTimeInMs}ms linear forwards`,
  };
  return (
    <div className="cursor-message" style={cursorMessageStyle}>
      {messageText}
    </div>
  );
}
