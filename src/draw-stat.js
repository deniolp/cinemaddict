import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const statisticCtx = document.querySelector(`.statistic__chart`);
statisticCtx.height = BAR_HEIGHT * 5;
let watchedStatistics = {};

const drawStat = (cards) => {
  const genresStat = getStat(cards);

  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresStat.labels,
      datasets: [{
        data: genresStat.values,
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

const getTotalDuration = (cards) => {
  return cards.reduce((acc, card) => {
    return acc + card.duration;
  }, 0);
};

const sortObject = (obj) => {
  const sorted = Object.entries(obj).sort((a, b) => {
    return b[1] - a[1];
  });
  return sorted;
};

const getStat = (cards) => {
  const genresStats = {};
  const filteredCards = cards.filter((card) => card.isWatched);
  watchedStatistics.watchedAmount = filteredCards.length;
  watchedStatistics.watchedDuration = getTotalDuration(filteredCards);
  filteredCards.forEach((card) => {
    if (genresStats.hasOwnProperty([...card.genres][0])) {
      genresStats[[...card.genres][0]]++;
    } else {
      genresStats[[...card.genres][0]] = 1;
    }
  });

  const labels = sortObject(genresStats).map((item) => item[0]);
  const values = sortObject(genresStats).map((item) => item[1]);
  watchedStatistics.mostWatchedGenre = labels[0];

  return {labels, values};
};

export {drawStat, watchedStatistics};
