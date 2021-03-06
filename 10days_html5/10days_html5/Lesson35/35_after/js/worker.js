// ワーカーでエフェクト処理を行う
window.addEventListener("load", function(){
	var ele = document.getElementById("status");
	// Web Workersが使えるか調べる
	if (!window.Worker){
		ele.innerHTML = "Web Workersは使用できません";
		return;
	}
	// Canvasの情報を読み出す
	var canvasObj = document.getElementById("myCanvas");
	var w = canvasObj.width;
	var h = canvasObj.height;
	var context = canvasObj.getContext("2d");

	// ボタンがクリックされた時の処理
	document.getElementById("effect").addEventListener("click", function(){
		// ピクセルデータを読み出す
		var image = context.getImageData(0, 0, w, h);
		// data配列にピクセルデータが格納されている
// ---- 初版からの変更箇所ここから
		// var pixels = image.data;
		for(var p=0, pixels=[ ]; p<image.data.length; p++){ pixels[p] = image.data[p]; }
// ---- 初版からの変更箇所ここまで
		var myWorker = new Worker("js/effect.js");
		myWorker.onmessage = function(evt){
			if (evt.data.status == "processing"){
				ele.innerHTML = ((evt.data.per)*100).toFixed(1)+"%";
			}
			if (evt.data.status != "end"){
				return;
			}
			var outputImage = context.createImageData(w, h);
			// 加工したピクセルをコピー
			for(var i=0; i<evt.data.pixels.length; i++){
				outputImage.data[i] = evt.data.pixels[i];
			}
			context.putImageData(outputImage, 0, 0);
			ele.innerHTML = "エフェクト処理が終了しました";
		}
		ele.innerHTML = "ピクセル数を計算中...";
		myWorker.postMessage({
			width: w,
			height: h,
			pixelData : pixels
		});
	}, true);
	// Canvasに画像を描画する
	var imageObj = new Image();
	imageObj.src = "images/flower.jpg";
	imageObj.onload = function(){
		context.drawImage(imageObj, 0, 0, 720, 480);
	}
}, true);
