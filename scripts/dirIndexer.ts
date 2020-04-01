import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
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

export default class DirIndexer {
	private inputDirectory: string = '../public/media/';
	private extensions: string[] = [ '.jpg', '.png', '.jpeg' ];
	private quality: string = '100';
	private processedFiles: any[] = [];

	public async run() {
		this.processedFiles = [];
		console.log(this.inputDirectory);

		(await this.getFiles(this.inputDirectory, this.extensions)).forEach(async (file: string) => {
			this.convert(file);
		});
	}

	private async convert(file: string) {
		const fileDir = path.parse(file).dir;
		const fileName = path.parse(file).name + '_thumb';
		const inputPath = path.join(this.inputDirectory, file);
		console.log(inputPath);
		const outputPath = path.join(this.inputDirectory, fileDir, fileName);
		if (!await exists(outputPath + '.jpg')) {
			try {
				generateThumbwithsize(inputPath, outputPath, 480, '.jpg');
			} catch (error) {
				console.log(error);
			}
		}
	}

	private async getFiles(currentDir: string, extensions: string[]) {
		const result = [];
		const files: string[] = [ currentDir ];
		try {
			do {
				const filepath = files.pop();
				const stat = await lstat(filepath as fs.PathLike);
				if (stat.isDirectory()) {
					(await readdir(filepath as fs.PathLike)).forEach((f: any) =>
						files.push(path.join(filepath as string, f))
					);
				} else if (stat.isFile() && extensions.includes(path.extname(filepath as string))) {
					result.push(path.relative(currentDir, filepath as string));
				}
			} while (files.length !== 0);
		} catch (error) {
			console.log(error);
			this.processedFiles = [];
			this.processedFiles.push(error);
		}

		return result;
	}
}

const generator = new DirIndexer();
generator.run();
