export interface Image {
	path: string;
	name: string;
	size: number;
	extension: string;
	type: ItemType;
}

export interface Folder {
	path: string;
	name: string;
	children: Array<Folder | Image>;
	size: number;
	type: ItemType;
}

export enum ItemType {
	DIRECTORY = 'directory',
	FILE = 'file'
}
