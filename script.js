let Availability = 0;
let Performance = 0;
let Quality = 0;
let oeeChart = null;

function updateAvailability(m1, m2, m3, m4, m5) {
  const Availability_Value = [
    { id: "Availability_Machine1", value: m1 },
    { id: "Availability_Machine2", value: m2 },
    { id: "Availability_Machine3", value: m3 },
    { id: "Availability_Machine4", value: m4 },
    { id: "Availability_Machine5", value: m5 },
  ];

  Availability_Value.forEach((Availability_Value) => {
    const element = document.getElementById(Availability_Value.id);
    const value = Availability_Value.value;

    // กำหนดสีตามเงื่อนไข
    if (value > 80) {
      element.className = "progress-fill green";
    } else if (value >= 50 && value <= 80) {
      element.className = "progress-fill yellow";
    } else {
      element.className = "progress-fill red";
    }

    // ปรับความกว้างและตัวเลขใน progress bar
    element.style.width = value + "%";
    element.textContent = value + "%";
  });
  Availability = (m1 + m2 + m3 + m4 + m5) / 5;
  return Availability;
}

function updatePerformance(m1, m2, m3, m4, m5) {
  const Performance_Value = [
    { id: "Performance_Machine1", value: m1 },
    { id: "Performance_Machine2", value: m2 },
    { id: "Performance_Machine3", value: m3 },
    { id: "Performance_Machine4", value: m4 },
    { id: "Performance_Machine5", value: m5 },
  ];

  Performance_Value.forEach((Performance_Value) => {
    const element = document.getElementById(Performance_Value.id);
    const value = Performance_Value.value;

    // กำหนดสีตามเงื่อนไข
    if (value > 80) {
      element.className = "progress-fill green";
    } else if (value >= 50 && value <= 80) {
      element.className = "progress-fill yellow";
    } else {
      element.className = "progress-fill red";
    }

    // ปรับความกว้างและตัวเลขใน progress bar
    element.style.width = value + "%";
    element.textContent = value + "%";
  });
  Performance = (m1 + m2 + m3 + m4 + m5) / 5;
  return Performance;
}

function updateQuality(m1, m2, m3, m4, m5) {
  const Quality_Value = [
    { id: "Quality_Machine1", value: m1 },
    { id: "Quality_Machine2", value: m2 },
    { id: "Quality_Machine3", value: m3 },
    { id: "Quality_Machine4", value: m4 },
    { id: "Quality_Machine5", value: m5 },
  ];

  Quality_Value.forEach((Quality_Value) => {
    const element = document.getElementById(Quality_Value.id);
    const value = Quality_Value.value;

    // กำหนดสีตามเงื่อนไข
    if (value > 80) {
      element.className = "progress-fill green";
    } else if (value >= 50 && value <= 80) {
      element.className = "progress-fill yellow";
    } else {
      element.className = "progress-fill red";
    }

    // ปรับความกว้างและตัวเลขใน progress bar
    element.style.width = value + "%";
    element.textContent = value + "%";
  });
  Quality = (m1 + m2 + m3 + m4 + m5) / 5;
  return Quality;
}

function calculateOEE() {
  if (!Availability || !Performance || !Quality) return 0;
  return Math.round(
    (Availability / 100) * (Performance / 100) * (Quality / 100) * 100
  );
}

// Gauge Chart Function
function createGaugeChart(canvasId, value, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [value, 100 - value],
          backgroundColor: [color, "#e0e0e0"],
          borderWidth: 0,
          circumference: 180,
          rotation: 270,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: "75%",
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
    plugins: [
      {
        id: "text",
        beforeDraw: function (chart) {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;
          ctx.restore();
          ctx.font = "bold 32px Arial";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#333";

          const text = value + "%";
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2 + 20;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ],
  });
}

// Create Gauge Charts และอัปเดตค่า
createGaugeChart(
  "availabilityGauge",
  updateAvailability(62, 55, 75, 45, 90),
  "#ff3b30"
);
createGaugeChart(
  "performanceGauge",
  updatePerformance(73, 65, 75, 47, 83),
  "#4ecdc4"
);
createGaugeChart("qualityGauge", updateQuality(100, 82, 86, 75, 51), "#9b59b6");

// คำนวณ OEE หลังจากมีค่าแล้ว
let oee = calculateOEE();

// OEE Doughnut Chart
const oeeCtx = document.getElementById("oeeChart").getContext("2d");
oeeChart = new Chart(oeeCtx, {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [oee, 100 - oee],
        backgroundColor: ["#7ed321", "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  },
  plugins: [
    {
      id: "text",
      beforeDraw: function (chart) {
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#333";
        ctx.fontWeight = "bold";

        const text = `${calculateOEE()}%`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2 - 10;
        ctx.font = "bold 48px Arial";
        ctx.fillText(text, textX, textY);

        ctx.font = "24px Arial";
        ctx.fillStyle = "#666";
        const labelText = "OEE";
        const labelX = Math.round(
          (width - ctx.measureText(labelText).width) / 2
        );
        const labelY = height / 2 + 30;
        ctx.fillText(labelText, labelX, labelY);
        ctx.save();
      },
    },
  ],
});

// Trend Line Chart
const trendCtx = document.getElementById("trendChart").getContext("2d");
new Chart(trendCtx, {
  type: "line",
  data: {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม"],
    datasets: [
      {
        data: [18, 16, 30, 40, 50],
        borderColor: "#2c3e50",
        backgroundColor: "transparent",
        tension: 1,
        borderWidth: 2,
      },
      {
        data: [10, 5, 40, 15, 32],
        borderColor: "#4ecdc4",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
      },
      {
        data: [13, 15, 38, 32, 42],
        borderColor: "#3498db",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
      },
      {
        data: [8, 13, 25, 30, 41],
        borderColor: "#9b59b6",
        backgroundColor: "transparent",
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 10,
        },
        grid: {
          color: "#e0e0e0",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});
