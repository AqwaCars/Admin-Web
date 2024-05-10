// ##############################
// // // Chart variables
// #############################

// chartExample1 and chartExample2 options
let chart1_2_options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.0)",
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
    xAxes: {
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: "rgba(29,140,248,0.1)",
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a",
      },
    },
  },
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample1 = {
  data1: (array) => {
    // Check if array array is not empty
    if (array?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Empty Data",
            data: [],
          },
        ],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user.createdAt));

    // Check if creationDates array is not empty
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));

    // Create a data array for the Hide/Show Charts
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);

    return {
      labels: labels,
      datasets: [
        {
          label: "Rentals Accepted",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },


  data2: (rentalHistory) => {
    if (rentalHistory?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }
    const creationDates = rentalHistory?.map(user => new Date(user.startDate));
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));
    return {
      labels: labels,
      datasets: [
        {
          label: "Rental Pending",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },

  data3: (array) => {
    // Check if array array is not empty
    if (array?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user.createdAt));

    // Check if creationDates array is not empty
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));

    // Create a data array for the Hide/Show Charts
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);

    return {
      labels: labels,
      datasets: [
        {
          label: "Rental Rejected",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },
  options: chart1_2_options,
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample2 = {
  data: (array) => {
    // Check if array array is not empty
    if (array?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user.createdAt));

    // Check if creationDates array is not empty
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));

    // Create a data array for the Hide/Show Charts
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);

    return {
      labels: labels,
      datasets: [
        {
          label: "User Count",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },
  options: chart1_2_options,
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample3 = {
  data: (array) => {
    // Check if array array is not empty
    if (array?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user.createdAt));

    // Check if creationDates array is not empty
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));

    // Create a data array for the Hide/Show Charts
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);

    return {
      labels: labels,
      datasets: [
        {
          label: "Income ",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 120,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        gridLines: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  },
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
const chartExample4 = {
  data: (array) => {
    // Check if array array is not empty
    if (array?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Cars Count",
            data: [],
          },
        ],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user.createdAt));

    // Check if creationDates array is not empty
    if (creationDates?.length === 0) {
      return {
        labels: [],
        datasets: [
          {
            label: "Hide/Show Chart",
            data: [],
          },
        ],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(Array.isArray(creationDates) ? creationDates[0].getFullYear() : [], i).toLocaleString('default', { month: 'short' }));

    // Create a data array for the Hide/Show Charts
    const data = Array.from({ length: 12 }, (_, i) => creationDates?.filter(date => date.getMonth() === i).length);

    return {
      labels: labels,
      datasets: [
        {
          label: "Hide/Show Chart",
          fill: true,
          backgroundColor: "rgba(29,140,248,0.2)",
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: data,
        },
      ],
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(0,242,195,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  },
};

module.exports = {
  chartExample1, // in src/views/Dashboard.js
  chartExample2, // in src/views/Dashboard.js
  chartExample3, // in src/views/Dashboard.js
  chartExample4, // in src/views/Dashboard.js
};
