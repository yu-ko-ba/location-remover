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
}


// <input>でファイルが選択されたときの処理
const fileInput = document.getElementById('example');
//changeイベントで呼び出す関数
const handleFileSelect = () => {
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    previewFile(files[i]); //1つ1つのファイルデータはfiles[i]で取得できる
  }
}
fileInput.addEventListener('change', handleFileSelect);

//script.jsを読み込み終わってからinput要素を無効化を削除
document.getElementById('example').removeAttribute('disabled');
