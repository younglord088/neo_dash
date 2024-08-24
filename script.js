document.addEventListener('DOMContentLoaded', () => {
    fetch('pagespeed_scores.csv')
      .then(response => response.text())
      .then(text => parseCSV(text))
      .then(data => {
        createCharts(data);
        populateTable(data);
      })
      .catch(error => console.error('Error fetching CSV data:', error));
  });
  
  function parseCSV(text) {
    const rows = text.split('\n').slice(1); 
    return rows.map(row => {
      const [url, performance, accessibility, bestPractices, seo] = row.split(',');
      return {
        url,
        performance: parseFloat(performance),
        accessibility: parseFloat(accessibility),
        bestPractices: parseFloat(bestPractices),
        seo: parseFloat(seo)
      };
    });
  }
  
  function createCharts(data) {
    const urls = data.map(item => item.url);
    const performanceScores = data.map(item => item.performance);
    const accessibilityScores = data.map(item => item.accessibility);
    const bestPracticesScores = data.map(item => item.bestPractices);
    const seoScores = data.map(item => item.seo);
  
    // Performance Chart
    new Chart(document.getElementById('performanceChart'), {
      type: 'bar',
      data: {
        labels: urls,
        datasets: [{
          label: 'Performance',
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
  
   
    new Chart(document.getElementById('accessibilityChart'), {
      type: 'bar',
      data: {
        labels: urls,
        datasets: [{
          label: 'Accessibility',
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
  
    
    new Chart(document.getElementById('bestPracticesChart'), {
      type: 'bar',
      data: {
        labels: urls,
        datasets: [{
          label: 'Best Practices',
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
  
  
    new Chart(document.getElementById('seoChart'), {
      type: 'bar',
      data: {
        labels: urls,
        datasets: [{
          label: 'SEO',
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
      row.insertCell(0).textContent = item.url;
      addCell(row.insertCell(1), item.performance);
      addCell(row.insertCell(2), item.accessibility);
      addCell(row.insertCell(3), item.bestPractices);
      addCell(row.insertCell(4), item.seo);
    });
  }
  
  function addCell(cell, score) {
    cell.textContent = score.toFixed(2);
    
    if (score >= 90) {
      cell.style.backgroundColor = 'lightgreen';
    } else if (score < 90 && score >= 80) {
      cell.style.backgroundColor = 'lightcoral';
    } else {
      cell.style.backgroundColor = 'darkred';
      cell.style.color = 'white'; 
    }
  }
  