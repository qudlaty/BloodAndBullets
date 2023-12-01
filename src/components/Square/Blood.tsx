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
    const { bloodAmount } = this.props;
    if(bloodAmount < 0) {
      console.error('Blood amount negative.');
      return;
    }

    const bloodDrops = [];
    let i = bloodAmount;
    const marginForDropsInPercent = 0;
    const mfd = marginForDropsInPercent;
    const dropSizeVariance = 3;
    const dsv = dropSizeVariance;


    while(i--) {
      bloodDrops.push(
        <span className="blood__drop" style={{
          position: 'absolute',
          fontSize: `${1 + Math.random() * dsv}em`,
          left: `calc(${mfd + Math.random() * (100-2*mfd)}% - 0.4em)`,
          top: `calc(${mfd + Math.random() * (100-2*mfd)}% - 0.5em)`,
        }}
        key={i}
        >o</span>
      );
    }

    return (
      <div
        className="square__blood"
        style={{
          background: `rgba(255, 0, 0, 0)`,//${(bloodAmount / 50).toFixed(2)})`,
          //position: 'relative'
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
