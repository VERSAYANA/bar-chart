const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => {
    if (response.status !== 200) {
      console.log(`Status code: ${response.status}`);
      return;
    }
    response.json().then((d) => {
      paintSvg(d.data);
    });
  })
  .catch((err) => {
    console.log('Fetch error:', err);
  });

const svgWidth = 500;
const svgHeight = 250;

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

// const paintSvg = (dataset) => {
//   svg
//     .selectAll('rect')
//     .data(dataset)
//     .append('rect')
//     .attr('x', (d, i) => i * 3);
//     .attr('y', (d, i) => )
// };
