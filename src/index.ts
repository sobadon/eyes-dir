import chokidar from 'chokidar';
import child_process from 'child_process';
import path from 'path';
import fs from 'fs';
import async from 'async';

const abspath = path.resolve(__dirname);
const watch_path = process.argv[2] || `${abspath}/watch`;
const callBatName = 'PostFileAdd.bat';

console.log(`監視対象：${watch_path}`);
console.log(`呼び出される bat ファイル名：${callBatName}`);
console.log(`このディレクトリの絶対パス：${abspath}`);

if (!fs.existsSync(callBatName)) {
	console.log(`${callBatName} が存在しません`);
	console.log('呼び出される bat ファイルを作成してください');
	process.exit(1);
}

if (!fs.existsSync(path.resolve(watch_path))) {
	console.log(`${watch_path} が存在しません`);
	console.log('監視対象のディレクトリを作成してください');
	process.exit(1);
}

const watcher: chokidar.FSWatcher = chokidar.watch(watch_path, {
	persistent: true,
});

if (watcher) {
	watcher.on('ready', () => {
		console.log('Ready');
		watcher.on('add', (path: string) => {
			console.log(`Add: ${path}`);
			callBatQueue.push(path);
		});
	});
} else {
	console.log('error: watch is not True');
}

const callBat = (path: string, callback: () => void) => {
	console.log(`call: ${abspath}\\${callBatName} "${path}"`);
	// パスに空白を含む場合は、パス自体をクオーテーションで囲み、shell: true にする
	const spawn = child_process.spawn(
		`${abspath}\\${callBatName}`,
		[`"${path}"`],
		{ shell: true }
	);
	spawn.on('close', (code: number) => {
		if (code != 0) console.log(`close: process existed with code ${code}`);
		callback();
	});
};

const callBatQueue = async.queue(callBat, 1);
