import fs from 'node:fs';
import path from 'node:path';

const base = "E:\\NEW APP\\Apolo Website\\sites\\phase-2\\luatsutructuyen.net\\content\\drafts";
const scenariosPath = path.join(base, 'scenarios.json');
const stagingDir = path.join(base, 'staging');

const VALID_CATEGORIES = new Set([
  'tinh-huong-dan-su',
  'tinh-huong-ly-hon',
  'tinh-huong-dat-dai',
  'tinh-huong-doanh-nghiep',
  'co-nen-kien-khong',
]);

const report = { existingCount: 0, stagingFiles: [], valid: [], skipped: [], notes: [] };

// 1. Read existing
let existing = [];
try {
  const raw = fs.readFileSync(scenariosPath, 'utf8');
  existing = JSON.parse(raw);
  if (!Array.isArray(existing)) throw new Error('scenarios.json is not an array');
  report.existingCount = existing.length;
} catch (e) {
  report.notes.push('ERROR reading existing scenarios.json: ' + e.message);
  existing = Array.isArray(existing) ? existing : [];
}

// helper validation
function isValidScenario(o) {
  if (typeof o !== 'object' || o === null || Array.isArray(o)) return 'not an object';
  const topKeys = ['slug','status','publishedDate','category','urgencyLevel','outcomeType','readingTime','featured','vi'];
  for (const k of topKeys) {
    if (!(k in o)) return 'missing key: ' + k;
  }
  if (typeof o.slug !== 'string' || !o.slug) return 'invalid slug';
  if (!VALID_CATEGORIES.has(o.category)) return 'invalid category: ' + o.category;
  if (typeof o.vi !== 'object' || o.vi === null) return 'missing/invalid vi';
  for (const k of ['title','excerpt','body']) {
    if (!(k in o.vi) || typeof o.vi[k] !== 'string') return 'missing/invalid vi.' + k;
  }
  return null;
}

// 2. Read staging files
let stagingEntries = [];
try {
  stagingEntries = fs.readdirSync(stagingDir).filter(f => f.toLowerCase().endsWith('.json'));
} catch (e) {
  report.notes.push('ERROR reading staging dir: ' + e.message);
}
report.stagingFiles = stagingEntries;

const validStaged = [];
for (const f of stagingEntries) {
  const fp = path.join(stagingDir, f);
  let obj;
  try {
    obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
  } catch (e) {
    report.skipped.push(f + ' (JSON parse error: ' + e.message + ')');
    continue;
  }
  const err = isValidScenario(obj);
  if (err) {
    report.skipped.push(f + ' (' + err + ')');
    continue;
  }
  validStaged.push({ file: f, obj });
}

// 3. Merge dedup by slug, existing wins
const seen = new Set();
const merged = [];
for (const e of existing) {
  if (e && typeof e === 'object' && typeof e.slug === 'string') {
    seen.add(e.slug);
  }
  merged.push(e);
}
let newAdded = 0;
for (const { file, obj } of validStaged) {
  if (seen.has(obj.slug)) {
    report.notes.push('duplicate slug skipped (existing wins): ' + obj.slug + ' from ' + file);
    continue;
  }
  seen.add(obj.slug);
  merged.push(obj);
  newAdded++;
}

// 4. Write pretty JSON UTF-8 no BOM
const out = JSON.stringify(merged, null, 2) + '\n';
fs.writeFileSync(scenariosPath, out, { encoding: 'utf8' });

// 5. Reparse confirm
let validJson = false;
let finalLen = 0;
try {
  const reparsed = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
  validJson = Array.isArray(reparsed);
  finalLen = reparsed.length;
} catch (e) {
  report.notes.push('ERROR reparse: ' + e.message);
}

report.newAdded = newAdded;
report.totalScenarios = finalLen;
report.validJson = validJson;

console.log('RESULT_JSON_START');
console.log(JSON.stringify(report, null, 2));
console.log('RESULT_JSON_END');
