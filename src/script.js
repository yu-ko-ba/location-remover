let blobCache


function previewFile(file) {
    // プレビュー画像を追加する要素
    // FileReaderオブジェクトを作成
    const reader = new FileReader();

    // ファイルが読み込まれたときに実行する
    reader.onload = function (e) {
        const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
        const img = document.createElement("img"); // img要素を作成
        img.id = "previewImage"
        img.src = imageUrl; // 画像のURLをimg要素にセット
        preview.appendChild(img); // #previewの中に追加
    }

    // いざファイルを読み込む
    reader.readAsDataURL(file);
    // 画像をアップロードし終わってからButton要素を無効化を削除
    document.getElementById('run_button').removeAttribute('disabled');
}


function clearPreview() {
    const preview = document.getElementById('preview');
    while (preview.firstChild != null) {
        preview.removeChild(preview.firstChild);
    }
}


// 画像をbase64に変換する関数
function ImageToBase64() {
    // HTMLで使えるcanvasタグを生成して、画像サイズに調整
    const img = document.getElementById('previewImage')
    const canvas = document.createElement('canvas');

    // 元画像の幅と高さをcanvasに設定
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // canvasタグに画像を描画
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Base64に変換して値を返す
    return canvas.toDataURL("image/jpeg");
}


// base64形式の画像をimgタグのsrcに設定する関数
function SetOnSource(picture) { 
    // 表示先のidを取得して、そこにbase64形式の画像を設定
    const outputPicture = document.getElementById('output_picture');
    outputPicture.src = picture;
}


// 実行ボタン押されたときにbase64形式に変換した画像を表示する関数
function runButtonOnClicked() {
    const base64Image = ImageToBase64();

    SetOnSource(base64Image);

    // 即時関数の実行
    (async function() {
        // base64形式の画像(URL)をBlob形式に変換してグローバル変数に保存しておく
        blobCache = await(await fetch(base64Image)).blob();
        document.getElementById('download').removeAttribute('hidden');
        document.getElementById('share').removeAttribute('hidden');
    }());
}


// ダウンロードボタンが押されたときの処理
function download() {
    // 内部的にダウンロードリンクを作ってそれをクリックする
    const downloadLink = document.createElement("a");
    downloadLink.download = "image.jpg";
    downloadLink.href = window.URL.createObjectURL(blobCache);
    downloadLink.click();
}


function showErrorAlert() {
    alert(`\
お使いのブラウザは共有機能に対応していません


対応環境
  iPhone、iPad
  ・iOS/iPadOS 15以上

  Android
  ・Google Chrome 79以上

  Windows
  ・Microsoft Edge 89以上
  ・Google Chrome 89以上

  Mac
  ・Safari 15以上\
`);
}


// シェア用ボタンの動作部分(画像を投稿するにはこれしかない？)
async function share() {
    // BlobをFileオブジェクトに変換
    const imageFile = new File([blobCache], 'image.jpg', {type: "image/jpeg"});

    // Web Share APIを呼び出す
    try {
        await navigator.share({files: [imageFile]});
    } catch (error) {
        showErrorAlert();
    }
}


// ServiceWorkerの登録をする
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', {scope: '/location-remover/'})
        .then(() => { console.log('Service Worker Registered'); });
}

// <input>でファイルが選択されたときの処理
const fileInput = document.getElementById('example');
// changeイベントで呼び出す関数
const handleFileSelect = () => {
    clearPreview();

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        previewFile(files[i]); // 1つ1つのファイルデータはfiles[i]で取得できる
    }
}
fileInput.addEventListener('change', handleFileSelect);

// script.jsを読み込み終わってからinput要素を無効化を削除
document.getElementById('example').removeAttribute('disabled');
