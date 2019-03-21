import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const statisticCtx = document.querySelector(`.statistic__chart`);
statisticCtx.height = BAR_HEIGHT * 5;

const drawStat = (cards) => {
  const genresStat = getStat(cards);

  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresStat.labels,
      datasets: [{
        data: genresStat.values.sort((a, b) => {
          return b - a;
        }),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `tomato`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getStat = (cards) => {
  const genresStats = {};
  cards.forEach((card) => {
    if (genresStats.hasOwnProperty([...card.genres][0])) {
      genresStats[[...card.genres][0]]++;
    } else {
      genresStats[[...card.genres][0]] = 1;
    }
  });

  const labels = Object.keys(genresStats);
  const values = Object.values(genresStats);

  return {labels, values};
};

export {drawStat};
