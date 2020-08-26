# eyes-dir

指定したディレクトリ内のファイル追加を検知していい感じに bat ファイルを呼び出してくれる

Windows 限定

いろいろお試しリポジトリ

---

1. `eyes-dir.exe` と同じディレクトリに `PostFileAdd.bat` を作成する。
2. cmd などから、`eyes-dir.exe` を起動する。
	- 監視対象のディレクトリパスを引数として与えることができる
	- 引数指定無しで `./watch` を監視
3. ファイルの追加が検知されたら、`%1` にそのファイルパスがある形で `PostFileAdd.bat` が呼び出される。
	- 複数のファイルが検知されたらキューに溜まり、順次 `PostFileAdd.bat` が呼び出される。

---

[paulmillr/chokidar](https://github.com/paulmillr/chokidar) の CLI を利用する方法もあったけど、リミットかけたりが微妙だった&1つの exe で動かしたかった
