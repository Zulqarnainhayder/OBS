
const max = 4;
const min = 1;

export const makeApiResponse = (data) => new Promise((resolve) => {
  setTimeout(() => resolve({ data }), (Math.floor( Math.random() * (max - min)) + min) * 1000)
});
