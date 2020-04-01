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
var _a = require('@zujo/thumbnail-generator'), ScaleThumb = _a.ScaleThumb, generateThumb = _a.generateThumb, Resize = _a.Resize, cropthumbCoor = _a.cropthumbCoor, generateThumbwithsize = _a.generateThumbwithsize;
var exists = util.promisify(fs.exists);
var readdir = util.promisify(fs.readdir);
var lstat = util.promisify(fs.lstat);
var DirIndexer = /** @class */ (function () {
    function DirIndexer() {
        this.inputDirectory = '../public/media/';
        this.extensions = ['.jpg', '.png', '.jpeg'];
        this.quality = '100';
        this.processedFiles = [];
    }
    DirIndexer.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.processedFiles = [];
                        console.log(this.inputDirectory);
                        return [4 /*yield*/, this.getFiles(this.inputDirectory, this.extensions)];
                    case 1:
                        (_a.sent()).forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.convert(file);
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    DirIndexer.prototype.convert = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileDir, fileName, inputPath, outputPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileDir = path.parse(file).dir;
                        fileName = path.parse(file).name + '_thumb';
                        inputPath = path.join(this.inputDirectory, file);
                        console.log(inputPath);
                        outputPath = path.join(this.inputDirectory, fileDir, fileName);
                        return [4 /*yield*/, exists(outputPath + '.jpg')];
                    case 1:
                        if (!(_a.sent())) {
                            try {
                                generateThumbwithsize(inputPath, outputPath, 480, '.jpg');
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DirIndexer.prototype.getFiles = function (currentDir, extensions) {
        return __awaiter(this, void 0, void 0, function () {
            var result, files, _loop_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        files = [currentDir];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        _loop_1 = function () {
                            var filepath, stat;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filepath = files.pop();
                                        return [4 /*yield*/, lstat(filepath)];
                                    case 1:
                                        stat = _a.sent();
                                        if (!stat.isDirectory()) return [3 /*break*/, 3];
                                        return [4 /*yield*/, readdir(filepath)];
                                    case 2:
                                        (_a.sent()).forEach(function (f) {
                                            return files.push(path.join(filepath, f));
                                        });
                                        return [3 /*break*/, 4];
                                    case 3:
                                        if (stat.isFile() && extensions.includes(path.extname(filepath))) {
                                            result.push(path.relative(currentDir, filepath));
                                        }
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        _a.label = 2;
                    case 2: return [5 /*yield**/, _loop_1()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (files.length !== 0) return [3 /*break*/, 2];
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.processedFiles = [];
                        this.processedFiles.push(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    return DirIndexer;
}());
exports["default"] = DirIndexer;
var generator = new DirIndexer();
generator.run();
