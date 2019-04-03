import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const statisticCtx = document.querySelector(`.statistic__chart`);
let watchedStatistics = {};
let myChart = null;

const drawStat = (movies) => {
  const genresStat = getStat(movies);

  myChart = new Chart(statisticCtx, {
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
      },
      maintainAspectRatio: false
    }
  });
};

const unrenderStat = () => {
  if (myChart) {
    myChart.destroy();
  }
};

const getTotalDuration = (movies) => {
  return movies.reduce((acc, movie) => {
    return acc + movie.runtime;
  }, 0);
};

const sortObject = (obj) => {
  const sorted = Object.entries(obj).sort((a, b) => {
    return b[1] - a[1];
  });
  return sorted;
};

const getStat = (movies) => {
  const genresStats = {};
  const filteredMovies = movies.filter((movie) => movie.isWatched);
  const allGenres = [];
  watchedStatistics.watchedAmount = filteredMovies.length;
  watchedStatistics.watchedDuration = getTotalDuration(filteredMovies);
  filteredMovies.forEach((movie) => {
    for (let value of [...movie.genre]) {
      allGenres.push(value);
      if (genresStats.hasOwnProperty(value)) {
        genresStats[value]++;
      } else {
        genresStats[value] = 1;
      }
    }
  });

  const labels = sortObject(genresStats).map((item) => item[0]);
  const values = sortObject(genresStats).map((item) => item[1]);
  watchedStatistics.mostWatchedGenre = labels[0];

  statisticCtx.height = BAR_HEIGHT * labels.length;

  return {labels, values};
};

const statForImport = watchedStatistics;

export {drawStat, unrenderStat, statForImport};
