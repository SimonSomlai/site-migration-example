import React, { FunctionComponent } from "react";
import styled from "styled-components";

const atomOneDarkColors = [
  "#e06c75",
  "#d19a66",
  "#e5c07b",
  "#98c379",
  "#56b6c2",
  "#61afef",
  "#c678dd",
  "#be5046",
];

const Button = styled.button`
  margin-bottom: 20px;
`;

export const Test: FunctionComponent = () => {
  const getRandomNumber = (endRange) => {
    // Generate a random number between 0 (inclusive) and 1 (exclusive)
    const randomNumber = Math.random();

    // Scale the random number to the range between 1 (inclusive) and endRange (inclusive)
    const scaledRandomNumber = Math.floor(randomNumber * endRange) + 1;

    return scaledRandomNumber;
  };

  const rotateEverything = () => {
    const elem = document.querySelectorAll(
      "p,li,a,ul,ol,button,hr, h1, h2,h3,pre,img"
    );
    const wrapper = document.getElementById("content");

    [...elem].forEach((el) => {
      const randomIndex = Math.floor(getRandomNumber(atomOneDarkColors.length));
      const randomColor = atomOneDarkColors[randomIndex];
      const negative = ["-", ""][Math.floor(Math.random() * 2)];

      el.style.transition = "transform 3s ease";
      el.style.transform = `rotate(${negative}${getRandomNumber(
        360
      )}deg) scaleX(${negative}${getRandomNumber(
        2
      )}) scaleY(${negative}${getRandomNumber(
        2
      )}) translate(${negative}${getRandomNumber(
        20
      )}px, ${negative}${getRandomNumber(20)}px)`;
      el.style.color = randomColor;
    });
    wrapper.style.overflow = "inherit";

    setTimeout(() => {
      [...elem].forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
        el.style.color = "";
      });
      wrapper.style.overflow = "hidden";
    }, 3000);
  };

  return (
    <Button
      className="button button-rounded btn-block button-3d mb-20"
      onClick={rotateEverything}
    >
      Whatever
    </Button>
  );
};
