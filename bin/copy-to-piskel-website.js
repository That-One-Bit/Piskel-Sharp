const fs = require('node:fs/promises');
const path = require('node:path');
const pjson = require('../package.json');

// 1. Define your folder paths clearly
const PISKEL_PATH = path.resolve(__dirname, '..');
// Update this path to point exactly to your Multi Bit Catalogue repository root folder
const MULTI_BIT_PATH = path.resolve(__dirname, '../../Multi-Bit-Catalogue'); 

async function publishToMultiBit() {
  try {
    console.log(`Starting deployment for Piskel Sharp v${pjson.version}...`);

    // 2. Define source and destination paths
    const srcProd = path.resolve(PISKEL_PATH, 'dest/prod');
    const destWebBuild = path.resolve(MULTI_BIT_PATH, 'tools/piskelSharp');

    // 3. Clear out the old build directory first to ensure a clean slate
    console.log('Cleaning up previous build files...');
    await fs.rm(destWebBuild, { recursive: true, force: true });
    console.log('Done');

    // 4. Copy the freshly compiled production assets into tools/piskel-sharp/
    console.log('Copying prod assets to tools/piskelSharp/...');
    await fs.cp(srcProd, destWebBuild, { recursive: true });
    console.log('Done');

    // 5. Optional: Maintain a version file inside the folder for reference
    const versionFilePath = path.resolve(destWebBuild, 'VERSION');
    await fs.writeFile(versionFilePath, pjson.version);
    console.log(`Version file created tracking version: ${pjson.version}`);

    console.log('Finished. Push latest commit via GitHub Desktop');

  } catch (error) {
    console.error('Prod Action failed with error:', error);
  }
}

// Execute the deployment script
publishToMultiBit();