// ##############################
// Chart variables
// #############################import 'chartjs-plugin-gradient';
// import 'chartjs-plugin-gradient';

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
    console.log(rentalHistory);
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
  options: chart1_2_options,
};

// #########################################
// // // used inside src/views/Dashboard.js
// #########################################
let chartExample3 = {
  data: (array) => {
    // Check if array is not empty
    if (!array || array.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: "Hide/Show Chart",
          data: [],
        }],
      };
    }

    // Extract the creation dates from the user data
    const creationDates = array.map(car => new Date(car.createdAt));

    // Check if creationDates array is not empty
    if (!creationDates || creationDates.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: "Hide/Show Chart",
          data: [],
        }],
      };
    }

    // Create a labels array for the months
    const labels = Array.from({ length: 12 }, (_, i) => new Date(creationDates[0].getFullYear(), i, 1).toLocaleString('default', { month: 'short' }));

    // Calculate the total amount for each month
    const data = Array.from({ length: 12 }, (_, i) => {
      const monthlyCars = array.filter(car => new Date(car.createdAt).getMonth() === i);
      console.log(`Month ${i+1}:`, monthlyCars); // Debugging output
    
      const totalAmount = monthlyCars.reduce((acc, curr) => {
        console.log(acc,"acc",curr,"curr");
        const carAmount = curr?.amount || 0;
        console.log(`Car amount (type): ${typeof carAmount}`); // Inspect the type
        return acc + carAmount;
      }, 0);
      
    
      return totalAmount;
    });
    

    return {
      labels: labels,
      datasets: [{
        label: "Hide/Show Chart",
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#4caf50",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#4caf50",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#4caf50",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: data,
      }],
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
          suggestedMin: 0, // Ensure positive numbers are shown
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
            label: "Affiliated Cars",
            data: [],
          },
        ],
      };
    }
    console.log(typeof(array));
    console.log(array);
    // Extract the creation dates from the user data
    const creationDates = array?.map(user => new Date(user?.createdAt));

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

export { chartExample1, chartExample2, chartExample3, chartExample4 };

