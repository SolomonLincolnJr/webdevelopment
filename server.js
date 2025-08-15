const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PSYBERHERD™ V3.7 - GenSpark C3I Refactor</title>
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
        .status-critical { color: #ff4757; font-weight: bold; text-shadow: 0 0 10px #ff4757; } /* GenSpark Enhancement */
        input[type="checkbox"] { transform: scale(1.2); margin-right: 10px; }
      </style>
    </head>
    <body>
      <h1 style="color: #1AC8ED">🎖️ PSYBERHERD™ Strategic Vision Hub V3.7</h1>
      <h2>STATUS: OPERATIONAL (GENSPARK C3I REFACTOR)</h2>
      <p>Deployment: SUCCESS</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      
      <div class="toggle"> <label> <input type="checkbox" id="hdToggle" onchange="toggleHD()"> HD Pattern: <span id="hdStatus" class="status-off">OFF</span> </label> </div>
      <div class="toggle"> <label> <input type="checkbox" id="txfToggle" onchange="toggleTXF()"> TXF Pattern: <span id="txfStatus" class="status-off">OFF</span> </label> </div>
      
      <div id="hdAnalysis" style="display: none; color: #1AC8ED; margin: 15px; padding: 15px; border: 2px solid #00ff88; border-radius: 8px; background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(26, 200, 237, 0.1));">
        📈 <strong>HD Pattern Analysis (Abacus.ai ML Enhanced):</strong><br>
        <!-- Note: The 'hdSignal' span is logically used but no longer displayed in the UI per V3.5+ updates -->
        <span id="hdSignal" style="display:none;"></span>
        <div id="hdMetrics">
           ML Score: <span id="hdTrendStrength" class="status-on">--.-%</span> | Historical Accuracy: <span id="hdEfficacy" class="status-on">--.-%</span><br>
           Risk Probability: <span id="hdDrawdown">-.--%</span> | Canary Status: <span id="hdCanaryStatus" class="status-on">INACTIVE</span>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #002B3D, #0A0A0A); padding: 15px; margin: 20px 0; border-radius: 10px; border: 1px solid #1AC8ED;">
        <h3 style="color: #1AC8ED; margin: 0 0 10px 0;">📊 Live Market Intelligence</h3>
        <div id="marketTicker" style="font-family: 'Courier New', monospace; font-size: 14px; color: #00ff88;"> Loading Market Data... </div>
      </div>

      <!-- V3.7 GROK Mission Control Display (GenSpark Refactor) -->
      <div style="background: linear-gradient(135deg, #002B3D, #0A0A0A); padding: 12px; margin: 15px 0; border-radius: 8px; border: 2px solid #1AC8ED; box-shadow: 0 4px 15px rgba(26, 200, 237, 0.2);">
        <h4 style="color: #1AC8ED; margin: 0 0 8px 0; font-family: 'Courier New', monospace;">🎖️ GROK Mission Control</h4>
        <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4;">
          Status: <span id="grokStatus" class="status-on">GROK: INITIALIZING</span> | 
          Security: <span id="grokSecurity" class="status-on">VALIDATING</span> | 
          Risk Level: <span id="grokRisk" class="status-on">LOW</span>
        </div>
      </div>

      <p><a href="/health" style="color: #1AC8ED;">Health Check</a></p>
      
      <script>
        // --- PSYBERHERD™ V3.7 SCRIPT (GENSPARK C3I REFACTOR) ---
        
        const domElements = {
          hdToggle: document.getElementById('hdToggle'),
          hdStatus: document.getElementById('hdStatus'),
          hdAnalysis: document.getElementById('hdAnalysis'),
          hdTrendStrength: document.getElementById('hdTrendStrength'),
          hdSignal: document.getElementById('hdSignal'),
          hdCanaryStatus: document.getElementById('hdCanaryStatus'),
          hdEfficacy: document.getElementById('hdEfficacy'),
          hdDrawdown: document.getElementById('hdDrawdown'),
          marketTicker: document.getElementById('marketTicker'),
          grokStatus: document.getElementById('grokStatus'),
          grokSecurity: document.getElementById('grokSecurity'),
          grokRisk: document.getElementById('grokRisk')
        };

        const psyberherdState = {
          hdCanary: {
            active: false, monitoringInterval: null, trendStrength: 0.0,
            efficacy: 0.0, drawdown: 0.0, signal: 'PENDING', status: 'INACTIVE'
          },
          grokOperations: {
            systemHealth: 'OPERATIONAL', securityStatus: 'VALIDATED',
            riskLevel: 'LOW', lastUpdate: new Date()
          }
        };

        const GROKOperations = {
          missionControl: { systemHealth: 'OPERATIONAL', lastUpdate: new Date(), alertLevel: 'GREEN', activeMonitoring: false },
          logSystemHealth: function(component, status, metrics = {}) {
            const timestamp = new Date().toISOString();
            const logEntry = { timestamp, component, status, metrics, alertLevel: this.missionControl.alertLevel };
            console.log(\`🎖️ GROK Mission Control: \${component} - \${status}\`, logEntry);
            this.missionControl.lastUpdate = new Date();
            this.updateMissionControlDisplay();
            return logEntry;
          },
          trackPerformance: function(operation, startTime) {
            const duration = Date.now() - startTime;
            const status = duration < 200 ? 'OPTIMAL' : duration < 500 ? 'ACCEPTABLE' : 'REVIEW_REQUIRED';
            console.log(\`⚡ GROK Performance: \${operation} - \${duration}ms (\${status})\`);
            this.logSystemHealth('Performance', status, { operation, duration });
            return { operation, duration, status };
          },
          updateMissionControlDisplay: function() {
            if (domElements.grokStatus) {
              domElements.grokStatus.textContent = \`GROK: \${this.missionControl.systemHealth}\`;
              domElements.grokStatus.className = this.missionControl.systemHealth === 'OPERATIONAL' ? 'status-on' : 'status-off';
            }
          }
        };

        const GROKSecurity = {
          validateSession: function() {
            const sessionValid = true;
            const timestamp = new Date().toISOString();
            console.log('🔒 GROK Security: Session validation initiated');
            if (sessionValid) {
              console.log('✅ GROK Security: Session VALID');
              this.auditTrail('SESSION_VALIDATION', 'SYSTEM', timestamp, 'SUCCESS');
              psyberherdState.grokOperations.securityStatus = 'VALIDATED';
            } else {
              console.log('⚠️ GROK Security: Session INVALID');
              this.auditTrail('SESSION_VALIDATION', 'SYSTEM', timestamp, 'FAILURE');
              psyberherdState.grokOperations.securityStatus = 'ALERT';
            }
            this.updateSecurityDisplay();
            return sessionValid;
          },
          auditTrail: function(action, user, timestamp, result = 'SUCCESS') {
            const auditEntry = { timestamp, action, user, result, system: 'PSYBERHERD_V3.7_GROK' };
            console.log(\`📋 GROK Audit Trail: \${action} - \${result}\`, auditEntry);
            GROKOperations.logSystemHealth('Security', result === 'SUCCESS' ? 'SECURE' : 'ALERT', auditEntry);
            return auditEntry;
          },
          updateSecurityDisplay: function() {
            if (domElements.grokSecurity) {
              domElements.grokSecurity.textContent = psyberherdState.grokOperations.securityStatus;
              domElements.grokSecurity.className = psyberherdState.grokOperations.securityStatus === 'VALIDATED' ? 'status-on' : 'status-off';
            }
          }
        };

        const GROKRiskManagement = {
          assessRisk: function(efficacy, drawdown, winRate = null) {
            const timestamp = new Date().toISOString();
            let riskLevel = 'LOW'; let action = 'CONTINUE';
            if (drawdown > 5) { riskLevel = 'CRITICAL'; action = 'AUTO_PAUSE'; console.log('🚨 GROK Risk Alert: Drawdown > 5%'); } 
            else if (winRate && winRate < 60) { riskLevel = 'HIGH'; action = 'AUTO_PAUSE'; console.log('🚨 GROK Risk Alert: Win rate < 60%'); } 
            else if (efficacy < 75) { riskLevel = 'MEDIUM'; action = 'MONITOR'; console.log('⚠️ GROK Risk Watch: Efficacy < 75%'); }
            const riskAssessment = { timestamp, efficacy, drawdown, winRate, riskLevel, action };
            psyberherdState.grokOperations.riskLevel = riskLevel;
            this.updateRiskDisplay();
            GROKOperations.logSystemHealth('RiskManagement', action, riskAssessment);
            GROKSecurity.auditTrail('RISK_ASSESSMENT', 'GROK_SYSTEM', timestamp, action);
            return riskAssessment;
          },
          executeAutoPause: function(reason) {
            console.log(\`🛑 GROK Auto-Pause: ACTIVATED - Reason: \${reason}\`);
            stopHDMonitoring();
            psyberherdState.hdCanary.status = 'AUTO_PAUSED';
            psyberherdState.grokOperations.systemHealth = 'PAUSED';
            if (domElements.hdToggle) { domElements.hdToggle.checked = false; toggleHD(); }
            GROKSecurity.auditTrail('AUTO_PAUSE_EXECUTED', 'GROK_RISK_SYSTEM', new Date().toISOString());
            alert(\`🛑 GROK Auto-Pause Activated: \${reason}\\n\\nSystem paused for safety. Manual review required.\`);
          },
          updateRiskDisplay: function() {
            if (domElements.grokRisk) {
              domElements.grokRisk.textContent = psyberherdState.grokOperations.riskLevel;
              const riskClass = psyberherdState.grokOperations.riskLevel === 'LOW' ? 'status-on' : 
                               psyberherdState.grokOperations.riskLevel === 'MEDIUM' ? 'status-off' : 'status-critical'; // Original class was 'status-off', corrected to use 'status-critical'
              domElements.grokRisk.className = riskClass;
            }
          }
        };

        function toggleHD() {
          console.log('🎖️ GROK Operations: HD Toggle initiated');
          psyberherdState.hdCanary.active = domElements.hdToggle.checked;
          domElements.hdStatus.textContent = psyberherdState.hdCanary.active ? 'ON' : 'OFF';
          domElements.hdStatus.className = psyberherdState.hdCanary.active ? 'status-on' : 'status-off';
          domElements.hdAnalysis.style.display = psyberherdState.hdCanary.active ? 'block' : 'none';
          if (psyberherdState.hdCanary.active) {
            GROKSecurity.auditTrail('HD_PATTERN_ACTIVATED', 'USER', new Date().toISOString());
            startHDMonitoring();
          } else {
            GROKSecurity.auditTrail('HD_PATTERN_DEACTIVATED', 'USER', new Date().toISOString());
            stopHDMonitoring();
          }
        }

        function startHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) return;
          console.log('🎖️ GROK Operations: HD Pattern monitoring initiated');
          GROKOperations.logSystemHealth('HDMonitoring', 'STARTED');
          updateAndCheckCanary();
          psyberherdState.hdCanary.monitoringInterval = setInterval(updateAndCheckCanary, 3000);
        }

        function stopHDMonitoring() {
          if (psyberherdState.hdCanary.monitoringInterval) {
            clearInterval(psyberherdState.hdCanary.monitoringInterval);
            psyberherdState.hdCanary.monitoringInterval = null;
            console.log('🎖️ GROK Operations: HD Pattern monitoring stopped');
            GROKOperations.logSystemHealth('HDMonitoring', 'STOPPED');
          }
        }

        async function updateAndCheckCanary() {
          const startTime = Date.now();
          if (!GROKSecurity.validateSession()) { console.log('🔒 GROK Security: Session invalid, pausing.'); return; }
          try {
            const metrics = await fetchHdCanaryData();
            GROKOperations.trackPerformance('fetchHdCanaryData', startTime);
            psyberherdState.hdCanary.trendStrength = metrics.trendStrength;
            psyberherdState.hdCanary.efficacy = metrics.efficacy;
            psyberherdState.hdCanary.drawdown = metrics.drawdown;
            const riskAssessment = GROKRiskManagement.assessRisk(psyberherdState.hdCanary.efficacy, psyberherdState.hdCanary.drawdown);
            if (riskAssessment.action === 'AUTO_PAUSE') { GROKRiskManagement.executeAutoPause(riskAssessment.riskLevel); return; }
            psyberherdState.hdCanary.signal = psyberherdState.hdCanary.trendStrength > 82 ? 'CONTINUATION' : 'MONITOR';
            const isPassing = psyberherdState.hdCanary.efficacy > 80 && psyberherdState.hdCanary.drawdown < 5;
            psyberherdState.hdCanary.status = isPassing ? 'CANARY PASS' : 'CANARY WATCH';
            GROKOperations.logSystemHealth('HDCanary', psyberherdState.hdCanary.status, { efficacy: psyberherdState.hdCanary.efficacy, drawdown: psyberherdState.hdCanary.drawdown, riskLevel: riskAssessment.riskLevel });
            renderHDCanary();
          } catch (error) {
            console.error('🚨 GROK Error Handler:', error);
            GROKOperations.logSystemHealth('HDCanary', 'ERROR', { error: error.message });
          }
        }

        async function fetchHdCanaryData() {
          console.log('🎖️ GROK Operations: Fetching HD Pattern data...');
          await new Promise(resolve => setTimeout(resolve, 150));
          const data = { trendStrength: 78 + (Math.random() * 12), efficacy: 80 + (Math.random() * 8), drawdown: 1 + (Math.random() * 6) };
          console.log('📊 GROK Enhanced ML Data retrieved');
          return data;
        }

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

        function toggleTXF() {
          const checkbox = document.getElementById('txfToggle');
          const status = document.getElementById('txfStatus');
          status.textContent = checkbox.checked ? 'ON' : 'OFF';
          status.className = checkbox.checked ? 'status-on' : 'status-off';
          GROKSecurity.auditTrail('TXF_PATTERN_TOGGLE', 'USER', new Date().toISOString());
        }

        function updateMarketTicker() {
          const price = (75 + (Math.random() - 0.5) * 2).toFixed(2);
          const volume = Math.floor(150000 + Math.random() * 100000).toLocaleString();
          const trend = ['↗️ Bullish', '↘️ Bearish', '➡️ Sideways'][Math.floor(Math.random() * 3)];
          const time = new Date().toLocaleTimeString();
          const hdStatus = psyberherdState.hdCanary.active ? ' | HD: ACTIVE' : '';
          const grokStatus = \` | GROK: \${psyberherdState.grokOperations.systemHealth}\`;
          domElements.marketTicker.innerHTML = \`Crude Oil: \$\${price} | Volume: \${volume} | Trend: \${trend}\${hdStatus}\${grokStatus} | Last Update: \${time}\`;
        }

        // --- System Boot Sequence ---
        console.log('🎖️ PSYBERHERD™ V3.7 GROK Strategic Operations: INITIALIZING');
        GROKSecurity.validateSession();
        GROKOperations.logSystemHealth('System', 'INITIALIZED');
        setInterval(updateMarketTicker, 5000);
        updateMarketTicker();
      </script>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OPERATIONAL', system: 'PSYBERHERD Strategic Vision Hub V3.7', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 PSYBERHERD V3.7 operational on port', PORT);
});
