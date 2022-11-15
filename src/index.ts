import mergeImages from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import path from 'path';
import fs from 'fs';
import { MersenneTwister19937, bool, real } from 'random-js';

const layersPath = path.join(process.cwd(), 'layers');
console.log(layersPath);

const layers = [
  path.join(layersPath, 'Background', '2.png'),
  path.join(layersPath, 'body', '1.png'),
  path.join(layersPath, 'eyes', '2.png'),
  path.join(layersPath, 'Glasses', '3_r.png'),
  path.join(layersPath, 'Mouths', '2.png'),
  path.join(layersPath, 'Outfits', '4.png'),
];

function Base64ImageSave(base64Image: string, filepath: string) {
  const base64 = base64Image.split(',')[1];
  const imageBuffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(filepath, imageBuffer);
}

async function LayersMerge(layers: string[], output: string) {
  console.log(layers);

  const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
  Base64ImageSave(image, output);
}

// LayersMerge(layers, path.join(process.cwd(), 'output', '2.png'));

function random(layersPath: string, layers: any[]) {
  // MersenneTwister19937 is the largest randomizer
  const randomizer = MersenneTwister19937.autoSeed();
  console.log(randomizer);
  for (const layer of layers) {
    if (bool(layer.probability)(randomizer)) {
    }
  }
}
