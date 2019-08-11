const scaleRawImage = (rawImage, factor) => {
  const rows = [];

  rawImage.forEach((row) => {
    const pixels = [];
    row.forEach((pixel) => {
      pixels.push(...[...new Array(factor)].map(() => pixel));
    });
    rows.push(...[...new Array(factor)].map(() => [...pixels]));
  });

  return rows;
};

export default scaleRawImage;
