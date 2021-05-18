function hicart() {
	document.getElementById("slogn").innerHTML = '欢迎 ' + localStorage.getItem("username");
	if (localStorage.getItem("username") != null) {
		if (localStorage.getItem("car") == null) {
			document.getElementById("msg").innerHTML = "您的购物车空空如也"
		} else {
			var s = JSON.parse(localStorage.getItem("car"));
			var tab = document.getElementById("car");
			for (var i = 0; i < s.length; i++) {
				var tr = tab.insertRow();
				tr.insertCell().innerHTML = '<input type="checkbox" name="select"  onchange="selectSingle()">';
				tr.insertCell().innerHTML = '<img src="' + s[i].img + '">';
				tr.insertCell().innerHTML = s[i].name;
				tr.insertCell().innerHTML = s[i].price;
				tr.insertCell().innerHTML = "<input type='button' value='-' onclick='reducNum(this)'><span>" + s[i].number +
					"</span><input type='button' value='+' onclick='addNum(this)'>";
				tr.insertCell().innerHTML = parseInt(s[i].price) * parseInt(car.rows[i + 1].cells[4].firstChild.nextElementSibling.innerHTML);
				tr.insertCell().innerHTML = "<input type='button' value='删除' onclick='delFood(this)'>";
			}
		}
	} else {
		location.href = "./logn.html"
	}
	add0();
}
//购物车中商品的数量
function add0() {
	var spa = document.getElementById('spa');
	var num = 0;
	for (var i = 1; i < car.rows.length; i++) {
		num += parseInt(car.rows[i].cells[4].firstChild.nextElementSibling.innerHTML);
		spa.innerHTML = num;
	}
}

//添加数量
function addNum(obj) {
	var n = obj.previousElementSibling;
	n.innerHTML = parseInt(n.innerHTML) + 1;
	var s = JSON.parse(localStorage.getItem("car"));
	s[obj.parentNode.parentNode.rowIndex - 1].number += 1;
	localStorage.setItem("car", JSON.stringify(s));
	var m=obj.parentNode.parentNode.children[5].innerHTML;
	m=parseInt(obj.parentNode.parentNode.children[3].innerHTML)*parseInt(obj.parentNode.parentNode.children[4].firstChild.nextElementSibling.innerHTML);
	obj.parentNode.parentNode.children[5].innerHTML=m;
	add0();

}
//减少数量
function reducNum(obj) {
	var n = obj.nextElementSibling;
	if (parseInt(n.innerHTML) > 1) {
		n.innerHTML = parseInt(n.innerHTML) - 1;
		var s = JSON.parse(localStorage.getItem("car"));
		s[obj.parentNode.parentNode.rowIndex - 1].number -= 1;
		localStorage.setItem("car", JSON.stringify(s));
		var m=obj.parentNode.parentNode.children[5].innerHTML;
		m=parseInt(obj.parentNode.parentNode.children[3].innerHTML)*parseInt(obj.parentNode.parentNode.children[4].firstChild.nextElementSibling.innerHTML);
		obj.parentNode.parentNode.children[5].innerHTML=m;
	}
	add0();

}
//删除选择项
function reduceR() {
	for (var i = car.rows.length - 1; i > 0; i--) {
		if (car.rows[i].cells[0].firstElementChild.checked) {
			car.deleteRow(i);
		}
	}
	add0();
}
// 删除
function delFood(obj) {
	var tab = document.getElementById("car");
	var s = JSON.parse(localStorage.getItem("car"));
	s.splice(obj.parentNode.parentNode.rowIndex - 1, 1);
	localStorage.setItem("car", JSON.stringify(s));
	tab.deleteRow(obj.parentNode.parentNode.rowIndex);
	add0();
}

//全选
function selectAll(all) {
	// 将全选按钮的选中状态赋给下面所有的复选框
	for (var i = 0; i < car.rows.length; i++) {
		car.rows[i].cells[0].firstElementChild.checked = all.checked;
	}
}

function selectSingle() {
	var chbox = document.getElementsByName('select');
	// 只要有一个复选框未选中，则全选按钮不选中
	for (var i = 0; i < chbox.length; i++) {
		if (!chbox[i].checked) {
			car.rows[0].cells[0].firstElementChild.checked = false;
			return;
		}
	}
	car.rows[0].cells[0].firstElementChild.checked = true;
}
//总价格计算

function balance() {
	var total = document.getElementById('total');
	var alltotal = parseInt(total.innerHTML);
	alltotal = 0;
	var bonc = 0;
	for (var i = 1; i < car.rows.length; i++) {
		if (car.rows[i].cells[0].firstElementChild.checked) {
			var sum = parseInt(car.rows[i].cells[3].innerHTML) * parseInt(car.rows[i].cells[4].firstChild.nextElementSibling.innerHTML);
			bonc += sum;
			alltotal = bonc;
			total.innerHTML = alltotal;
		}
	}

}
