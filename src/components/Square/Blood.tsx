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
    console.log('BLOOD', this.props);
    let { bloodAmount } = this.props;

    let bloodNumbers = [];
    let i = bloodAmount;

    while(i--) {
      bloodNumbers.push(
        <span style={{
          position: 'absolute',
          left: `${Math.random() * 90}%`,
          top: `${Math.random() * 90 -15}%`,
        }}>o</span>
      );
    }

    return (
      <div
        className="square__blood"
        style={{
          //background: `rgba(255, 0, 0, ${(bloodAmount / 50).toFixed(2)})`,
          position: 'relative'
        }}
      >
        {bloodNumbers}
        {bloodAmount}
      </div>
    );
  }
}

export default Blood;
