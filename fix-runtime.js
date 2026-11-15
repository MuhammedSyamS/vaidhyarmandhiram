import fs from 'node:fs';
import path from 'node:path';

const vcConfigPath = path.join(process.cwd(), '.vercel', 'output', 'functions', '_render.func', '.vc-config.json');

if (fs.existsSync(vcConfigPath)) {
  const content = fs.readFileSync(vcConfigPath, 'utf8');
  if (content.includes('nodejs18.x')) {
    const updated = content.replace(/"runtime":\s*"nodejs18\.x"/g, '"runtime": "nodejs20.x"');
    fs.writeFileSync(vcConfigPath, updated);
    console.log('[fix-runtime] Replaced discontinued nodejs18.x with nodejs20.x in .vc-config.json');
  } else {
    console.log('[fix-runtime] Verified .vc-config.json runtime is valid');
  }
}
