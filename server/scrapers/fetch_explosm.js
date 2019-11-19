let request = require("request");
let cheerio = require("cheerio");


async function explosm(latest=false, devMode=false){
	return new Promise((resolve, reject) => {
		if(devMode){
			resolve("http://files.explosm.net/comics/Rob/transmorph2.png");
		}

		let url = (latest)? "http://www.explosm.net" : "http://www.explosm.net/comics/random" ;

		request({
			method: "GET", 
			url
		}, (err, res, body) => {
			if(err){ reject("Error fetching "+url); }
			try{
				let $ = cheerio.load(body);
				let src = $("img#main-comic").attr("src");
				src = "http:"+src;
				resolve(src);
			}catch(e){
				reject("Error connecting to explosm "+e);
			}
		})
	})
}

/*
(async ()=>{
	let src = await explosm();
	console.log(src);
})()
*/

module.exports = explosm;