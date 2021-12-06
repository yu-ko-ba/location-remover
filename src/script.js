function previewFile(file) {
    // プレビュー画像を追加する要素
    const preview = document.getElementById('preview');
    // FileReaderオブジェクトを作成
    const reader = new FileReader();
  
    // ファイルが読み込まれたときに実行する
    reader.onload = function (e) {
      const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
      const img = document.createElement("img"); // img要素を作成
      img.src = imageUrl; // 画像のURLをimg要素にセット
      preview.appendChild(img); // #previewの中に追加
      console.log(imageUrl);
    }
  
    // いざファイルを読み込む
    reader.readAsDataURL(file);
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


  //画像をbase64に変換する関数
  function ImageToBase64(img, mime_type) {
    // HTMLで使えるcanvasタグを生成して、画像サイズに調整
    const canvas = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;

    // canvasタグに画像を描画
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Base64に変換して値を返す
    return canvas.toDataURL(mime_type);
  }


  //base64形式の画像をimgタグのsrcに設定する関数
  function SetOnSource() { 
    //base64形式の画像を取得
    const picture = ImageToBase64();

    //表示先のidを取得して、そこにbase64形式の画像を設定
    const outputPicture = document.getElementById('output_picture');
    outputPicture.src = picture;

  }
