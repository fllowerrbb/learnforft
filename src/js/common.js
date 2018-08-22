/*
	放置公共函数
 */

// 明确目的

/**
 * [生成任意范围内的随机整数]
 * @param  {Number} min [最小值]
 * @param  {Number]} max [最大]
 * @return {Number}     [返回min到max间的随机整数]
 */
function randomNumber(min,max){
	// 假设
	// Math.random()最小时 -> min
	// ....
	// Math.random()最大时 -> max
	var res = parseInt(Math.random()*(max-min+1))+min;//0.999


	return res;
}

// randomNumber(1,100);
// randomNumber(100,999);
// randomNumber(10,20);

/**
 * [随机颜色]
 * @return {String} [返回rgb格式随机颜色]
 */
function randomColor(num){
	if(num === 16){
		var str = '0123456789abcdef';
		var res = '#';

		for(var i=0;i<6;i++){
			// 获取随机索引值
			var idx = parseInt(Math.random()*str.length);
			res += str.charAt(idx);
		}

		return res;
	}

	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	return 'rgb('+r+','+g+','+b+')';//rgb(244,12,23)
}


function randomCode(num){

}

// randomCode(4);

/**
 * [关于元素节点的操作]
 * 	1.过滤非元素节点
 * 	2.获取子元素
 * 	3.获取兄弟元素
 */
var Element = {
	/**
	 * [过滤非元素节点，得到元素节点]
	 * @param  {Array} nodes [节点列表]
	 * @return {Array}       [元素列表]
	 */
	filter:function(nodes){
		// 声明res变量，用于存放结果
		var res = [];
		for(var i=0;i<nodes.length;i++){
			// 判断是否为元素节点
			// 是：则写入res数组
			if(nodes[i].nodeType === 1){
				res.push(nodes[i]);
			}
		}

		return res;
	},
	children:function(ele){
		// var res = [];
		// for(var i=0;i<ele.childNodes.length;i++){
		// 	if(ele.childNodes[i].nodeType === 1){
		// 		res.push(ele.childNodes[i])
		// 	}
		// }

		// return res;
		return this.filter(ele.childNodes);
	},
	prev:function(ele){

	},
	next:function(ele){}
}

// Element.children(box);//得到box下面的所有子元素
// Element.prev(box);//得到box的前一个元素
// Element.next(box);//得到box后面的兄弟元素


// 封装一个函数，用于获取元素的css样式，兼容所有浏览器
function getCss(ele,attr){
	if(window.getComputedStyle){
		// 标准浏览器
		return getComputedStyle(ele)[attr]
	}else if(ele.currentStyle){
		// IE6,7,8
		return ele.currentStyle[attr]
	}else{
		// 内联样式
		return ele.style[attr];
	}
}

// 先用
// getCss(box,'font-size');

/**
 * [给元素绑定事件的效果,同名事件不覆盖]
 * @param  {Node}  ele       [绑定事件的节点]
 * @param  {String}  type      [事件类型]
 * @param  {Function}  handler   [事件处理函数]
 * @param  {Boolean} isCapture [是否捕获]
 */
function bind(ele,type,handler,isCapture){
	// 判断当前是否支持addEventListener
	if(ele.addEventListener){
		// 标准浏览器
		ele.addEventListener(type,handler,isCapture);
	}else if(ele.attachEvent){
		// IE8-
		ele.attachEvent('on'+type,handler)
	}else{
		// 其他浏览器
		ele['on' + type] = handler;
	}
}

// 给元素绑定事件的效果
// 同名事件不覆盖
// bind(box,'click',function(){},true)

// 只生效一次的事件
function one(ele,type,handler,isCapture){

}

// Cooie的操作
var Cookie = {
	/**
	 * [获取cookie]
	 * @param  {String} name [cookie名]
	 * @return {String}      [返回name对应的cookie值]
	 */
	get:function(name){
		// 获取所有cookie
		var cookies = document.cookie;//

		// 声明变量，用于保存结果
		var res = '';

		// 转成数组
		cookies = cookies.split('; ');

		// 遍历cookie找出name对应的值
		for(var i=0;i<cookies.length;i++){
			// 获取当前cookie
			var arr = cookies[i].split('=');

			// 找出name对应的cookie
			if(arr[0] === name){
				res = arr[1];
			}
		}

		// 返回name对应的值
		// 无则返回cookie
		return res;
	},
	/**
	 * [删除cookie]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	remove:function(name){
		var now = new Date();
		now.setDate(now.getDate()-1);

		// document.cookie = name + '=x;expires='+now.toUTCString()
		this.set(name,'x',{expires:now});
	},
	/**
	 * [设置Cookie]
	 * @param {String} name  [cookie名]
	 * @param {String} value [cookie值]
	 * @param {[Object]} prop  [参数]
	 	* expires
	 	* path
	 	* domain
	 	* secure
	 */
	set:function(name,value,prop){
		// cookie必写部分
		var str = name + '=' + value;

		// 不传参数时避免报错
		if(prop === undefined){
			prop = {};
		}
		console.log(prop.expires);
		// 有效期
		if(prop.expires){
			str += ';expires=' + prop.expires.toUTCString();
		}

		// 保存路径
		if(prop.path){
			str +=';path=' + prop.path
		}

		// 域名
		if(prop.domain){
			str +=';domain=' + prop.domain
		}

		// 安全性
		if(prop.secure){
			str += ';secure';
		}

		// 写入cookie
		document.cookie = str;
	},

}

// Cookie.get('username');//laoxie
// Cookie.set('passowrd','123456',{path:'/'});//laoxie
// Cookie.set('passowrd','abcd',{expires:now,path:'/',secure:true});//laoxie
// Cookie.remove()


// function animate(ele,attr,target){
// 	// 避免多个属性时定时器覆盖
// 	var timerName = attr + 'timer';

// 	// 避免抖动
// 	clearInterval(ele[timerName]);

// 	ele[timerName] = setInterval(function(){
// 		// 获取当前值
// 		// var current = getComputedStyle(ele)[attr];
// 		var current = getCss(ele,attr);//可能达到的值：200px,0.5,1,45deg,#1258bc

// 		// 提取单位
// 		var unit = current.match(/^([\d\.]+)([a-z]*)$/);//null

// 		if(!unit){
// 			// 如果得到null,意味动画无法进行，直接退出
// 			clearInterval(ele.timer);
// 			return;
// 		}

// 		// 提取值和单位
// 		current = unit[1]*1;
// 		unit = unit[2];

// 		// 计算缓冲速度
// 		var speed = (target-current)/10;//0.6->1，-0.6->-1

// 		// speed不能为0
// 		speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

// 		// 针对opacity处理speed
// 		if(attr === 'opacity'){
// 			speed = speed<0 ? -0.05 : 0.05;
// 		}

// 		current += speed;

// 		// 判断结束条件
// 		if(current === target){
// 			clearInterval(ele[timerName]);

// 			// 重置目标值
// 			current = target;
// 		}

// 		// 设置样式
// 		ele.style[attr] = current + unit;
// 	},30)
// }



// animate(item[i],'top',160)
// animate(item[i],'top',5)


function animate(ele,opt,callback){
	// 记录属性数量
	var timerLen = 0;

	for(var attr in opt){
		// 每循环一个属性+1
		timerLen++;

		(function(attr){
			// 获取目标值
			var target = opt[attr];

			var timerName = attr + 'timer';

			// 避免抖动
			clearInterval(ele[timerName]);

			ele[timerName] = setInterval(function(){
				// 获取当前值
				// var current = getComputedStyle(ele)[attr];
				var current = getCss(ele,attr);//可能达到的值：-165px,200px,0.5,1,45deg,#1258bc

				// 提取单位
				var unit = current.match(/^([\-\d\.]+)([a-z]*)$/);//null

				if(!unit){
					// 如果得到null,意味动画无法进行，直接退出
					clearInterval(ele.timer);
					return;
				}

				// 提取值和单位
				current = unit[1]*1;
				unit = unit[2];

				// 计算缓冲速度
				var speed = (target-current)/10;//0.6->1，-0.6->-1

				// speed不能为0
				speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

				// 针对opacity处理speed
				if(attr === 'opacity'){
					speed = speed<0 ? -0.05 : 0.05;
				}

				current += speed;

				// 判断结束条件
				if(current === target){
					clearInterval(ele[timerName]);

					// 重置目标值
					current = target;

					// 每结束一个定时器，数量-1
					timerLen--;

					// 执行背景颜色改变
					if(typeof callback === 'function' && timerLen===0){
						callback();
					}
				}

				// 设置样式
				ele.style[attr] = current + unit;
			},30);

		})(attr);
	}
}

/**
 * 数据类型判断终极版
 * @param  {Every} data [任意数据类型]
 * @return {String}      [数据类型字符串]
 */
function type(data){
	return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
};

			var Car ={
					goodslist:[],
					totalPrice:0,
					ele:'.buyList ul',

					init(){
						this.ele=$(this.ele);
					
						//删除单个商品
						 this.ele.on('click','span:nth-child(4)',(e)=>{
                        // 获取当前li
                        let $currentLi = $(e.target).closest('li');
                        let idx = $currentLi.index();

                        this.remove(idx);
                    });
					},
					//添加商品
					add(idx){
						let $currentDiv =$('.giftList .ws-gift').eq(idx);

						let $currentImg=$currentDiv.find('img');

						let src=$currentImg.attr('src');
						let nameDeti=$currentDiv.find('div>p').text().split('￥');
						
						let name=nameDeti[0];

						let quantity=$currentDiv.find('div p>span').text()+'/'+$currentDiv.find('div>span').text();

						this.currentImg=$currentImg;
						let n=0;
						for(var i=0;i<this.goodslist.length;i++){
							if(this.goodslist[i].name===name){
									this.goodslist[i].qty+=1;
									console.log(this.goodslist[i].qty)
							}else{

							n++;
							}
						}
						if(n>=i){

						this.goodslist.push({
							src:src,
							name:name,
							quantity:quantity,
							qty:1
						});
						}
						this.render();


					},
					remove(idx){
						this.goodslist.splice(idx,1);
						this.render();
					},
					clear(idx){
						this.goodslist=[];
						this.render();
					},
					render(goodslist){
						if(goodslist){
							this.goodslist=goodslist;
						}
						let total=0;
						let totalGoods=0;
						let content =this.goodslist.map((item,idx)=>{
							
							var price=item.quantity.split('/');
							price=price[0].slice(1);
							total+=(price-0)*(item.qty-0);
							totalGoods+=item.qty-0;
							return `
								<li>
								<img src="${item.src}"/>
								<div>
									<h5>${item.name}</h5>
									<h5>${item.quantity}</h5>
									<div>
									<span class="left">-</span>
									<input type="" name="" value="${item.qty}">
									<span class="right">+</span>
									</div>
									<span>删除</span>
								</div>
								</li>
							`
						}).join('');
						
						var date = new Date();

						// 在当前的基础上+7天
						date.setDate(date.getDate()+7);
					
						document.cookie ='buycar='+JSON.stringify(this.goodslist)+';expires='+ date.toUTCString();
						this.ele.html(content);
						$('.checkout div:nth-child(1)>span>a').html(`${totalGoods}`);
						$('.mainCar>span').html(`${totalGoods}`);
						$('.blockDetail p>a:nth-child(1)').html(`${totalGoods}`);
						total=total.toFixed(2);
						$('.checkout div:nth-child(2)>a').html(`${total}`);
						$('.blockDetail p>a:nth-child(2)').html(`${total}`);
					}
				}
	var Checkout ={
					buycar:[],

					init(){
						var data = Cookie.get('buycar');
							data=JSON.parse(data);
							this.buycar=data;
						
					//商品删除
				
					},
					remove(idx){
						this.buycar.splice(idx,1);
	
						this.render();
					},
					amend(idx,i){
						console.log(i,this.buycar[idx].qty);

						this.buycar[idx].qty=i;
						this.render();
					},
					render(){
							
							var qty=0;
							var total=0;
							var price=0;
							var content=this.buycar.map(item=>{
								qty+=item.qty-0;

								var quantity=item.quantity.split('/');
								price=quantity[0].slice(1);
								total+=(price-0)*(item.qty-0);
								return `
								<li>
									<img src="${item.src}"/>
									<div>${item.name}</div>
									<div>${quantity[1]}</div>
									<div>${quantity[0]}</div>
									<div class="goodsNum">
										<span class="left">-</span>
										<input type="" name="" value="${item.qty}">
										<span class="right">+</span>
									</div>
									<div>${quantity[0]}</div>
									<div><span>删除</span></div>
								</li>
								`;
								})
							$('.goodsListDe').html(content);
							check();
							qty=qty+'件';
							$('.checkoutList div span a:nth-of-type(1)').html(`${qty}`);
							total='￥'+total.toFixed(2);
							$('.checkoutList div span a:nth-of-type(2)').html(`${total}`);
							document.cookie ='buycar='+JSON.stringify(this.buycar);
					}
				}	
			