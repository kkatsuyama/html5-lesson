// JavaScript
window.addEventListener("load", function() {

	// a要素を読み出し
	var tSwitch = document.getElementById("toggleSwitch");

	// a要素にイベントを割当る
	tSwitch.addEventListener("click", function() {
		var tbl = document.querySelectorAll("table");
		if (tbl[0].style.display == "none") {
			tbl[0].style.display = "block";
			tSwitch = "▲売上推移を表示しない";
		} else {
			tbl[0].style.display = "none";
			tSwitch = "▼売上推移を表示する";		
		}
	}, true);

	// バナー広告を定期的に入替える
	setInterval(function() {
		// 広告設定
		var cm = [ ];
		cm["images/banner.png"] = "images/banner2.png";
		cm["images/banner2.png"] = "images/banner.png";
		// img要素を読み出す
		var img = document.querySelectorAll("aside img")[0];
		// 属性値を入替える
		img.src = cm[img.getAttribute('src')];
	}, 1000);

	// 現在の日時のセクションの最後に追加する
	var dtObj = new Date();					// Dateオブジェクトを作成
	var y = dtObj.getFullYear();			// 西暦年数4桁を詠込む
	var m = dtObj.getMonth() + 1;		// 月を詠込む
	var d = dtObj.getDate();				// 日にちを詠込む
	document.querySelectorAll("time")[0].innerHTML = y + "/" + m  + "/" + d;
	// 新たなバナーを追加する
	var bannerImage = new Image();						// 画像オブジェクトを作成
	bannerImage.src = "images/banner3.png";		// URLを指定
	bannerImage.onload = function() {
		var aDiv = document.querySelectorAll("aside div")[0];
		aDiv.appendChild(bannerImage);
	}
	// 売上がマイナスのときは赤字にする。
	var td = document.querySelectorAll("#main table td");
	for (var i=0; i<td.length; i++) {
		var text = td[i].innerHTML;
		if (text.indexOf("-") > -1) {
			td[i].style.color = "red";
		}
	}
}, true);

