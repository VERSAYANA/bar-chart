const url =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(url)
  .then((response) => {
    if (response.status !== 200) {
      console.log(`Status code: ${response.status}`);
      return;
    }
    response.json().then((d) => {
      console.log(d.data);
    });
  })
  .catch((err) => {
    console.log('Fetch error:', err);
  });

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 250);

const paintSvg = () => {};
