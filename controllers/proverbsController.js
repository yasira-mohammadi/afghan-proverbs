const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/proverbs.json');

function readData() {
  return JSON.parse(fs.readFileSync(filePath));
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.getAll = (req, res) => {
  const proverbs = readData();
  const { category } = req.query;
  if (category) {
    const filtered = proverbs.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(proverbs);
};

exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const proverbs = readData();
  const found = proverbs.find(p => p.id === id);
  if (found) res.json(found);
  else res.status(404).json({ message: 'Not found' });
};

exports.create = (req, res) => {
  const proverbs = readData();
  const newProverb = { id: Date.now(), ...req.body };
  proverbs.push(newProverb);
  writeData(proverbs);
  res.status(201).json(newProverb);
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  let proverbs = readData();
  const index = proverbs.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  proverbs[index] = { ...proverbs[index], ...req.body };
  writeData(proverbs);
  res.json(proverbs[index]);
};

exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  let proverbs = readData();
  proverbs = proverbs.filter(p => p.id !== id);
  writeData(proverbs);
  res.json({ message: 'Deleted' });
};

exports.random = (req, res) => {
  const proverbs = readData();
  const random = proverbs[Math.floor(Math.random() * proverbs.length)];
  res.json(random);
};