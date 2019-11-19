//import Axios from "axios";


var get_url = function(comic){
	return new Promise((resolve, reject) => {	
		fetch("/api/"+comic)
			.then((res) => {
				res.text()
					.then((t) => {
						resolve(t);
					})
					.catch(e => {
						reject(e);
					})
			})
			.catch((err) => {
				reject(err);
			})
	})
}


{
	let btn = document.getElementsByClassName("toggle")[0];
	let head = document.getElementsByClassName("top")[0];
	btn.addEventListener("click", () => {
		head.classList.toggle("big");
		btn.classList.toggle("cancel");
	})
}

{
	// eslint-disable-next-line no-undef
	var swiper_one = new Swiper('.sc-one', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		keyboard: {
			enabled: true,
		},
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
		},
		breakpoints: {
			1: {
				slidesPerView : 1
			},
			1000: {
				slidesPerView: 2
			}
		},
		navigation: {
			nextEl: '.sbn-one',
			prevEl: '.sbp-one',
		}
	});

	// eslint-disable-next-line no-undef
	var swiper_two = new Swiper('.sc-two', {
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		keyboard: {
			enabled: false,
		},
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows : true,
		},
		breakpoints: {
			1: {
				slidesPerView : 1
			},
			1000: {
				slidesPerView: 2
			}
		},
		navigation: {
			nextEl: '.sbn-two',
			prevEl: '.sbp-two',
		}
	}); 

	let add_img = function(s){
		let imgs = s.el.children[0].children;
		let index = [...imgs].length;
		s.appendSlide(`<div class="swiper-slide loading">LOADING...</div>`);
		s.update();
		return index;
	}

	let add_url = function(s, index, url){
		let err = (!url || url.indexOf(".") < 0);
		let img = s.el.children[0].children[index];
		
		img.classList.remove("loading");
		img.innerText = "";
		if(!err){
			img.style["background-image"] = (`url('${url}')`);
		}else{
			//console.log("Broken : "+url);
			img.classList.add("broken");
			img.style["background-image"] = ("url('./Imgs/broken.png')");
		}
	}

	let update_swiper = function(s, comic, isInit=false){
		let prev = s.previousIndex;
		let curr = s.realIndex;
		let index = add_img(s);
		if(curr > prev || isInit){
			get_url(comic).then(x => {
				add_url(s, index, x);
			})
			.catch(() => {
				add_url(s, index);
			})
		}
	}

	swiper_one.on("slideChange", () => {
		update_swiper(swiper_one, "xkcd");
	});
	swiper_two.on("slideChange", () => {
		update_swiper(swiper_two, "explosm");
	});

	for(let i=0; i<4; i++){
		update_swiper(swiper_one, "xkcd", true);
		update_swiper(swiper_two, "explosm", true);
	}

	let show_lib = function(e){
		let el = e.target;
		let str = el.style["background-image"];
		let arr = str.match(/url\("(.+)"\)/);
		//console.log(`${arr} : ${e.target.style["background-image"]}`);
		if(arr && arr.length > 1 && !el.classList.contains("loading") ){
			let lib = document.getElementById("large-image-box");
			//lib.children[1].style["background-image"] = (`url('${arr[1]}')`);
			lib.children[1].src = arr[1];

			lib.classList.add("show");
		}
	}
	swiper_one.on("click", show_lib);
	swiper_two.on("click", show_lib);

	let doc = document.documentElement, body = document.body;
	let swiper_els = document.getElementsByClassName("swiper-container");
	
	document.addEventListener("scroll", () => {
		//console.log(document.getElementsByClassName("comic")[0]);
		let sl1 = swiper_els[0], sl2 = swiper_els[1];
		//console.log(sl1.clientHeight, sl1.offsetTop);
		let scroll = (doc && doc.scrollTop || body && body.scrollTop);
		//let scroll_2 = scroll+(doc.clientHeight/2 || 0);
		//console.log(scroll);
		if(scroll >= sl1.offsetTop && scroll <= (sl1.offsetTop + sl1.clientHeight)){
			swiper_two.keyboard.disable();
			swiper_one.keyboard.enable();
		}else if(scroll >= sl2.offsetTop && scroll <= (sl2.offsetTop + sl2.clientHeight)){
			swiper_one.keyboard.disable();
			swiper_two.keyboard.enable();
		}
	})
	
}


let lib = document.getElementById("large-image-box");
let ib = document.getElementById("large-image");
let close_lib = () => {
	lib.classList.remove("show");
}
lib.addEventListener("click", close_lib);
ib.addEventListener("click", (e) => {
	e.stopPropagation();
})
