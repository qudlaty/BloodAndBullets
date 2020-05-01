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

    return (
      <div
        className="square__blood"
        style={{
          background: `rgba(255, 0, 0, ${(bloodAmount / 50).toFixed(2)})`,
        }}
      >
        {bloodAmount}
      </div>
    );
  }
}

export default Blood;
