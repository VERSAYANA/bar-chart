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
  .attr('width', svgWidth + 100)
  .attr('height', svgHeight + 100);

const tooltip = d3
  .select('#svg-container')
  .append('div')
  .attr('id', 'tooltip');

const formatTooltipText = (data) => {
  return `
    <p data-date=${data[0]}>${data[0]}</p>
    <p>${data[1]}</p>
  `;
};

const paintSvg = (dataset) => {
  const yMin = d3.min(dataset, (d) => d[1]);
  const yMax = d3.max(dataset, (d) => d[1]);

  const years = dataset.map((d) => d[0].slice(0, 4));

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([0, svgWidth]);

  const xAxis = d3.axisBottom(xScale);

  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([(yMin / yMax) * svgHeight, svgHeight]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([svgHeight, (yMin / yMax) * svgHeight]);

  const yAxis = d3.axisLeft(yAxisScale);

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
    .attr('transform', 'translate(50, 0)')
    .on('mouseover', (d, i) => {
      tooltip
        .style('opacity', 1)
        .style('bottom', yScale(d[1]) + 108 + 'px')
        .style('left', i * 3 + 'px')
        .attr('data-date', d)
        .html(formatTooltipText(d));
    })
    .on('mouseout', (d) => {
      tooltip.style('opacity', 0);
    });

  svg
    .append('g')
    .attr('class', 'axis')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis);

  svg
    .append('g')
    .attr('class', 'axis')
    .attr('id', 'x-axis')
    .attr('transform', `translate(50, 400)`)
    .call(xAxis);
};
