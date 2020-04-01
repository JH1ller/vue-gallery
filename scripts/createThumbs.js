const imageThumbnail = require('image-thumbnail');
const fs = require('fs');
const path = require('path');
const util = require('util');

const exists = util.promisify(fs.exists);
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);


class ThumbnailGenerator {

    constructor() {
        this.dir = '../public/media/';
        this.ext = ['.jpg', '.png', '.jpeg'];
        this.quality = '100';
    }

    async run() {
        this.getFiles(this.dir, this.extensions).forEach((file) => {
            this.createThumb(file);
        });
    }

    async createThumb(file) {
        const fileDir = path.parse(file).dir;
        const fileName = path.parse(file).name;
        const inputPath = path.join(this.inputDirectory, file);
        console.log(inputPath);
        const outputPath = path.join(this.inputDirectory, fileDir, 'thumbs', fileName);
        if (!(await exists(outputPath + '.webp'))) {
            const thumb = await imageThumbnail(inputPath);
            console.log(thumb);
        }
    }


    async getFiles(currentDir, extensions) {
        const result = [];
        const files = [currentDir];
        try {
            do {
                const filepath = files.pop();
                const stat = await lstat(filepath);
                if (stat.isDirectory()) {
                    (await readdir(filepath))
                        .forEach((f) => files.push(path.join(filepath, f)));
                } else if (stat.isFile() && extensions.includes(path.extname(filepath))) {
                    result.push(path.relative(currentDir, filepath));
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

exports.generator = new ThumbnailGenerator();


