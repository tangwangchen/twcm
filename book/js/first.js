function initPage() {
	createCilcle();
	playImgs();
	if (localStorage.getItem("username") != null) {
		document.getElementById("slogn").innerHTML = '欢迎 ' + localStorage.getItem("username");
	} else {
		document.getElementById("slogn").innerHTML = '请登录';
	}
	
}
//进入购物车
function gocart(obj) {
    var slong = document.getElementById('slogn');
    if (slong.innerHTML) {
        obj.href = 'cart.html';
    } else {
        obj.href = "logn.html";
    }
}
var url = "http://192.168.0.254:8888/";
//左边图片
var leftr = new XMLHttpRequest();
leftr.open("GET", url + 'showADBooks ');
leftr.send();
leftr.onreadystatechange = function() {
	if (leftr.readyState == 4 && leftr.status == 200) {
		var left = JSON.parse(leftr.responseText);
		var conleft = document.getElementById('con_left');
		for (var i = 0; i < left.length; i++) {
			var leftdiv = document.createElement('div');
			var lefta = document.createElement('a');
			var leftimg = document.createElement('img');
			var leftprice = document.createElement('p');
			var leftname = document.createElement('p');
			var leftp = document.createElement('p');
			leftimg.src = url + left[i].img;
			leftprice.innerHTML = '￥' + left[i].price;
			leftname.innerHTML = left[i].name;
			leftp.innerHTML = '共2W+评价';
			lefta.appendChild(leftimg);
			lefta.appendChild(leftprice);
			lefta.appendChild(leftname);
			lefta.appendChild(leftp);
			leftdiv.appendChild(lefta);
			conleft.appendChild(leftdiv);
		}
	}
}
//右边图片
var rightr = new XMLHttpRequest();
rightr.open("GET", url + 'getBooks ');
rightr.send();
rightr.onreadystatechange = function() {
	if (rightr.readyState == 4 && rightr.status == 200) {
		var right = JSON.parse(rightr.responseText);
		var conright = document.getElementById('con_right');
		for (var i = 0; i < right.length; i++) {
			var rightdiv = document.createElement('div');
			var rightimg = document.createElement('img');
			var rightprice = document.createElement('p');
			var rightname = document.createElement('p');
			var rightp = document.createElement('p');
			var rightb = document.createElement('button');
			rightb.setAttribute("index",i);
			rightimg.src = url + right[i].img;
			rightprice.innerHTML = '￥' + right[i].price;
			rightname.innerHTML = right[i].name;
			rightp.innerHTML = '自营放心购秒杀';
			rightb.innerHTML = "查看详情";
			rightdiv.appendChild(rightimg);
			rightdiv.appendChild(rightprice);
			rightdiv.appendChild(rightname);
			rightdiv.appendChild(rightp);
			rightdiv.appendChild(rightb);
			conright.appendChild(rightdiv);
			//加入购物车按钮的点击事件
			rightb.onclick = function() {
				var index=this.getAttribute('index');
				localStorage.setItem("book",JSON.stringify(right[index]))	;				
				location.href = "./details.html";				
			}
		}

	}
}
