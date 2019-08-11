/*
 * Flips an array diagonally:
 *
 * |---|---|---|
 * | 1 | 2 | 3 |
 * |---|---|---|
 * | 4 | 5 | 6 |
 * |---|---|---|
 * | 7 | 8 | 9 |
 * |---|---|---|
 *
 * becomes:
 *
 * |---|---|---|
 * | 1 | 4 | 7 |
 * |---|---|---|
 * | 2 | 5 | 8 |
 * |---|---|---|
 * | 3 | 6 | 9 |
 * |---|---|---|
 *
 */
const arrayTranspose = m => m[0].map((x, i) => m.map(y => y[i]));

export default arrayTranspose;
