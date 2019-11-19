const express = require("express");
const app = express();

const fetch_xkcd = require("./server/scrapers/fetch_xkcd.js");
const fetch_explosm = require("./server/scrapers/fetch_explosm.js");
const add_err_to_log = require("./server/logger.js");

app.set("port", process.env.PORT || 8080);
app.use(express.static(__dirname+"/public"));

app.get("/", (req, res) => {
	res.send("home");
})

app.get("/api/:name", async (req, res, next) => {
	let {params: {name}, query: {latest}} = req;
	name = name.toLowerCase();
	
	res.set("Content-Type", "text/plain");
	var img = "";
	//console.log(name);
	//console.log(id);
	
	if (name=="random"){
		let available = ["xkcd", "explosm"];
		name = available[Math.floor(Math.random() * available.length)];
	}
	if(name == "xkcd"){
		img = await fetch_xkcd(latest).catch((r) => {
			add_err_to_log("xkcd", r);
			next(r);
			return;
		});
	}else if(name == "explosm"){
		img = await fetch_explosm(latest).catch((r) => {
			add_err_to_log("explosm", r);
			next(r);
			return;
		});
	}else{
		res.status(422); // request has the proper structure but cannot be processed
		res.set("Content-Type", "text/plain");
		res.send("This comic is not available on our servers");
		return;
	}
	
	res.status(200).send(img);

})


/* ERROR pages */
app.use((req, res) => {
	res.status(404);
	res.set("Content-Type", "text/plain");
	res.seend("404 - Page Not Found");
})// 404

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	// add_err_to_log(500);
	res.status(500);
	res.set("Content-Type", "text/plain");
	res.send("500 - Internal Server Error");
});//500

// start server
app.listen(app.get("port"), () => {
	console.log("Running webcomicz on localhost://"+app.get("port"));
})