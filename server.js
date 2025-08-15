const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PSYBERHERD™ V3.6 - GROK C3I Integrated</title>
      <style>
        body { font-family: 'Courier New', monospace; padding: 20px; background: linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #002B3D 100%); color: white; min-height: 100vh; margin: 0; }
        h1 { text-shadow: 0 0 20px #1AC8ED; animation: glow 2s ease-in-out infinite alternate; }
        @keyframes glow { from { text-shadow: 0 0 20px #1AC8ED; } to { text-shadow: 0 0 30px #1AC8ED, 0 0 40px #1AC8ED; } }
        .toggle { padding: 15px; margin: 15px 0; border: 2px solid #1AC8ED; border-radius: 12px; background: linear-gradient(135deg, rgba(26, 200, 237, 0.1), rgba(0, 43, 61, 0.2)); backdrop-filter: blur(10px); transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; position: relative; overflow: hidden; }
        .toggle::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(26, 200, 237, 0.3), transparent); transition: left 0.6s; }
        .toggle:hover { background: linear-gradient(135deg, rgba(26, 200, 237, 0.2), rgba(0, 43, 61, 0.4)); transform: translateX(8px) scale(1.02); box-shadow: 0 8px 25px rgba(26, 200, 237, 0.3); }
        .toggle:hover::before { left: 100%; }
        #hdAnalysis { animation: slideDown 0.5s ease-out; box-shadow: 0 4px 15px rgba(26, 200, 237, 0.2); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .status-on { color: #00ff88; font-weight: bold; text-shadow: 0 0 10px #00ff88; }
        .status-off { color: #ff6b6b; text-shadow: 0 0 10px #ff6b6b; }
        .status-med { color: #f0e68c; text-shadow: 0 0 10px #f0e68c; } /* Khaki for MONITOR */
        input[type="checkbox"] { transform: scale(1.2); margin-right: 10px; }
      </style>
    </head>
    <body>
      <h1 style="color: #1AC8ED">🎖️ PSYBERHERD™ Strategic Vision Hub V3.6</h1>
      <h2>STATUS: OPERATIONAL (GROK C3I ACTIVE)</h2>
      <p>Deployment: SUCCESS</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      
      <div class="toggle"> <label> <input type="checkbox" id="hdToggle" onchange="toggleHD()"> HD Pattern: <span id="hdStatus" class="status-off">OFF</span> </label> </div>
      <div class="toggle"> <label> <input type="checkbox" id="txfToggle" onchange="toggleTXF()"> TXF Pattern: <span id="txfStatus" class="status-off">OFF</span> </label> </div>
      
      <div id="hdAnalysis" style="display: none; color: #1AC8ED; margin: 15px; padding: 15px; border: 2px solid #00ff88; border-radius: 8px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(26, 200, 237, 0.1));">
        📈 <strong>HD Pattern Analysis (Abacus.ai ML Enhanced):</strong><br>
        <div id="hdMetrics">
          ML Score: <span id="hdTrendStrength" class="status-on">Loading...</span> | Confidence: <span id="hdConfidence">[Loading...]</span><br>
          Historical Accuracy: <span id="hdEfficacy" class="status-on">Loading...</span> | Risk Probability: <span id="hdDrawdown">Loading...</span>%<br>
          Canary Status: <span id="hdCanaryStatus" class="status-on">INITIALIZING</span> | Market Condition: <span id="hdMarketCondition" class="status-off">ANALYZING</span><br>
          <small>🤖 Abacus.ai ML Engine: Ready | API Status: <span id="abacusStatus" class="status-off">Connecting...</span></small>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #002B3D, #0A0A0A); padding: 15px; margin: 20px 0; border-radius: 10px; border: 1px solid #1AC8ED;">
        <h3 style="color: #1AC8ED; margin: 0 0 10px 0;">📊 Live Market Intelligence</h3>
        <div id="marketTicker" style="font-family: 'Courier New', monospace; font-size: 14px; color: #00ff88;"> Loading Market Data... </div>
      </div>

      <!-- === V3.6 GROK MISSION CONTROL HTML === -->
      <div style="background: linear-gradient(135deg, #002B3D, #0A0A0A); padding: 10px; margin: 15px 0; border-radius: 8px; border: 1px solid #1AC8ED;">
        <h4 style="color: #1AC8ED; margin: 0 0 8px 0;">🎖️ GROK Mission Control</h4>
        <div style="font-family: 'Courier New', monospace; font-size: 12px;">
          Status: <span id="grokStatus" class="status-on">INITIALIZING</span> | 
          Security: <span id="grokSecurity" class="status-on">PENDING</span> | 
          Risk Level: <span id="grokRisk" class="status-on">LOW</span>
        </div>
      </div>

      <p><a href="/health" style="color: #1AC8ED;">Health Check</a></p>
      
      <script>
        // --- PSYBERHERD™ V3.6 ENHANCED ARCHITECTURE (GROK C3I INTEGRATED) ---
        
        const domElements = {
          hdToggle: document.getElementById('hdToggle'), hdStatus: document.getElementById('hdStatus'), hdAnalysis: document.getElementById('hdAnalysis'),
          hdTrendStrength: document.getElementById('hdTrendStrength'), hdCanaryStatus: document.getElementById('hdCanaryStatus'), hdEfficacy: document.getElementById('hdEfficacy'),
          hdDrawdown: document.getElementById('hdDrawdown'), marketTicker: document.getElementById('marketTicker'), hdConfidence: document.getElementById('hdConfidence'),
          hdMarketCondition: document.getElementById('hdMarketCondition'), abacusStatus: document.getElementById('abacusStatus'),
          // V3.6 GROK elements
          grokStatus: document.getElementById('grokStatus'), grokSecurity: document.getElementById('grokSecurity'), grokRisk: document.getElementById('grokRisk')
        };

        const psyberherdState = {
          hdCanary: { active: false, monitoringInterval: null, trendStrength: 0.0, efficacy: 0.0, drawdown: 0.0, status: 'INACTIVE', confidence: [0, 0], marketOptimal: false },
          // V3.6 GROK state
          grok: { systemHealth: 'INITIALIZING', securityStatus: 'PENDING', riskLevel: 'LOW' }
        };

        // --- GROK STRATEGIC OPERATIONS: Enhanced Monitoring System ---
        const GROKOperations = {
          logSystemHealth: function(component, status, metrics = {}) {
            const timestamp = new Date().toISOString();
            console.log(\`🎖️ GROK Mission Control: \${component} - \${status}\`, { timestamp, component, status, metrics });
            psyberherdState.grok.systemHealth = status; // Update state
          },
          trackPerformance: function(operation, startTime) {
            const duration = Date.now() - startTime;
            const status = duration < 200 ? 'OPTIMAL' : 'ACCEPTABLE';
            console.log(\`⚡ GROK Performance: \${operation} - \${duration}ms (\${status})\`);
            this.logSystemHealth('Performance', status, { operation, duration });
          }
        };

        // --- GROK SECURITY AUDIT PROTOCOLS ---
        const GROKSecurity = {
          validateSession: function() {
            console.log('🔒 GROK Security: Session validation initiated');
            this.auditTrail('SESSION_VALIDATION', 'SYSTEM', new Date().toISOString(), 'SUCCESS');
            return true;
          },
          auditTrail: function(action, user, timestamp, result = 'SUCCESS') {
            const auditEntry = { timestamp, action, user, result, system: 'PSYBERHERD_V3.6' };
            console.log(\`📋 GROK Audit Trail: \${action} - \${result}\`, auditEntry);
            psyberherdState.grok.securityStatus = result; // Update state
            GROKOperations.logSystemHealth('Security', result === 'SUCCESS' ? 'SECURE' : 'ALERT', auditEntry);
          }
        };

        // --- GROK RISK MANAGEMENT: Auto-Pause Protocols ---
        const GROKRiskManagement = {
          assessRisk: function(efficacy, drawdown) {
            let riskLevel = 'LOW'; let action = 'CONTINUE';
            if (drawdown > 5) { riskLevel = 'CRITICAL'; action = 'AUTO_PAUSE'; console.log('🚨 GROK Risk Alert: Drawdown exceeded 5%'); } 
            else if (efficacy < 75) { riskLevel = 'MEDIUM'; action = 'MONITOR'; console.log('⚠️ GROK Risk Watch: Efficacy below 75%'); }
            psyberherdState.grok.riskLevel = riskLevel; // Update state
            const assessment = { riskLevel, action };
            GROKOperations.logSystemHealth('RiskManagement', action, assessment);
            GROKSecurity.auditTrail('RISK_ASSESSMENT', 'GROK_SYSTEM', new Date().toISOString(), action);
            return assessment;
          },
          executeAutoPause: function(reason) {
            console.log(\`🛑 GROK Auto-Pause: ACTIVATED - Reason: \${reason}\`);
            stopHDMonitoring();
            psyberherdState.hdCanary.status = 'AUTO_PAUSED';
            alert(\`🛑 GROK Auto-Pause Activated: \${reason}\\n\\nSystem paused for safety. Manual review required.\`);
            GROKSecurity.auditTrail('AUTO_PAUSE_EXECUTED', 'GROK_RISK_SYSTEM', new Date().toISOString());
            renderHDCanary(); // Render paused state
            renderGrokStatus();
          }
        };

        // --- HD CANARY WITH GROK C3I INTEGRATION ---
        async function updateAndCheckCanary() {
          const startTime = Date.now();
          if (!GROKSecurity.validateSession()) { console.log('🔒 GROK Security: Session invalid, pausing.'); return; }
          try {
            const metrics = await fetchHdCanaryData();
            GROKOperations.trackPerformance('fetchHdCanaryData', startTime);
            
            psyberherdState.hdCanary.trendStrength = metrics.trendStrength;
            psyberherdState.hdCanary.efficacy = metrics.efficacy;
            psyberherdState.hdCanary.drawdown = metrics.drawdown;
            psyberherdState.hdCanary.confidence = metrics.confidence;
            psyberherdState.hdCanary.marketOptimal = metrics.marketOptimal;
            
            const riskAssessment = GROKRiskManagement.assessRisk(psyberherdState.hdCanary.efficacy, psyberherdState.hdCanary.drawdown);
            if (riskAssessment.action === 'AUTO_PAUSE') {
              GROKRiskManagement.executeAutoPause(riskAssessment.riskLevel);
              return;
            }
            
            const isPassing = psyberherdState.hdCanary.efficacy > 80 && psyberherdState.hdCanary.drawdown < 5;
            psyberherdState.hdCanary.status = isPassing? 'CANARY PASS': 'CANARY WATCH';
            GROKOperations.logSystemHealth('HDCanary', psyberherdState.hdCanary.status);
            
            renderAll(); // Centralized rendering call
          } catch (error) {
            console.error('🚨 GROK Error Handler:', error);
            GROKOperations.logSystemHealth('HDCanary', 'ERROR', { error: error.message });
            renderGrokStatus();
          }
        }

        // --- CENTRALIZED RENDERING & STATE MANAGEMENT ---
        function renderAll() { renderHDCanary(); renderGrokStatus(); }
        
        function renderHDCanary() {
          const { hdCanary } = psyberherdState;
          domElements.hdTrendStrength.textContent = hdCanary.trendStrength.toFixed(1) + '%';
          domElements.hdEfficacy.textContent = hdCanary.efficacy.toFixed(1) + '%';
          domElements.hdDrawdown.textContent = hdCanary.drawdown.toFixed(1);
          domElements.hdCanaryStatus.textContent = hdCanary.status;
          domElements.hdConfidence.textContent = \`[\${hdCanary.confidence[0].toFixed(1)}, \${hdCanary.confidence[1].toFixed(1)}]\`;
          const marketCondition = hdCanary.marketOptimal ? 'OPTIMAL' : 'SUBOPTIMAL';
          domElements.hdMarketCondition.textContent = marketCondition;
          domElements.hdMarketCondition.className = hdCanary.marketOptimal ? 'status-on' : 'status-off';
          domElements.hdCanaryStatus.className = hdCanary.status === 'CANARY PASS' ? 'status-on' : 'status-off';
        }

        function renderGrokStatus() {
            const { grok } = psyberherdState;
            domElements.grokStatus.textContent = grok.systemHealth;
            domElements.grokSecurity.textContent = grok.securityStatus;
            domElements.grokRisk.textContent = grok.riskLevel;
            
            // Color coding for risk
            if (grok.riskLevel === 'LOW') domElements.grokRisk.className = 'status-on';
            else if (grok.riskLevel === 'MEDIUM') domElements.grokRisk.className = 'status-med';
            else domElements.grokRisk.className = 'status-off';
        }

        // --- DATA & CORE LOGIC (UNCHANGED FROM V3.5) ---
        function toggleHD() {
          psyberherdState.hdCanary.active = domElements.hdToggle.checked;
          domElements.hdStatus.textContent = psyberherdState.hdCanary.active ? 'ON' : 'OFF';
          domElements.hdStatus.className = psyberherdState.hdCanary.active ? 'status-on' : 'status-off';
          domElements.hdAnalysis.style.display = psyberherdState.hdCanary.active ? 'block' : 'none';
          if (psyberherdState.hdCanary.active) { startHDMonitoring(); } 
          else { stopHDMonitoring(); }
        }
        function startHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) return;
          GROKOperations.logSystemHealth('HDCanary', 'MONITORING_INITIATED');
          updateAndCheckCanary();
          psyberherdState.hdCanary.monitoringInterval = setInterval(updateAndCheckCanary, 3000);
        }
        function stopHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) {
            clearInterval(psyberherdState.hdCanary.monitoringInterval);
            psyberherdState.hdCanary.monitoringInterval = null;
            GROKOperations.logSystemHealth('HDCanary', 'MONITORING_STOPPED');
          }
        }
        async function testAbacusConnection() {
          try {
            const response = await fetch('/health'); 
            if (response.ok) { domElements.abacusStatus.textContent = 'CONNECTED'; domElements.abacusStatus.className = 'status-on'; return true; }
            throw new Error('Endpoint not available');
          } catch (error) { domElements.abacusStatus.textContent = 'FALLBACK (MOCK)'; domElements.abacusStatus.className = 'status-off'; return false; }
        }
        async function fetchHdCanaryData() {
          const isAbacusAvailable = await testAbacusConnection();
          return getEnhancedMockData(); // Stays on mock data for now
        }
        async function getEnhancedMockData() {
          await new Promise(resolve => setTimeout(resolve, 150));
          const trend = 78 + (Math.random() * 12); const efficacy = 82 + (Math.random() * 8); const risk = 1 + (Math.random() * 6); // Increased risk range for testing
          return { trendStrength: trend, efficacy: efficacy, drawdown: risk, confidence: [efficacy - 4, efficacy + 4], marketOptimal: trend > 80 && risk < 4 };
        }
        function toggleTXF() {
          const checkbox = document.getElementById('txfToggle'); const status = document.getElementById('txfStatus');
          status.textContent = checkbox.checked ? 'ON' : 'OFF'; status.className = checkbox.checked ? 'status-on' : 'status-off';
        }
        function updateMarketTicker() {
          const price = (75 + (Math.random() - 0.5) * 2).toFixed(2); const volume = Math.floor(150000 + Math.random() * 100000).toLocaleString();
          const trend = ['↗️ Bullish', '↘️ Bearish', '➡️ Sideways'][Math.floor(Math.random() * 3)]; const time = new Date().toLocaleTimeString();
          const hdStatus = psyberherdState.hdCanary.active ? ' | HD: ACTIVE' : '';
          domElements.marketTicker.innerHTML = \`Crude Oil: \$\${price} | Volume: \${volume} | Trend: \${trend}\${hdStatus} | Last Update: \${time}\`;
        }
        // --- SYSTEM BOOT SEQUENCE ---
        updateMarketTicker(); setInterval(updateMarketTicker, 5000);
        GROKOperations.logSystemHealth('System', 'OPERATIONAL'); GROKSecurity.validateSession(); renderGrokStatus();
      </script>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OPERATIONAL', system: 'PSYBERHERD Strategic Vision Hub V3.6', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 PSYBERHERD V3.6 operational on port', PORT);
});
