import React from "react";

interface BloodProps {
  bloodAmount: number;
  parentClassBase: string;
}

class Blood extends React.Component<BloodProps> {
  render() {
    let { parentClassBase, bloodAmount } = this.props;
    let bloodClassName = `${parentClassBase}__blood`;
    let style = `
        .${bloodClassName} {
            background: rgba(255,0,0, ${(bloodAmount / 30).toFixed(2)});
        }
    `;

    return (
      <div className={`square__blood ${bloodClassName}`}>
        {bloodAmount}
        <style>{style}</style>
      </div>
    );
  }
}

export default Blood;
