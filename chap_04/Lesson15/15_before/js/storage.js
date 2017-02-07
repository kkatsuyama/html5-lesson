// ページの読み込みが完了したら処理をする
window.addEventListener("load", function() {

    // 日記一覧を表示する
    generateList();

// 今日の日付をテキストフィールドに設定
var dateObj = new Date();
var Y = dateObj.getFullYear();
var M = dateObj.getMonth() + 1;
var D = dateObj.getDate();
var dateString = Y + "年" + M + "月" + D + "日";
document.getElementById("displayDate").value = dateString;

// ローカルストレージが使えるかチェックする
if (!window.localStorage) {
    var ele = document.getElementById("status");
    ele.innerHTML = "ローカルストレージが使えるブラウザをご利用ください";
    return;
}

//「保存する」ボタンがクリックされた時の処理
document.getElementById("saveButton").addEventListener("click", function() {
    var displayTitle = document.getElementById("displayTitle").value;
    var displayDate = document.getElementById("displayDate").value;
    var displayContents = document.getElementById("displayContents").value;
    var saveData = {
        title : displayTitle,
        contents : displayContents
    }
    window.localStorage.setItem(displayDate, JSON.stringify(saveData));
    var ele = document.getElementById("status");
    ele.innerHTML = "内容を保存しました"
    // 日記一覧を表示
    generateList();
}, true);

}, true);
