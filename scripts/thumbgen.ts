import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as dirTree from 'directory-tree';
import { Image, Folder, ItemType } from '../src/interfaces/index';

const {
	ScaleThumb,
	generateThumb,
	Resize,
	cropthumbCoor,
	generateThumbwithsize
} = require('@zujo/thumbnail-generator');

const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

export default class ThumbGen {
	private inputDirectory: string = '../public/media/';
	private extensions: string[] = [ '.jpg', '.png', '.jpeg' ];
	private quality: string = '100';

	public async run() {
		const tree = dirTree(this.inputDirectory, {
			extensions: /\.(jpg|jpeg|png)$/,
			normalizePath: true,
			exclude: /_thumbs/g
		});
		this.createThumb(tree as Folder);
	}

	private async createThumb(dir: Folder) {
		dir.children.forEach((item) => {
			if (item.type === ItemType.FILE) {
				try {
					const inputPath = item.path;
					const parsedFile = path.parse(inputPath);
					const outputDir = path.join(parsedFile.dir, '_thumbs');
					if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
					const outputPath = path.join(outputDir, parsedFile.name);
					if (!fs.existsSync(outputPath + parsedFile.ext)) {
						generateThumbwithsize(inputPath, outputPath, 480, parsedFile.ext);
						console.log('generated: ', outputPath + parsedFile.ext);
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				this.createThumb(item as Folder);
			}
		});
	}
}

const generator = new ThumbGen();
generator.run();
