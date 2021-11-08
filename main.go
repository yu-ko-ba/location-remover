package main

import (
    "image/jpeg"
    "log"
    "os"

    "github.com/minodisk/go-fix-orientation/processor"
)


func main() {
    removeLocation("2021-11-06 13-31-12.jpeg")
}


func removeLocation(filePath string) {
    // ファイルを開く
    file, err := os.Open(filePath)
    if err != nil {
        log.Fatalln(err)
    }

    // デコードして回転情報を反映させる
    fixed, err := processor.Process(file)

    // 画像の出力先を確保する
    out, err := os.Create("reEncoded.jpg")
    if err != nil {
        log.Fatalln(err)
    }
    defer out.Close()

    // jpegでエンコードする
    jpeg.Encode(out, fixed, nil)
}
