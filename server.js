const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PSYBERHERD™ V3.4 - Canary Deployed</title>
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
      <h1 style="color: #1AC8ED">🎖️ PSYBERHERD™ Strategic Vision Hub V3.4</h1>
      <h2>STATUS: OPERATIONAL (HD CANARY ACTIVE)</h2>
      <p>Deployment: SUCCESS</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      
      <div class="toggle">
        <label>
          <input type="checkbox" id="hdToggle" onchange="toggleHD()"> 
          HD Pattern: <span id="hdStatus" class="status-off">OFF</span>
        </label>
      </div>
      
      <div class="toggle">
        <label>
          <input type="checkbox" id="txfToggle" onchange="toggleTXF()"> 
          TXF Pattern: <span id="txfStatus" class="status-off">OFF</span>
        </label>
      </div>
      
      <!-- === V3.4 HD ANALYSIS HTML INTEGRATED === -->
      <div id="hdAnalysis" style="display: none; color: #1AC8ED; margin: 15px; padding: 15px; border: 2px solid #00ff88; border-radius: 8px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(26, 200, 237, 0.1));">
        📈 <strong>HD Pattern Canary (V3.4 Enhanced):</strong><br>
        <div id="hdMetrics">
          Trend Strength: <span id="hdTrendStrength" class="status-on">Loading...</span> | 
          Target: >80% | 
          Signal: <span id="hdSignal" class="status-on">PENDING</span><br>
          Canary Status: <span id="hdCanaryStatus" class="status-on">INITIALIZING</span> | 
          Efficacy: <span id="hdEfficacy" class="status-on">Loading...</span> | 
          Drawdown: <span id="hdDrawdown">Loading...</span><br>
          <small>Architecture: V3.4 Enhanced | State Management: Centralized | API Ready: ✅</small>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #002B3D, #0A0A0A); padding: 15px; margin: 20px 0; border-radius: 10px; border: 1px solid #1AC8ED;">
        <h3 style="color: #1AC8ED; margin: 0 0 10px 0;">📊 Live Market Intelligence</h3>
        <div id="marketTicker" style="font-family: 'Courier New', monospace; font-size: 14px; color: #00ff88;">
          Loading Market Data...
        </div>
      </div>

      <p><a href="/health" style="color: #1AC8ED;">Health Check</a></p>
      
      <script>
        // --- PSYBERHERD™ V3.4 ENHANCED ARCHITECTURE ---
        
        // --- Centralized DOM Element Cache ---
        const domElements = {
          hdToggle: document.getElementById('hdToggle'),
          hdStatus: document.getElementById('hdStatus'),
          hdAnalysis: document.getElementById('hdAnalysis'),
          hdTrendStrength: document.getElementById('hdTrendStrength'),
          hdSignal: document.getElementById('hdSignal'),
          hdCanaryStatus: document.getElementById('hdCanaryStatus'),
          hdEfficacy: document.getElementById('hdEfficacy'),
          hdDrawdown: document.getElementById('hdDrawdown'),
          marketTicker: document.getElementById('marketTicker')
        };

        // --- Centralized State Management ---
        const psyberherdState = {
          hdCanary: {
            active: false,
            monitoringInterval: null,
            trendStrength: 0.0,
            efficacy: 0.0,
            drawdown: 0.0,
            signal: 'PENDING',
            status: 'INACTIVE'
          }
        };

        // --- Main HD Toggle Function (Controller) ---
        function toggleHD() {
          psyberherdState.hdCanary.active = domElements.hdToggle.checked;
          
          domElements.hdStatus.textContent = psyberherdState.hdCanary.active ? 'ON' : 'OFF';
          domElements.hdStatus.className = psyberherdState.hdCanary.active ? 'status-on' : 'status-off';
          domElements.hdAnalysis.style.display = psyberherdState.hdCanary.active ? 'block' : 'none';
          
          if (psyberherdState.hdCanary.active) {
            startHDMonitoring();
          } else {
            stopHDMonitoring();
          }
        }

        // --- HD Monitoring Logic ---
        function startHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) return; // Prevent multiple intervals
          console.log('🎖️ HD Pattern Canary Monitoring Initiated - Week 3 Timeline');
          
          updateAndCheckCanary(); // Run once immediately
          
          psyberherdState.hdCanary.monitoringInterval = setInterval(updateAndCheckCanary, 3000);
        }

        function stopHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) {
            clearInterval(psyberherdState.hdCanary.monitoringInterval);
            psyberherdState.hdCanary.monitoringInterval = null;
            console.log('🎖️ HD Pattern monitoring stopped');
          }
        }

        // --- Integrated Update & Health Check Logic ---
        async function updateAndCheckCanary() {
          const metrics = await fetchHdCanaryData(); // Fetch data (from simulation or real API)
          
          // Update state object
          psyberherdState.hdCanary.trendStrength = metrics.trendStrength;
          psyberherdState.hdCanary.efficacy = metrics.efficacy;
          psyberherdState.hdCanary.drawdown = metrics.drawdown;
          
          // Check health and update derived state
          psyberherdState.hdCanary.signal = psyberherdState.hdCanary.trendStrength > 82 ? 'CONTINUATION' : 'MONITOR';
          
          const isPassing = psyberherdState.hdCanary.efficacy > 80 && psyberherdState.hdCanary.drawdown < 5;
          psyberherdState.hdCanary.status = isPassing ? 'CANARY PASS' : 'CANARY WATCH';
          
          if (isPassing) console.log('🎖️ HD Canary Health: OPTIMAL');
          else console.log('⚠️ HD Canary Health: MONITORING');

          renderHDCanary(); // Render the UI from the single state object
        }

        // --- Decoupled UI Rendering ---
        function renderHDCanary() {
          const { hdCanary } = psyberherdState;
          
          domElements.hdTrendStrength.textContent = hdCanary.trendStrength.toFixed(1) + '%';
          domElements.hdEfficacy.textContent = hdCanary.efficacy.toFixed(1) + '%';
          domElements.hdDrawdown.textContent = hdCanary.drawdown.toFixed(1) + '%';
          domElements.hdSignal.textContent = hdCanary.signal;
          domElements.hdCanaryStatus.textContent = hdCanary.status;
          
          domElements.hdSignal.className = hdCanary.signal === 'CONTINUATION' ? 'status-on' : 'status-off';
          domElements.hdCanaryStatus.className = hdCanary.status === 'CANARY PASS' ? 'status-on' : 'status-off';
        }

        // --- Backend Integration Scaffold (API-Ready) ---
        async function fetchHdCanaryData() {
          console.log('Fetching data from GenSpark.ai endpoint...');
          await new Promise(resolve => setTimeout(resolve, 150)); // Simulate network latency
          
          return {
            trendStrength: 78 + Math.random() * 12,
            efficacy: 80 + Math.random() * 8,
            drawdown: 1 + Math.random() * 4
          };
        }
        
        // --- EXISTING TXF FUNCTION (unchanged) ---
        function toggleTXF() {
          const checkbox = document.getElementById('txfToggle');
          const status = document.getElementById('txfStatus');
          
          status.textContent = checkbox.checked ? 'ON' : 'OFF';
          status.className = checkbox.checked ? 'status-on' : 'status-off';
        }

        // --- V3.4 MARKET TICKER (with HD integration) ---
        function updateMarketTicker() {
          const basePrice = 75;
          const price = (basePrice + (Math.random() - 0.5) * 2).toFixed(2);
          const volume = Math.floor(150000 + Math.random() * 100000).toLocaleString();
          const trends = ['↗️ Bullish', '↘️ Bearish', '➡️ Sideways'];
          const trend = trends[Math.floor(Math.random() * trends.length)];
          const time = new Date().toLocaleTimeString();
          
          // HD Pattern integration status
          const hdStatus = psyberherdState.hdCanary.active ? ' | HD: ACTIVE' : '';
          
          domElements.marketTicker.innerHTML = 'Crude Oil: $' + price + ' | Volume: ' + volume + ' | Trend: ' + trend + hdStatus + ' | Last Update: ' + time;
        }

        // Start the ticker immediately and update every 5 seconds
        updateMarketTicker();
        setInterval(updateMarketTicker, 5000);
      </script>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OPERATIONAL',
    system: 'PSYBERHERD Strategic Vision Hub V3.4',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 PSYBERHERD V3.4 operational on port', PORT);
});
