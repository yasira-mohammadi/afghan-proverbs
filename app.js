const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const proverbsRoutes = require('./routes/proverbs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use('/proverbs', proverbsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
