import mergeImages from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import path from 'path';
import fs from 'fs';
import { MersenneTwister19937, bool, real } from 'random-js';
import { content } from '../layers/content';

const layersPath = path.join(process.cwd(), 'layers');
const outputPath = path.join(process.cwd(), 'output');

function Base64ImageSave(base64Image: string, filepath: string) {
  const base64 = base64Image.split(',')[1];
  const imageBuffer = Buffer.from(base64, 'base64');
  fs.writeFileSync(filepath, imageBuffer);
}

async function LayersMerge(layers: string[], output: string) {
  const image = await mergeImages(layers, { Canvas: Canvas, Image: Image });
  Base64ImageSave(image, output);
}

async function random(layersPath: string, layers: any[]) {
  const randomizer = MersenneTwister19937.autoSeed();
  const images = [];
  const selectedChar: Record<string, any> = {};
  for (const layer of layers) {
    if (bool(layer.probability)(randomizer)) {
      const selected = WhichToPick(randomizer, layer.options);
      selectedChar[layer.name] = selected.name;
      images.push(path.join(layersPath, selected.file));
    }
  }
  return {
    images,
    selectedChar,
  };
}

function WhichToPick(randomizer: MersenneTwister19937, options: any[]) {
  const ArraySum = options.reduce((acc: any, option: { weight: any }) => {
    return acc + (option.weight ?? 1.0);
  }, 0);
  const r = real(0.0, ArraySum, false)(randomizer);
  let summedWeight = 0.0;
  for (const option of options) {
    summedWeight += option.weight ?? 1.0;
    if (r <= summedWeight) {
      return option;
    }
  }
}

async function generateNFTs(
  num: number,
  layersPath: string,
  outputPath: string,
) {
  const generated = new Set();

  for (let tokenId = 0; tokenId < num; tokenId++) {
    console.log('id of the NFT :' + tokenId);
    const selected = await random(layersPath, content.layers);
    const traits = JSON.stringify(selected.selectedChar);
    console.log(traits);

    if (generated.has(traits)) {
      console.log('Double removed!');
      tokenId--;
      continue;
    } else {
      generated.add(traits);
    }

    await LayersMerge(selected.images, path.join(outputPath, `${tokenId}.png`));
  }
}

generateNFTs(100, layersPath, outputPath);
