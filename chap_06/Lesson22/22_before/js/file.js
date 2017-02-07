// 選択したバイナリファイルの内容を表示
window.addEventListener("load", function() {

    // 情報を表示する領域の要素
    var ele = document.getElementById("fileinfo");

    // File API が使えるか調べる
    if (!window.File) {
        ele.innerHTML = "File API が使用できません";
        return;
    }
    
    // 進捗状況を表示するプログレスバーの要素を特定
    var prog = document.getElementById("loadstatus");

    // ファイルを読み込むための File Reader オブジェクトを入れる変数
    var reader;

    // ボタンがクリックされた時の処理
    document.getElementById("read").addEventListener("click", function() {

        var binaryFile = document.getElementById("filedata").files[0];

        // 選択されたファイル情報
        ele.innerHTML = "<hr>ファイル名：" + binaryFile.name;
         ele.innerHTML += "<br>ファイルサイズ：" + binaryFile.size +  "バイト";
         ele.innerHTML += "<br>MIME Type：" + binaryFile.type;
         ele.innerHTML += "<hr>";

        // バイナリファイルの読み込み処理
        reader = new FileReader();
        reader.onload = function(evt) {
            var totalData = evt.total;
            prog.innerHTML = "100% (" + totalData + "/" + totalData + "バイト)";
            prog.value = 100;
            ele.innerHTML += "読み込み完了";
            // バイナリデータを読み出す
            var data = evt.target.result;
            var binaryData = [ ];
            var count = document.getElementById("readcount").value;
            var dumpList = document.getElementById("contents");
            dumpList.innerHTML = "";            // 内容を消去しておく
            for (var n = 0; n < count; n++) {
                var val = data.charCodeAt(n);
                var hex = val.toString(16).toUpperCase();
                if (val < 16) {
                    // 先頭に０をつける
                    hex = "0" + hex;
                }
                dumpList.innerHTML +=  hex + " ";
                if (( n % 16) == 15) {
                    dumpList.innerHTML +=  "<br>";
                }
            }
            ele.innerHTML += binaryData.toString() + "<hr>";
        }

        reader.onerror = function(evt) {
            var errorNo = evt.target.error.code;
            ele.innerHTML += "エラー発生：" + errorNo;
        }

        reader.onabort = function(evt) {
            ele.innerHTML += "読み込みが中断されました";
        }


        reader.onprogress = function(evt) {
            var loadData = evt.loaded;
            var toatalData = evt.total;
            var per = (loadData / totalData) * 100;
            per = per.toFixed(1);   // 小数点第一位までの表示にする
            prog.innerHTML = per + "% (" + loadData + "/" + totalData + "バイト)";
            prog.value = per;
        }
        // バイナリファイルとして読み込む
        reader.readAsBinaryString(binaryFile);
    }, true);

    // 読み込み停止ボタン
    document.getElementById("stopButton").addEventListener("click", function() {
        reader.abort();
    }, true);
}, true);
