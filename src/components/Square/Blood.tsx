import React from "react";

interface BloodProps {
  bloodAmount: number; // receives amount of blood ONLY
}

/**
 * @description
 * Visualises blood by adding red background
 * and a little number in the corner.
 *
 * @param bloodAmount - number representing the amount of blood.
 */
class Blood extends React.PureComponent<BloodProps> {
  render() {
    let { bloodAmount } = this.props;

    let bloodDrops = [];
    let i = bloodAmount;
    let marginForDropsInPercent = 0;
    let mfd = marginForDropsInPercent;
    let dropSizeVariance = 3;
    let dsv = dropSizeVariance;


    while(i--) {
      bloodDrops.push(
        <span className="blood__drop" style={{
          position: 'absolute',
          fontSize: `${1 + Math.random() * dsv}em`,
          left: `calc(${mfd + Math.random() * (100-2*mfd)}% - 0.4em)`,
          top: `calc(${mfd + Math.random() * (100-2*mfd)}% - 0.5em)`,
        }}>o</span>
      );
    }

    return (
      <div
        className="square__blood"
        style={{
          background: `rgba(255, 0, 0, 0)`,//${(bloodAmount / 50).toFixed(2)})`,
          position: 'relative'
        }}
      >
        {bloodDrops}
        <span className="blood__text">
          {bloodAmount}
        </span>
      </div>
    );
  }
}

export default Blood;
