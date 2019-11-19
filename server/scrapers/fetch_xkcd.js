const axios = require("axios");

async function xkcd(latest=false, devMode=false){

	if(devMode){
		return "https://imgs.xkcd.com/comics/blownapart_color.jpg";
	}

	latest = Boolean(latest);
	let url;
	if(latest){
		url = "http://xkcd.com/info.0.json";
	}else{
		let id = Math.floor(Math.random() *2229 +1);
		url = `http://xkcd.com/${id}/info.0.json`;
	}

	//url = "http://www.google.com"
	//console.log(url);		

	let res = await axios.get(url).catch(() => {
		throw "Error connecting to xkcd";
	});
	return res.data.img;
	
}

module.exports = xkcd;