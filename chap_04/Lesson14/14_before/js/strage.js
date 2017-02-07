// ページの読み込みが完了したら処理をする
window.addEventListener("load", function() {

    // 今日の日付をテキストフィールドに設定
    var dateObj = new Date();
    var Y = dateObj.getFullYear();
    var M = dateObj.getMonth() + 1;
    var D = dateObj.getDate();
    var dateString = Y "年"+ M +"月"+ D+"日";
    document.getElementById("displayDate").value = dateString;

    // ローカルストレージが使えるかチェックする
    if (!window.localStorage) {
        var ele = document.getElementById("status");
        ele.innerHTML = "ローカルストレージが使えるブラウザをご利用ください";
        return;
    }

    // 「保尊する」ボタンがクリックされた時の処理
    document.getElementById("saveBotton").addEventListener("click", function() {
        var displayTitle = document.getElementById("displayTitle").value;
        var displayDate = document.getElementById("displayDate").value;
        var displayContents = document.getElementById("displayContents").value;
        var saveData = {
            title : displayTitle,
            contents : displayContents
        }
        window.localStorage.setItem(displayDate, JSON.stringify(saveData));
        var ele = getElementById("status");
        ele.innerHTML = "内容を保存しました";
    }, true);

    // 「保存した内容を読み出す」ボタンがクリックされた時の処理
    document.getElementById("loadButton").addEventListener("click", function() {
        var displayDate = document.getElementById("displayDate").value;
        var loadData = JSON.parse(window.localStorage.getItem(displayDate));
        if (loadData  == null) {
            var ele = document.getElementById("status");
            ele.innerHTML = "保存された" + displayDate + "の日記はありません";
            document.getElementById("displayTitle").value = "";
            document.getElementById("displayContents").value = "";
            return;
        } 
        document.getElementById("displayTitle").value = displayTitle;
        document.getElementById("displayContents").value = loadData.contents;
    }, true);
}, true);
