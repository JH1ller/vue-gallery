"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var util = require("util");
var path = require("path");
var dirTree = require("directory-tree");
var index_1 = require("../src/interfaces/index");
var _a = require('@zujo/thumbnail-generator'), ScaleThumb = _a.ScaleThumb, generateThumb = _a.generateThumb, Resize = _a.Resize, cropthumbCoor = _a.cropthumbCoor, generateThumbwithsize = _a.generateThumbwithsize;
var exists = util.promisify(fs.exists);
var readdir = util.promisify(fs.readdir);
var lstat = util.promisify(fs.lstat);
var mkdir = util.promisify(fs.mkdir);
var writeFile = util.promisify(fs.writeFile);
var ThumbGen = /** @class */ (function () {
    function ThumbGen() {
        this.inputDirectory = '../public/media/';
        this.extensions = ['.jpg', '.png', '.jpeg'];
        this.quality = '100';
    }
    ThumbGen.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tree;
            return __generator(this, function (_a) {
                tree = dirTree(this.inputDirectory, {
                    extensions: /\.(jpg|jpeg|png)$/,
                    normalizePath: true,
                    exclude: /_thumbs/g
                });
                this.createThumb(tree);
                return [2 /*return*/];
            });
        });
    };
    ThumbGen.prototype.createThumb = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                dir.children.forEach(function (item) {
                    if (item.type === index_1.ItemType.FILE) {
                        try {
                            var inputPath = item.path;
                            var parsedFile = path.parse(inputPath);
                            var outputDir = path.join(parsedFile.dir, '_thumbs');
                            if (!fs.existsSync(outputDir))
                                fs.mkdirSync(outputDir);
                            var outputPath = path.join(outputDir, parsedFile.name);
                            if (!fs.existsSync(outputPath + parsedFile.ext)) {
                                generateThumbwithsize(inputPath, outputPath, 480, parsedFile.ext);
                                console.log('generated: ', outputPath + parsedFile.ext);
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    else {
                        _this.createThumb(item);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return ThumbGen;
}());
exports["default"] = ThumbGen;
var generator = new ThumbGen();
generator.run();
