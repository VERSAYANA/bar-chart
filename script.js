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

const svgWidth = 825;
const svgHeight = 400;

const svg = d3
  .select('#svg-container')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

const tooltip = d3
  .select('#svg-container')
  .append('div')
  .attr('id', 'tooltip');

const yScale = d3.scaleLinear();

const formatTooltipText = (data) => {
  return `
    <p>${data[0]}</p>
    <p>${data[1]}</p>
  `;
};

const paintSvg = (dataset) => {
  const yMin = d3.min(dataset, (d) => d[1]);
  const yMax = d3.max(dataset, (d) => d[1]);

  yScale.domain([yMin, yMax]);
  yScale.range([(yMin / yMax) * svgHeight, svgHeight]);

  console.log(dataset);

  svg
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', 2)
    .attr('height', (d, i) => yScale(d[1]))
    .attr('x', (d, i) => i * 3)
    .attr('y', (d, i) => svgHeight - yScale(d[1]))
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .attr('class', 'bar')
    .on('mouseover', (d, i) => {
      tooltip
        .style('opacity', 1)
        .style('bottom', yScale(d[1]) + 8 + 'px')
        .style('left', i * 3 + 'px')
        .attr('data-date', d)
        .html(formatTooltipText(d));
    })
    .on('mouseout', (d) => {
      tooltip.style('opacity', 0);
    })
    .append('title')
    .text((d) => d[0]);
};
