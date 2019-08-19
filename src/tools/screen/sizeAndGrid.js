const sizeAndGrid = (screen) => {
  const { width, height } = screen;
  const colLeft = Math.ceil(width * 0.6);
  const colRight = width - colLeft + 1;

  return {
    width,
    height,
    columns: {
      left: colLeft,
      right: colRight,
    },
  };
};

export default sizeAndGrid;
