import {deleteAsync} from 'del';
import cpy from 'cpy';
import { globby } from 'globby';
import { build } from 'esbuild';

// delete dest
const clean = () => deleteAsync('dest/*');

// copy assets
const copy = () => cpy(['assets', 'index.html'], 'dest');

const bundle = async () => {
  // get files for bundling
  const entries = await globby('src/**/*.ts');
  // bundle
  return build({
    entryPoints: entries,
    bundle: true,
    format: 'esm',
    splitting: true,
    outdir: 'dest/wc'
  });
};

// some lite parallel
const copyAndBundle = () => Promise.all([copy(), bundle()]);

// go
clean().then(copyAndBundle);
