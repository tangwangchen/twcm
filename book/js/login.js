function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var req = new XMLHttpRequest();
	req.open("GET", "http://192.168.0.254:8888/login?username=" + username + "&password=" + password);
	req.send();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var r = req.responseText;
			var user = JSON.parse(r);
			if (username == user.username && password == user.password) {
				localStorage.setItem("username", username);
				localStorage.setItem('password', password);
				location.href = "./first.html";
			}
		}
	}


}
