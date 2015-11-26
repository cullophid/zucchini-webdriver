import Gherkin from 'gherkin'
import path from 'path'
import fs from 'fs';

const parser = new Gherkin.Parser();

const file = fs.readFileSync(path.join(__dirname, '../features/login.feature'))
const feature = parser.parse(file.toString());

console.log(feature);

console.log(JSON.stringify(feature, null, 2));
