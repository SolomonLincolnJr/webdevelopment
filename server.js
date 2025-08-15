const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1 style="color: #1AC8ED">🎖️ PSYBERHERD™ Strategic Vision Hub V3.1</h1>
    <h2>STATUS: OPERATIONAL</h2>
    <p>Deployment: SUCCESS</p>
    <p>Timestamp: ${new Date().toISOString()}</p>
    <p><a href="/health">Health Check</a></p>
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
