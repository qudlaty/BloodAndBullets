import React from "react";
import "./EmojiMapper.scss";

interface EmojiMapperProps {
  emoji: string;
}

/**
 * @description Maps emojis to pictures with pre-picked versions of them
 */
export class EmojiMapper extends React.Component<EmojiMapperProps> {
  emojiMap = {
    "🐙": "octopus",
    "🦑": "squid",
    "🕷️": "spider",
    "🦟": "mosquito",
    "🐜": "ant",
    "🦠": "microbe",
    "🧑‍🚀": "astronaut",
    "🤖": "robot",
    "🛢️": "oildrum",
    "👾": "monster",
  };

  render() {
    const { emoji } = this.props;
    const emojiMappedTo = this.emojiMap[emoji];
    let output = <></>;
    if (emojiMappedTo) {
      output = <div className={"emoji emoji-" + emojiMappedTo}></div>;
    } else {
      output = <div>{emoji}</div>;
    }

    return <>{output}</>;
  }
}
