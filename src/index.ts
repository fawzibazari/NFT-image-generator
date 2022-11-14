import mergeImages from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import path from 'path';
import fs from 'fs';

const layersPath = path.join(process.cwd(), 'layers');
console.log(layersPath);

const layers = [
  path.join(layersPath, 'background', '1.png'),
  path.join(layersPath, 'beard_and_mustache', '3.png'),
  path.join(layersPath, 'body', '3.png'),
  path.join(layersPath, 'eyes', '2.png'),
  path.join(layersPath, 'Glasses', '1_r.png'),
  path.join(layersPath, 'Mouths', '1.png'),
  path.join(layersPath, 'Outfits', '3.png'),
];
async function MergeLayers(layers: any, output: any) {
  const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
  const base64 = image.split(',')[1];
  const imageBuffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(output, imageBuffer);
}

MergeLayers(layers, path.join(process.cwd(), 'output', '1.png'));
