window.addEventListener("load", function() {
    // HTML5 Audioに対応していない場合は以降の処理をしない
    if (!HTMLAudioElement) {
        return;
    }
    // エラーメッセージ
    var errorMessage = [
        "","読み込みが中断されました","ネットワークエラーです","デコードエラーが発生しました","未対応のデータかデータがありません"
    ];

    // 読込状況を表示する領域
    var output = document.getElementById("status");

    // オーディオオブジェクトを作成。こうしないと多重演奏されてしまう
    var audioObj = new Audio();

    // オーディオデータ読み込みボタンの処理
    document.getElementById("loadButton").addEventListener("click", function() {
        // すでにオーディオが再生されている場合には停止。コントローラーを半透明にする
        audioObj.pause();
        document.getElementById("controller").style.opacity = 0.5;

        // 読み込むオーディオのURL
        var audioURL = document.getElementById("url").value;
        audioObj = new Audio(audioURL);

        // 読み込みイベントを表示
        audioObj.addEventListener("loadstart", function() {
            output.innerHTML = "データの読み込みを開始しました<br>";
        }, true);

        // メタデータ（ヘッダ情報）イベントを表示
        audioObj.addEventListener("loadedmetadatat", function() {
            output.innerHTML += "ヘッダ情報の読み込みを開始しました<br>";
        }, true);

        // エラーイベントを表示
        audioObj.addEventListener("error", function() {
            output.innerHTML += "エラーが発生しました<br>"
            output.innerHTML +=  "エラーコード：<br>" + audioObj.error.code + "<br>";
            outpunt.innerHTML += errorMessage[audioObj.error.code];
        }, true);

        // 再生可能イベントを表示
        audioObj.addEventListener("canplay", function() {
            output.innerHTML += "再生が可能になりました<br>";
        }, true);
        

        // 継続再生可能イベントを表示
        audioObj.addEventListener("canplaythrough", function() {
            output.innerHTML += "スムーズな再生が可能になりました<br>";
            // コントローラーの不透明度を変化させて使用可能になったことを示す
            document.getElementById("controller").style.opacity = 1.0;
        }, true);
    }, true );

    // 再生ボタンの処理
    document.getElementById("playButton"). addEventListener("click", function() {
        audioObj.play();
    }, true);

    // 停止ボタンの処理
    document.getElementById("stopButton").addEventListener("click", function() {
        audioObj.pause();
    }, true);

    // 巻き戻しボタンの処理
    document.getElementById("rewindButton").addEventListener("click", function() {
        // 再生ヘッドを０秒にする
        audioObj.currentTime = 0;
        audioObj.pause();
    }, true);

    // 等倍速再生ボタンの処理
    document.getElementById("normalButton").addEventListener("click", function() {
        audioObj.playbackRate = 1.0;
        audioObj.defaultplaybackRate = 1.0;
    }, true);

    // ２倍速再生ボタンの処理
    document.getElementById("fastButton").addEventListener("click", function() {
        audioObj.playbackRate = 2.0;
        audioObj.defaultplaybackRate = 2.0;
    }, true);

    // スロー再生ボタンの処理
    document.getElementById("slowButton").addEventListener("click", function() {
        audioObj.playbackRate = 0.5;
        audioObj.defaultplaybackRate = 0.5;
    }, true);

}, true);