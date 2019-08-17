const columnStyles = [
  {
    label: 'Type',
    align: 'right',
    maxWidth: 6,
  },
  {
    label: 'Name',
    align: 'left',
  },
  {
    label: 'Size',
    align: 'right',
    minWidth: 10,
  },
];

const shrinkToFit = (sizes, maxOverallWidth) => {
  if (maxOverallWidth <= sizes.length) {
    return sizes;
  }

  const newSizes = [...sizes];

  while (newSizes.reduce((total, value) => (total + value), 0) > maxOverallWidth) {
    const largest = Math.max(...newSizes);
    const largestIndex = newSizes.indexOf(largest);
    newSizes[largestIndex] -= 1;
  }

  return newSizes;
};

const padAlign = (align, size, text) => {
  const spaceAvailable = Math.max(0, size - text.length);
  const pad = [...new Array(spaceAvailable)].map(() => ' ').join('');

  switch (align) {
    case 'right':
      return `${pad}${text}`.substr(-size);
    case 'left':
    default:
      return `${text}${pad}`.substring(0, size);
  }
};

const distributeContent = (data, max) => {
  if (!data.length) {
    return [];
  }

  const maxOverallWidth = max - (data[0].length * 3);

  const maxSizes = data.reduce((total = [], line) => (
    line.map((cell, index) => (
      Math.max(cell.length, total[index] || 0)
    ))
  ), []);

  const sizes = maxSizes.map((colLongest, index) => {
    const { maxWidth = 500, minWidth = 1 } = columnStyles[index];
    return Math.min(maxWidth, Math.max(minWidth, colLongest));
  });

  const shrunkSizes = shrinkToFit(sizes, maxOverallWidth);

  const padded = data.map(row => (
    row.map((cellText, index) => {
      const { align = 'left' } = columnStyles[index];
      const size = shrunkSizes[index];
      return padAlign(align, size, cellText);
    })
  ));

  return padded.map(row => row.join(' │ '));
};


export default distributeContent;
