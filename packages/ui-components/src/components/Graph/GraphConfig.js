// Define the range for the x-axis (in milliseconds)
export const XAXISRANGE = 777600000; // Example: 9 days in milliseconds

// Sample initial data for the chart
export const data = [
  { x: new Date().getTime(), y: 30 },
  { x: new Date().getTime() + 1000, y: 40 },
  { x: new Date().getTime() + 2000, y: 35 },
  // Add more initial data points if needed
];

export const initialOptions = {
  chart: {
    id: 'realtime',
    height: 350,
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: 'Dynamic Updating Chart',
    align: 'left',
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'datetime',
    range: XAXISRANGE,
  },
  yaxis: {
    max: 100,
  },
  legend: {
    show: false,
  },
};

export const initialSeries = [{ data: data.slice() }];

export function getNewSeries(lastDate, range) {
  const newDate = lastDate + 60000;
  lastDate = newDate;

  const newData = {
    x: newDate,
    y: Math.floor(Math.random() * (range.max - range.min + 1)) + range.min,
  };

  data.push(newData);
  if (data.length > 10) {
    data.shift();
  }

  return data;
}
