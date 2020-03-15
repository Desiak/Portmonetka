import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const Balance = props => {
  const balance = useSpring({
    from: { number: 0 },
    to: { number: props.income - props.expenses }
  });

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  return (
    <div className="infoArea">
      <div
        onClick={() => {
          set(state => !state);
          props.switchLang();
        }}
      >
        <animated.p
          class="c back"
          style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
        >
          ENG
        </animated.p>
        <animated.p
          class="c front"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
          }}
        >
          PL
        </animated.p>
      </div>
      <h1 className="infoArea__balance">
        {props.header}
        <animated.span>
          {balance.number.interpolate(number =>
            number
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          )}
        </animated.span>{" "}
        zł
      </h1>
    </div>
  );
};

export default Balance;
