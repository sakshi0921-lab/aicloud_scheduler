const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('http://localhost:5000/api/dashboard', (req, res) => {
  res.json({
    memory: 65,
    cpu: { gsu1: 54, gsu2: 87, gsu3: 78 },
    network: 57,
    costOverview: 53,
    scalingMethods: 64,
    costSuggestion: 53,
    cpuVsNetwork: 80,
    reports: { report1: 54, report2: 65, report3: 45 }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
