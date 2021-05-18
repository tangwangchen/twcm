var url = "http://192.168.0.254:8888/";
function phone(obj) {
	var ph = /^(1[3578]\d{9})|(\w{2,8}@[0-9 a-zA-Z]{3,6}\.com)$/.test(obj.value);
	check(ph, obj);
}

function passw(obj) {
	var pa = /^[0-9a-zA-Z]{8,10}$/.test(obj.value);
	check(pa, obj);
}

function againpassw(obj) {
	var aga = true;
	if (document.getElementById('password').value != obj.value) {
		aga = false;
	}
	check(aga, obj);
}

function check(flag, obj) {
	var s = obj.nextElementSibling;
	if (flag) {
		s.innerHTML = '输入正确';

	} else {
		s.innerHTML = '格式错误,请重新输入';

	}
}

function regis() {
	var f = false;
	var c = 0;
	var s = document.getElementsByTagName("span");
	for (var i = 0; i < s.length; i++) {
		if (s[i].innerHTML == "输入正确") {
			c++;
		}
	}
	f = c == 3;
	if (f) {
		var req = new XMLHttpRequest();
		req.open("GET", url + "regsterUser?username=" + document.getElementById('username').value + "&password=" + document.getElementById(
			'password').value);
		req.send();
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				var t = JSON.parse(req.responseText);
				console.log(t);
				alert('注册成功');
				location.href="./logn.html";  
			}
		}
		
	}else {
	alert("保证每一项都输入正确");
} 







}
