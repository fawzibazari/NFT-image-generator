import mergeImages from 'merge-images';
import { Canvas, Image } from 'node-canvas';
import path from 'path';
import fs from 'fs';

const layersPath = path.join(process.cwd(), 'layers');
console.log(layersPath);
