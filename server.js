const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PSYBERHERD™ V3.1</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #0A0A0A; color: white; }
        .toggle { padding: 10px; margin: 10px; border: 1px solid #1AC8ED; border-radius: 5px; }
      </style>
    </head>
    <body>
      <h1 style="color: #1AC8ED">🎖️ PSYBERHERD™ Strategic Vision Hub V3.1</h1>
      <h2>STATUS: OPERATIONAL</h2>
      <p>Deployment: SUCCESS</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      
      <div class="toggle">
        <label>
          <input type="checkbox" id="hdToggle" onchange="toggleHD()"> 
          HD Pattern: <span id="hdStatus">OFF</span>
        </label>
      </div>
      
      <div class="toggle">
        <label>
          <input type="checkbox" id="txfToggle" onchange="toggleTXF()"> 
          TXF Pattern: <span id="txfStatus">OFF</span>
        </label>
      </div>

      <p><a href="/health">Health Check</a></p>
      
      <script>
        function toggleHD() {
          const checkbox = document.getElementById('hdToggle');
          const status = document.getElementById('hdStatus');
          status.textContent = checkbox.checked ? 'ON' : 'OFF';
        }
        
        function toggleTXF() {
          const checkbox = document.getElementById('txfToggle');
          const status = document.getElementById('txfStatus');
          status.textContent = checkbox.checked ? 'ON' : 'OFF';
        }
      </script>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    system: 'PSYBERHERD Strategic Vision Hub V3.1',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 PSYBERHERD V3.1 operational on port', PORT);
});
