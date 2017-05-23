(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 380,
	height: 362,
	fps: 24,
	color: "#000000",
	manifest: [
		{src:"/images/characters/TeamJaxi.png?1495508779126", id:"Bitmap1"}
	]
};



// symbols:



(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,380,327);


(lib.mcChopper = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(43,41,47,0.2)").ss(6,1,1).p("AsPkPQFGhJGxAAQF/AAEsA6AMQEDQlWBWnSAAQl+AAkqg5");
	this.shape.setTransform(2.6,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(206,201,217,0)","rgba(206,201,217,0.902)","rgba(206,201,217,0.4)","rgba(162,155,177,0.6)"],[0.122,0.137,0.427,1],-2.5,0,0,-2.5,0,126.8).s().p("ArAEgIK+kmIsNkIQFGhKGxAAQF/AAEsA6IqVEYIMSEJQlWBWnSgBQl+AAkqg4g");
	this.shape_1.setTransform(2.6,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(43,41,47,0.2)").ss(6,1,1).p("AKtkeQBgASBYAZQFpBlAACOQAACOlpBlQgdAIgeAIAqmEfQhkgThbgZQlohlAAiOQAAiOFohlQA3gPA5gN");
	this.shape_2.setTransform(0,0.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.rf(["rgba(206,201,217,0)","rgba(206,201,217,0.902)","rgba(206,201,217,0.4)","rgba(162,155,177,0.6)"],[0.122,0.137,0.427,1],0,0,0,0,0,126.8).s().p("AtlDzQlnhlgBiOQABiOFnhlQA3gPA5gNIMKEIIq7EmQhkgThbgZgAAVgHIKYkXQBgASBYAZQFpBlAACOQAACOlpBlIg7AQg");
	this.shape_3.setTransform(0,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.8,-37.5,162.9,75);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.mcChopper();
	this.instance.setTransform(68.4,25.3,0.561,0.561,0,-8.2,171.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(43,41,47,0.2)").ss(6,1,1).p("AAAlYQH9AAFoBmQFpBlAACNQAACOlpBlQloBmn9AAQn8AAlphmQlohlAAiOQAAiNFohlQFphmH8AAg");
	this.shape.setTransform(68.4,25.3,0.561,0.561,0,-8.2,171.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["rgba(206,201,217,0)","rgba(206,201,217,0.902)","rgba(206,201,217,0.4)","rgba(162,155,177,0.6)"],[0.122,0.137,0.427,1],0,0,0,0,0,126.8).s().p("AtkD0QlohmAAiOQAAiOFohkQFohmH8AAQH9AAFoBmQFpBkAACOQAACOlpBmQloBkn9AAQn8AAlohkg");
	this.shape_1.setTransform(68.4,25.3,0.561,0.561,0,-8.2,171.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#553310").ss(3,1,1).p("AAtBDQgTAcgaAAQgaAAgTgcQgTgcAAgnQAAgmATgcQATgbAaAAQAaAAATAbQAUAcAAAmQAAAngUAcg");
	this.shape_2.setTransform(91.4,74.1,0.561,0.57,0,-18,171.8,-0.1,0.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.2)").s().p("AgtAdIBygXIAEAMIhyAWIgEgLgAg8AAQgGgIgGgGIBzgZIAIALQAHAJAFALIhxAXIgKgPg");
	this.shape_3.setTransform(39.2,86.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.247)").s().p("Ag5AiQADgKACgMIBwgWIgFAQQgDAIgDAGIhuAWIAEgIgAgygSIBwgYIAAAOIhwAYIAAgOg");
	this.shape_4.setTransform(41.2,98.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.149)").s().p("Ag3BRIgEgUIAZgtQAYgrACgWQAChDAgAYQAMAJALASQALASAAAMQgBAegRApQgZA/gpAAQgYAAgHgSg");
	this.shape_5.setTransform(29.3,98.5,0.264,0.264,0,-8.2,171.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.498)").s().p("AghAdIgBgdQAAg0AigCQAjgCAAA4QgBAXgCAJQgHAYgZAAQgbAAgGgbg");
	this.shape_6.setTransform(32.1,93,0.264,0.264,0,-8.2,171.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.498)").s().p("AguAqIgDgUQAAg7AxgSQAUgIAOAKQAPALAAAdQABANgQAaQgTAigaAAQgaAAgJgSg");
	this.shape_7.setTransform(30.3,89.8,0.264,0.264,0,-8.2,171.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CEF2EF").s().p("AhhDJQgqhTAAh2QAAh0AqhUQAphTA4AAQA5AAAqBTQAoBUAAB0QAAB2goBTQgqBTg5ABQg4gBgphTg");
	this.shape_8.setTransform(30.3,94.8,0.264,0.264,0,-8.2,171.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(4,1,1).p("AhIhgQgWAEgLAiQgMAkAGAsQAHAuAVAeQAVAfAXgEQABAAABAAQAAAAACAAIBsgcQASgDAKgVQADgGADgIQADgJACgJQABgJABgJQAAgHAAgGQAAgOgCgRQgCgPgEgNQgCgGgCgGQgEgIgDgIQgFgLgGgJQgEgGgFgFQgQgTgSADQgBAAgBAAQgCAAgBABg");
	this.shape_9.setTransform(36,93.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#663399").s().p("AgaBUQgVgfgHguQgGgsAMgjQALgjAWgDQAPgDAPAQQAGAFAGAJIAKARIAKAYQAFAQACATIADAaIAAAOQAAAJgCAJQgCALgDALIgEAIQgJAYgRAFIgCABIgCAAIgFAAQgSAAgTgbg");
	this.shape_10.setTransform(30.3,94.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#4A266E").s().p("AgdBgIADgIQAEgLABgLQACgJAAgJIAAgOIgCgcQgDgRgFgQIgJgYIgKgRQgGgJgGgFQgQgQgQADIBrgcIAEgBIABAAQASgCARATIAIALQAHAIAFALIAGAQIAEAMQAEAOACAPQADARgBANIAAANIgCASIgFATQgCAIgEAGQgKAVgRADIhtAbQARgFAKgYg");
	this.shape_11.setTransform(38,93.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(0,0,0,0.247)").s().p("AggATIADgNIA+gLIgDAIIgDAIIg8ANIABgFgAgcgKIA+gMIAAAGIg+APIAAgJg");
	this.shape_12.setTransform(50.7,94.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.2)").s().p("AgYAQIA/gNIACAHIg/AMIgCgGgAghAAIgHgHIBAgOIAFAGIAGALIg+AMIgGgIg");
	this.shape_13.setTransform(49.5,87.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(0,0,0,0.149)").s().p("Ag3BRIgEgUIAZgtQAYgrACgWQAChDAgAYQAMAJALASQALASAAAMQgBAegRApQgZA/gpAAQgYAAgHgSg");
	this.shape_14.setTransform(44,94.7,0.148,0.148,0,-8.2,171.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.498)").s().p("AghAdIgBgdQAAg0AigCQAjgCAAA4QgBAXgCAJQgHAYgZAAQgbAAgGgbg");
	this.shape_15.setTransform(45.5,91.4,0.148,0.148,0,-8.2,171.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.498)").s().p("AguAqIgDgUQAAg7AxgSQAUgIAOAKQAPALAAAdQABANgQAaQgTAigaAAQgaAAgJgSg");
	this.shape_16.setTransform(44.5,89.8,0.148,0.148,0,-8.2,171.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#CEF2EF").s().p("AhhDJQgqhTAAh2QAAh0AqhUQAphTA4AAQA5AAAqBTQAoBUAAB0QAAB2goBTQgqBTg5ABQg4gBgphTg");
	this.shape_17.setTransform(44.5,92.6,0.148,0.148,0,-8.2,171.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#663399").s().p("AgOAvQgLgRgEgaQgEgYAHgUQAGgTAMgCQAIgCAIAJIAHAIIAGAJIAFAPQADAIABALIACANIgBAIQABAFgBAFIgDANIgCAEQgGAOgJADIgBAAIgBAAIgDAAQgJAAgLgPg");
	this.shape_18.setTransform(44.5,92.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#4A266E").s().p("AgPA1IABgEIADgNQABgFAAgFIAAgIIgBgPQgCgJgDgIIgFgPIgFgJIgHgIQgJgJgJACIA7gPIACgBIABAAQAKgBAKAKIAEAGIAGAMIAEAIIACAHIAEAQIABAQIAAAHIgBALIgDAKIgDAIQgGALgJACIg8AQQAJgDAGgOg");
	this.shape_19.setTransform(48.9,91.7);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(4,1,1).p("AAXhFQgBAAAAAAQgBAAgBAAIg8APQgMACgGAUQgHAUAEAYQAEAZALARQAMASANgCQAAAAABAAQABgBAAAAIA8gQQAKgBAFgMQACgDABgFQACgFABgFQABgFAAgFQABgDAAgEQgBgHgBgKQgBgIgCgHQgBgEgBgDQgCgFgCgEQgDgGgDgFQgCgEgDgCQgJgLgKACg");
	this.shape_20.setTransform(47.7,91.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgbBNQgMggAAgtQAAgsAMggQAMghAPAAQAQAAAMAhQAMAgAAAsQAAAtgMAgQgMAhgQgBQgPABgMghg");
	this.shape_21.setTransform(51,77.3,0.561,0.561,0,6.8,-173.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgbBNQgMggAAgtQAAgsAMggQAMghAPAAQAQAAAMAhQAMAgAAAsQAAAtgMAgQgMAhgQgBQgPABgMghg");
	this.shape_22.setTransform(59.1,78.2,0.561,0.561,0,6.8,-173.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.lf(["rgba(255,255,255,0.149)","rgba(255,255,255,0)","rgba(255,255,255,0.102)","rgba(255,255,255,0)"],[0.137,0.463,0.592,0.824],9.5,6.6,-12.5,-9.9).s().p("AiJi4IETEPIkGBig");
	this.shape_23.setTransform(81.9,43.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#663399").s().p("AhoCAIDFk4IAMFxg");
	this.shape_24.setTransform(58.7,43.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#7B5E99").s().p("AiJi4IETEPIkGBig");
	this.shape_25.setTransform(81.9,43.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#271F2F").ss(8,1,1).p("Agli4IjHE3IDTA6gAgZC5IEGhiIkSkP");
	this.shape_26.setTransform(70.3,43.2,1,1,0,0,0,-1.6,-0.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#553310").ss(8,1,1).p("AhTmWIm1KuIHQB/IJCjXgAg4GXIgbst");
	this.shape_27.setTransform(77.4,72.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFB35A").s().p("AkumWIJdJWIpCDXg");
	this.shape_28.setTransform(99.3,72.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FF9933").s().p("AjnEYIG0quIAbMtg");
	this.shape_29.setTransform(48.4,72.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-1.9,142.8,118.9);


// stage content:
(lib.JaxiTeam_Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(0,35.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(80));

	// Layer 2
	this.instance_1 = new lib.Symbol3();
	this.instance_1.setTransform(312.1,83.8,0.702,0.702,0,0,180,68.3,57.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:63.4},19,cjs.Ease.get(-1)).to({y:41.8},20,cjs.Ease.get(1)).to({y:61.8},19,cjs.Ease.get(-1)).to({y:83.8},21,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(190,216.5,380,327);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;