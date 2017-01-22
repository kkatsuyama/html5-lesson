// ページの読み込みが完了したら処理する
window.addEventListener("load", function() {

    // 情報を表示する領域の要素
    var ele = document.getElementById("result");

    // File API が使えるか調べる
    if (!window.File) {
        ele.innerHTML = "File API が使用できません";
        return;
    }

    // 「選択されたファイルを表示」ボタンがクリックされた時の処理
    document.getElementById("read").addEventListener("click", function() {
        // ファイル情報を取得
        var fileList = document.getElementById("filedata").files;
        // 選択されたファイル数
        ele.innerHTML = "選択したファイル数：" + fileList.length;
        for (var i = 0; i < fileList.length; i++) {
            ele.innerHTML += "<hr>ファイル名：" + fileList[i].name;
            ele.innerHTML += "<br>ファイルサイズ："  + fileList[i].size + "バイト";
            ele.innerHTML += "<br>MIME TYPE：" + fileList.type;
            ele.innerHTML += "<br>lastModifiedDate：" + fileList[i].lastModifiedDate;
            ele.innerHTML += "<hr>";
            var reader = new FileReader();
            reader.onloadstart = function(evt) {
                ele.innerHTML += "loadstart イベント発生<br>";
            }
            reader.onload = function(evt) {
                ele.innerHTML += "load イベント発生<br>";        
            }
            reader.onprogress = function(evt) {
                var loadData = evt.loaded;
                ele.innerHTML +=  "progress イベント発生：" + loadData + "バイト<br>";
            }
            reader.onloaded =  function(evt) {
                ele.innerHTML += "loaded イベント発生<br>";
            }
            reader.onerror = function(evt) {
                var errorNo = evt.target.error.code;
                ele.innerHTML += "error イベント発生：" + errorNo + "<br>";
            }
            reader.onabort = function(evt) {
                ele.innerHTML += "abort イベント発生<br>";
            }
            reader.readAsText(fileList[i], "utf-8");
        }
    }, true);
}, true);
