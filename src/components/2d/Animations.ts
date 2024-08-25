export const flipCover = ({ isOuter }: { isOuter: boolean }): Keyframe[] => {
  return [
    {
      transform: "rotateY(0deg)",
      zIndex: isOuter ? 2 : 1,
    },
    {
      transform: "rotateY(90deg)",
      zIndex: isOuter ? 1 : 2,
    },
    {
      transform: "rotateY(180deg)",
      zIndex: isOuter ? 1 : 2,
    },
  ];
};
