
//轮播图
// 根据图片个数生成小圆点
var arr = [];
var url = "http://192.168.0.254:8888/";
var req = new XMLHttpRequest();
req.open("GET", url + 'showImages');
req.send();
req.onreadystatechange = function() {
	if (req.readyState == 4 && req.status == 200) {
		var t = JSON.parse(req.responseText);
		for (var i = 0; i < t.length; i++) {
			arr[i] = url + t[i].img;
		}
	}
}

function createCilcle() {
	
	var ul = document.getElementById("boc");
	for (var i = 0; i < arr.length; i++) {
		var li = document.createElement("li");
		li.setAttribute("name", "p")
		li.setAttribute("index", i)
		li.addEventListener("mouseover", function() {
			clearTimeout(flag);
			var index = this.getAttribute("index");
			count = index;
			changeColor(index);
			document.getElementById("img").src = arr[index];
		})
		li.addEventListener("mouseout", function() {
			playImgs();
		})
		ul.appendChild(li);
		
	}
}	
// 改变小圆点的颜色
function changeColor(n) {
	var ps = document.getElementsByName("p");
	for (var i = 0; i < ps.length; i++) {
		if (i == n) {
			ps[i].style.backgroundColor = "red";
		} else {
			ps[i].style.backgroundColor = "#cccccc";
		}
	}
}
// 图片轮流播放
var count = 0;
var flag;
function playImgs() {
	changeColor(count);
	var img = document.getElementById("img");
	img.src = arr[count];
	count++;
	if (count == arr.length) {
		count = 0;
	}
	flag = setTimeout("playImgs()", 2000);
}