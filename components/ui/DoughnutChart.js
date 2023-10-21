import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function DoughnutChart({ userSkills, jobSkills }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const commonElements = jobSkills.filter((skill) =>
      userSkills.includes(skill)
    );
    const uniqueJobSkills = jobSkills.filter(
      (skill) => !userSkills.includes(skill)
    );

    const data = [
      ...commonElements.map(() => 1),
      ...uniqueJobSkills.map(() => 1),
    ];

    const backgroundColor = [
      ...commonElements.map(() => "#90EE90"),
      ...uniqueJobSkills.map(() => "#93C5FD"),
    ];

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [...commonElements, ...uniqueJobSkills],
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColor,
            borderWidth: 0, // Remove borders
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Remove legend
          },
        },
      },
    });


    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [userSkills, jobSkills]);

  return (
    <canvas className="h-28 w-28 overflow-visible" ref={canvasRef}></canvas>
  );
}

export default DoughnutChart;
