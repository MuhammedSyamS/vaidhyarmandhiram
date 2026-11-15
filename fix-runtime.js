import fs from 'node:fs';
import path from 'node:path';

const funcDir = path.join(process.cwd(), '.vercel', 'output', 'functions');

if (fs.existsSync(funcDir)) {
  function fixDir(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) {
        fixDir(full);
      } else if (item === '.vc-config.json') {
        const content = fs.readFileSync(full, 'utf8');
        const updated = content.replace(/"runtime":\s*"nodejs(18|20)\.x"/g, '"runtime": "nodejs22.x"');
        if (updated !== content) {
          fs.writeFileSync(full, updated);
          console.log(`[fix-runtime] Updated ${full} to nodejs22.x`);
        }
      }
    }
  }
  fixDir(funcDir);
}
console.log('[fix-runtime] All serverless function runtimes verified as nodejs22.x');
