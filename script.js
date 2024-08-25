document.addEventListener('DOMContentLoaded', () => {
  fetch('pagespeed_scores_yash.csv')
      .then(response => response.text())
      .then(text => parseCSV(text))
      .then(data => {
          const desktopData = data.filter(item => item.url.startsWith('Desktop'));
          const mobileData = data.filter(item => item.url.startsWith('Mobile'));
          
          // Sort the data in ascending order based on performance
          desktopData.sort((a, b) => a.performance - b.performance);
          mobileData.sort((a, b) => a.performance - b.performance);
          
          createCharts(desktopData, 'Desktop');
          createCharts(mobileData, 'Mobile');
          populateTable(data);
      })
      .catch(error => console.error('Error fetching CSV data:', error));
});

function parseCSV(text) {
  const rows = text.split('\n').slice(1); 
  return rows.map(row => {
      const [url, performance, accessibility, bestPractices, seo, pagespeedLink] = row.split(',');
      return {
          url,
          performance: parseFloat(performance),
          accessibility: parseFloat(accessibility),
          bestPractices: parseFloat(bestPractices),
          seo: parseFloat(seo),
          pagespeedLink
      };
  });
}

function createCharts(data, type) {
  const urls = data.map(item => item.url.replace(`${type} - `, ''));
  const performanceScores = data.map(item => item.performance);
  const accessibilityScores = data.map(item => item.accessibility);
  const bestPracticesScores = data.map(item => item.bestPractices);
  const seoScores = data.map(item => item.seo);

  // Performance Chart
  new Chart(document.getElementById(`${type.toLowerCase()}PerformanceChart`), {
      type: 'bar',
      data: {
          labels: urls,
          datasets: [{
              label: `${type} Performance`,
              data: performanceScores,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });

  // Accessibility Chart
  new Chart(document.getElementById(`${type.toLowerCase()}AccessibilityChart`), {
      type: 'bar',
      data: {
          labels: urls,
          datasets: [{
              label: `${type} Accessibility`,
              data: accessibilityScores,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });

  // Best Practices Chart
  new Chart(document.getElementById(`${type.toLowerCase()}BestPracticesChart`), {
      type: 'bar',
      data: {
          labels: urls,
          datasets: [{
              label: `${type} Best Practices`,
              data: bestPracticesScores,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });

  // SEO Chart
  new Chart(document.getElementById(`${type.toLowerCase()}SeoChart`), {
      type: 'bar',
      data: {
          labels: urls,
          datasets: [{
              label: `${type} SEO`,
              data: seoScores,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  max: 100
              }
          }
      }
  });
}

function populateTable(data) {
  const tableBody = document.getElementById('scoresTable').getElementsByTagName('tbody')[0];
  
  data.forEach(item => {
      const row = tableBody.insertRow();
      
      if (item.url.startsWith('Desktop')) {
          row.style.backgroundColor = '#dcdcdc'; // Darker background for desktop
      }
      
      row.insertCell(0).textContent = item.url;
      addCell(row.insertCell(1), item.performance);
      addCell(row.insertCell(2), item.accessibility);
      addCell(row.insertCell(3), item.bestPractices);
      addCell(row.insertCell(4), item.seo);

      // Adding the link
      const linkCell = row.insertCell(5);
      const link = document.createElement('a');
      link.href = item.pagespeedLink;
      link.textContent = 'Link to Page';
      link.target = '_blank';
      linkCell.appendChild(link);
  });
}

function addCell(cell, score) {
  if (score !== null) {
      cell.textContent = score.toFixed(2);
  } else {
      cell.textContent = 'N/A';
  }

  if (score >= 90) {
      cell.style.backgroundColor = 'lightgreen';
  } else if (score < 90 && score >= 80) {
      cell.style.backgroundColor = 'lightcoral';
  } else if (score < 80) {
      cell.style.backgroundColor = 'darkred';
      cell.style.color = 'white'; 
  }
}
