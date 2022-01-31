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
    //画像をアップロードし終わってからButton要素を無効化を削除
    document.getElementById('run_button').removeAttribute('disabled');
}


function clearPreview() {
    const preview = document.getElementById('preview');
    while (preview.firstChild != null) {
        preview.removeChild(preview.firstChild);
    }
}


//画像をbase64に変換する関数
function ImageToBase64() {
    // HTMLで使えるcanvasタグを生成して、画像サイズに調整
    const img = document.getElementById('previewImage')
    const canvas = document.createElement('canvas');

    //元画像の幅と高さをcanvasに設定
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // canvasタグに画像を描画
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Base64に変換して値を返す
    return canvas.toDataURL("image/jpeg");
}


//base64形式の画像をimgタグのsrcに設定する関数
function SetOnSource(picture) { 
    //表示先のidを取得して、そこにbase64形式の画像を設定
    const outputPicture = document.getElementById('output_picture');
    outputPicture.src = picture;
}


// 実行ボタン押されたときにbase64形式に変換した画像を表示する関数
function runButtonOnClicked() {
    const base64Image = ImageToBase64();
    SetOnSource(base64Image);
    document.getElementById('share').removeAttribute('disabled');
}


// ServiceWorkerの登録をする
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', {scope: '/location-remover/'})
        .then(() => { console.log('Service Worker Registered'); });
}


// シェア用ボタンの動作部分(画像を投稿するにはこれしかない？)
async function share() {
    const share_picture = document.getElementById('output_picture').src;

    //base64形式の画像(URL)をBlob形式に変換
    const blob = await(await fetch(share_picture)).blob();

    // BlobをFileオブジェクトに変換
    const imageFile = new File([blob], 'image.jpg', {type: "image/jpeg"});

    // Web Share APIを呼び出す
    if (navigator.share != null) {
        navigator.share({
            files:[imageFile],
        })
        .then(() => alert('シェアしました'))
        .catch((error) => alert('シェアに失敗しました'))
        } else {
            alert(`\
お使いのブラウザは共有機能に対応していません


動作確認済みブラウザ
  iPhone、iPad
  ・Safari
  ・Google Chrome
  ・Firefox

  Android
  ・Google Chrome

  Windows
  ・Microsoft Edge
  ・Google Chrome

  Mac
  ・Safari

※お使いのブラウザのバージョンが古い場合、動作確認済みのものであっても正常に機能しない場合があります。\
`);
        }
}


// <input>でファイルが選択されたときの処理
const fileInput = document.getElementById('example');
//changeイベントで呼び出す関数
const handleFileSelect = () => {
    clearPreview();

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        previewFile(files[i]); //1つ1つのファイルデータはfiles[i]で取得できる
    }
}

fileInput.addEventListener('change', handleFileSelect);

//script.jsを読み込み終わってからinput要素を無効化を削除
document.getElementById('example').removeAttribute('disabled');
