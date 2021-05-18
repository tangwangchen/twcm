var food = [
    { img: '../img/1cde.jpg', name: 'A米汉堡包', price: 16, sale: '月销售300', fee: '起送￥10', time: '40分钟' },
    { img: '../img/3a31d.jpg', name: '杨记小厨', price: 16, sale: '月销售300', fee: '起送￥10', time: '40分钟' },
    { img: '../img/9ecd.jpg', name: '杨铭宇黄焖鸡', price: 16, sale: '月销售300', fee: '起送￥10', time: '40分钟' },
    { img: '../img/d64c553.jpg', name: '烤肉拌饭', price: 16, sale: '月销售300', fee: '起送￥10', time: '40分钟' },
];
var cart = document.getElementById('cart');
var shopping = document.getElementById('shopping');
var settlement = document.getElementById('settlement');
var sec = document.getElementById('sec');

//购物车中商品的数量
function add0() {
    var spa = document.getElementById('spa'); 
    var num = 0;
    for (var i = 1; i < settlement.rows.length; i++) {
        num += parseInt(settlement.rows[i].cells[3].firstChild.nextElementSibling.innerHTML);
        spa.innerHTML = num;
    }
}
//添加商品不重复
function c(name) {
    var f = true;   
    for (var i = 0; i < settlement.rows.length; i++) {
        if (settlement.rows[i].cells[1].innerHTML == name) {
            f = false;
            break;
        }
    }
    return f;
}
//添加商品
function addFood(arr) {
    for (var i = 0; i < arr.length; i++) {
        var divs = document.createElement('div');
        var imgs = document.createElement('img');
        imgs.src = arr[i].img;
        var names = document.createElement('span');
        names.innerHTML = arr[i].name;
        var prices = document.createElement('span');
        prices.innerHTML = arr[i].price;
        var sales = document.createElement('p');
        sales.innerHTML = arr[i].sale;
        var uls = document.createElement('ul');
        var fees = document.createElement('li');
        fees.innerHTML = arr[i].fee;
        var f = document.createElement('li');
        f.innerHTML = '免费配送';
        var times = document.createElement('li');
        times.innerHTML = arr[i].time;
        var but = document.createElement('button');
        but.innerHTML = '加入购物车';
        uls.appendChild(fees);
        uls.appendChild(f);
        uls.appendChild(times);
        divs.appendChild(imgs);
        divs.appendChild(names);
        divs.appendChild(prices);
        divs.appendChild(sales);
        divs.appendChild(uls);
        divs.appendChild(but);
        shopping.appendChild(divs);
        //加入购物车
        but.onclick = function () {
            //购物车添加商品  
            var name=this.parentNode.children[1].innerHTML;
            if (c(name)) {
                var tr = settlement.insertRow();
                tr.insertCell().innerHTML = '<input type="checkbox" name="select"  onchange="selectSingle()">';
                tr.insertCell().innerHTML = this.parentNode.children[1].innerHTML;
                tr.insertCell().innerHTML = this.parentNode.children[2].innerHTML;
                tr.insertCell().innerHTML = "<button onclick='reduce(this)'>-</button><span>1</span><button onclick='add(this)'>+</button>";
                tr.insertCell().innerHTML = "<button onclick='deleteRows(this)'>删除</button>";
            }
            add0();
        }
    }
}
addFood(food);
//进入购物车界面
function goCart() {
    settlement.style.display = 'block';
    gong.style.display = 'block';
    sec.style.display = 'none';
}
//继续点餐
var gong = document.getElementById('gong');
function con() {
    settlement.style.display = 'none';
    gong.style.display = 'none';
    sec.style.display = 'block';
}
//增加数量
function add(num) {
    var ad = parseInt(num.previousElementSibling.innerHTML);
    ad++;
    num.previousElementSibling.innerHTML = ad;
    add0();
}
//减少数量
function reduce(num) {
    var red = parseInt(num.nextElementSibling.innerHTML);
    if (red > 1) {
        red--;
        num.nextElementSibling.innerHTML = red;
    }
    add0();
}
//删除购物车行
function deleteRows(foodRow) {
    for (var i = 1; i < settlement.rows.length; i++) {
        if (settlement.rows[i] == foodRow.parentNode.parentNode) {
            settlement.deleteRow(i);
        }
    }
    add0()
}
//删除选择项
function reduceR() {
    for (var i = settlement.rows.length-1; i >0 ; i--) {
        if (settlement.rows[i].cells[0].firstElementChild.checked) {
            settlement.deleteRow(i);
        }
    }
    add0();
}
//全选
function selectAll(all){
    // 将全选按钮的选中状态赋给下面所有的复选框
    for(var i=0;i<settlement.rows.length;i++){
        settlement.rows[i].cells[0].firstElementChild.checked = all.checked;
    }
}
function selectSingle(){
    var chbox = document.getElementsByName('select');

    // 只要有一个复选框未选中，则全选按钮不选中
    for(var i=0;i<chbox.length;i++){
        if(!chbox[i].checked){
            settlement.rows[0].cells[0].firstElementChild.checked=false;
            return;
        }
    }
    settlement.rows[0].cells[0].firstElementChild.checked= true;
}
//总价格计算
var total = document.getElementById('total');
var alltotal = parseInt(total.innerHTML);
function balance() {
    for (var i = 1; i < settlement.rows.length; i++) {
        if (settlement.rows[i].cells[0].firstElementChild.checked) {
            var sum = parseInt(settlement.rows[i].cells[2].innerHTML) * parseInt(settlement.rows[i].cells[3].firstChild.nextElementSibling.innerHTML);
            alltotal += sum;
            total.innerHTML = alltotal;
        }
    }
    alltotal = 0;
}