import React, { ReactNode, useState } from "react";
import "./GradientBolt.sass";

interface GradientBoltProps {
  /** Number of the version of the bolt. 0-7 */
  version?: number;
  /** Length of the line of fire in any CSS units */
  lineOfFireLength?: string;
  /** Time the bolt will take to travel and vanish from the line of fire (with tail) */
  boltFlightTimeInHundredsOfMs: number;
}
/** A bolt rendered from a single div with a gradient */
export const GradientBolt = ({
  lineOfFireLength = "20em",
  version = 0,
  boltFlightTimeInHundredsOfMs = 10,
}: GradientBoltProps) => {
  const lineOfFireStyle = {
    width: lineOfFireLength,
  };
  const boltStyle = {
    animationDuration: `${boltFlightTimeInHundredsOfMs * 100}ms`,
  };
  const boltClass = `bolt shooting version-${version}`;

  return (
    <div className="line-of-fire" style={lineOfFireStyle}>
      <div className={boltClass} style={boltStyle}></div>
    </div>
  );
};
