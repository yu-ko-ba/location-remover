function previewFile(file) {
    // プレビュー画像を追加する要素
    // const preview = document.getElementById('preview');
    // FileReaderオブジェクトを作成
    const reader = new FileReader();
  
    // ファイルが読み込まれたときに実行する
    reader.onload = function (e) {
      const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる

      // const img = document.getElementById("preview");
      // img.src = imageUrl;

      const img = document.createElement("img"); // img要素を作成
      img.id = "previewImage"
      img.src = imageUrl; // 画像のURLをimg要素にセット
      img.id = "previewImage";
      preview.appendChild(img); // #previewの中に追加
      // console.log(imageUrl);
    }
  
    // いざファイルを読み込む
    reader.readAsDataURL(file);
    //画像をアップロードし終わってからButton要素を無効化を削除
    document.getElementById('run_button').removeAttribute('disabled');
    document.getElementById('share').removeAttribute('disabled');
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
    console.log(document.getElementById('output_picture').src)
    // console.log(outputPicture)
}

  // 実行ボタン押されたときにbase64形式に変換した画像を表示する関数書いてね♡
function runButtonOnClicked() { 
  const base64Image = ImageToBase64();
  // const image = test();
  SetOnSource(base64Image);
}


//諸々のテスト用
function test() {
  const mime_type = "image/jpeg"
    // HTMLで使えるcanvasタグを生成して、画像サイズに調整
    const preview = document.getElementById('previewImage')
    const canvas = document.createElement('canvas');
    canvas.width  = preview.width;
    canvas.height = preview.height;

    // canvasタグに画像を描画
    const ctx = canvas.getContext('2d');
    ctx.drawImage(preview, 0, 0);

    // Base64に変換して値を返す
    return canvas.toDataURL(mime_type);
}

// Twitterに直接共有する(画像添付不可能かも)
function twitter() {
  const tweet_String_Content = 'テステステスト';
  window.open('https://twitter.com/share?text=' + tweet_String_Content);
}


// シェア用ボタンの動作部分(画像を投稿するにはこれしかない？)
async function share() {
  const share_picture = document.getElementById('output_picture').src;

  //base64形式の画像(URL)をBlob形式に変換
  const blob = await(await fetch(share_picture)).blob();
  // const blob = fetch(share_picture).blob();


  // BlobをFileオブジェクトに変換
  const imageFile = new File([blob], 'image.png', {type:blob.type});

  // Web Share APIを呼び出す
  navigator.share({
    // text:'テスーーート',
    files:[imageFile],
  })
  .then(() => alert('シェアしました'))
  .catch((error) => alert('シェアに失敗しました'))
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
