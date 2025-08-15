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
  body { 
    font-family: 'Courier New', monospace; 
    padding: 20px; 
    background: linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #002B3D 100%); 
    color: white; 
    min-height: 100vh;
    margin: 0;
  }
  
  h1 {
    text-shadow: 0 0 20px #1AC8ED;
    animation: glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes glow {
    from { text-shadow: 0 0 20px #1AC8ED; }
    to { text-shadow: 0 0 30px #1AC8ED, 0 0 40px #1AC8ED; }
  }
  
  .toggle { 
    padding: 15px; 
    margin: 15px 0; 
    border: 2px solid #1AC8ED; 
    border-radius: 12px; 
    background: linear-gradient(135deg, rgba(26, 200, 237, 0.1), rgba(0, 43, 61, 0.2));
    backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .toggle::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(26, 200, 237, 0.3), transparent);
    transition: left 0.6s;
  }
  
  .toggle:hover {
    background: linear-gradient(135deg, rgba(26, 200, 237, 0.2), rgba(0, 43, 61, 0.4));
    transform: translateX(8px) scale(1.02);
    box-shadow: 0 8px 25px rgba(26, 200, 237, 0.3);
  }
  
  .toggle:hover::before {
    left: 100%;
  }
  
  #hdAnalysis {
    animation: slideDown 0.5s ease-out;
    box-shadow: 0 4px 15px rgba(26, 200, 237, 0.2);
  }
  
  @keyframes slideDown {
    from { 
      opacity: 0; 
      transform: translateY(-20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .status-on { 
    color: #00ff88; 
    font-weight: bold; 
    text-shadow: 0 0 10px #00ff88;
  }
  
  .status-off { 
    color: #ff6b6b; 
    text-shadow: 0 0 10px #ff6b6b;
  }
  
  input[type="checkbox"] {
    transform: scale(1.2);
    margin-right: 10px;
  }
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
      
      <div id="hdAnalysis" style="display: none; color: #1AC8ED; margin: 15px; padding: 15px; 
      border: 2px dashed #1AC8ED; border-radius: 8px; background: rgba(26, 200, 237, 0.1);">
  📈 <strong>HD Analysis Active:</strong><br>
  Trend Strength: 78.5% | Signal Confidence: HIGH<br>
  Next Entry Window: 2.3 minutes | Risk Level: LOW
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
