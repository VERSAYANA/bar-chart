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

const yScale = d3.scaleLinear();

const paintSvg = (dataset) => {
  const yMin = d3.min(dataset, (d) => d[1]);
  const yMax = d3.max(dataset, (d) => d[1]);

  yScale.domain([yMin, yMax]);
  yScale.range([10, svgHeight]);

  console.log(dataset);

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', 2)
    .attr('height', (d, i) => yScale(d[1]))
    .attr('x', (d, i) => i * 3)
    .attr('y', (d, i) => svgHeight - yScale(d[1]));
};
