var url = "http://192.168.0.254:8888/";
function initdet() {
	if (localStorage.getItem("username") != null) {
		document.getElementById("slogn").innerHTML = '欢迎 ' + localStorage.getItem("username");
	} else {
		document.getElementById("slogn").innerHTML = '请登录';
	}
	var books = new XMLHttpRequest();
	books.open("GET", url + 'getBooks ');
	books.send();
	books.onreadystatechange = function() {
		if (books.readyState == 4 && books.status == 200) {
			var book =JSON.parse(localStorage.getItem("book")); 
			//书图片
			var bigimg = document.getElementById('bigimg');
			bigimg.src = url + book.img;
			//书本介绍
			var big = document.getElementById('big');
			big.innerHTML = book.name;
			//原价
			var bigprice = document.getElementById('bigprice');
			bigprice.innerHTML = book.price;
			//折后价
			var goprice = document.getElementById('goprice');
			goprice.innerHTML =Math.round(parseInt(bigprice.innerHTML) * 0.95) ;
		}
	}

}
var car=[]
function buy(){
	price=document.getElementById('goprice').innerHTML;
	name=document.getElementById('big').innerHTML;
	img=document.getElementById('bigimg').src;
    if(localStorage.getItem("username")!=null){ //判断用户是否登录 登录成功可以购买  没登陆跳转到登录页面
        if(localStorage.getItem("car")!=null){ //在本地存储中拿出数据 
            car=JSON.parse(localStorage.getItem("car"));
        }else{
            car=[];
        }
        var r=car.filter(function(a){return a.name==name}); //判断数据在购物车中是否存在
        if(r.length==0){
            car.push({name:name,price:price,img:img,number:1});
            localStorage.setItem("car",JSON.stringify(car));
        }else{
            alert('你已添加过该商品');
        }
    }else{
        location.href="./logn.html"
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
