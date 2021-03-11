const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const fs = require('fs/promises');
const v = require('voca');

(async function main() {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-67HvtTX9kAPJVhw7B_M7Po2di1dyAwtrx0HnhpPf1mZzloQmt6KCFDnEG-RvICvseUuthlcIFwJ0/pub?gid=0&single=true&output=csv';
  const resp = await axios.get(sheetUrl);
  const records = parse(resp.data, {
    columns(columns) {
      return columns.map(v.camelCase);
    },
  });

  await fs.writeFile('data/menu.json', JSON.stringify(records[0]));
})()