import * as path from 'path';
import * as dirTree from 'directory-tree';
import * as fs from 'fs';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

export default class DirIndexer {
	private inputDirectory: string = '../public/media/';

	public async run() {
		const tree = dirTree(this.inputDirectory, {
			extensions: /\.(jpg|jpeg|png|webm|webp|mp4|ogg)$/,
			normalizePath: true,
			exclude: /_thumbs/g
		});
		let json = JSON.stringify(tree);
		json = json.replace(/..\/public\/media\//g, '');
		await writeFile(path.join('../src/assets/', 'db.json'), json);
	}
}

const dirIndexer = new DirIndexer();
dirIndexer.run();
