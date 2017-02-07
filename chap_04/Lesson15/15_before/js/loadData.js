// 保存リスト一覧から作成し表示する
function generateList() {

    var data = window.localStorage;
    var displayList = "";
    for (var i = 0; i < data.length; i++) {
        var dataKey = data.key(i);
        // キーが日付かどうか正規表現を使って調べる
        var result = dataKey.match(/^\d{1,4}年\d{1,2}月\d{1,2}日/);
        // 日付の場合のみリストして表示する
        if (result != null) {
            // リンクを生成
            var link = '<a href="#" onclick=loadDialy("' + data.key(i) + '")>' + data.key(i) + '</a>';
            displayList += link + "<br>";
         }
    }
    document.getElementById("list").innerHTML = displayList;
}

// リンクがクリックされた時の処理
function loadDialy(displayDate) {
    var loadData = JSON.parse(window.localStorage.getItem(displayDate));
    document.getElementById("displayTitle").value = loadData.title;
    document.getElementById("displayDate").value = displayDate;
    document.getElementById("displayContents").value = loadData.contents;
}
