function fruit(){
					//购物车按钮切换
				$('.ws-gift .ws-info div').on('click',function(){
				
					$(this).next().css('display','block');
					$(this).css('top','-40px');
					setTimeout(()=>{
					$(this).next().css('top','0px');

					$(this).css('display','none');
					},200)
					let $currentDiv=$(this).parent().parent();
					Car.add($currentDiv.index());
					$('.buyList').show();
					$('.bg').show();
					$('.centerBlock').show();
					setTimeout(()=>{
						$(this).css('display','block');
						$(this).next().css('top','40px');
						setTimeout(()=>{
						$(this).css('top','0px');

						$(this).next().css('display','none');
						},200)
					},3000)
				});

				

				//详情页跳转
				$('.ws-gift').on('click','a',function(){
					let param1=$(this).text();
					let n=false;
					 $.ajax({
				            url: "../api/searchGoods.php", 
				            type: "post",
				            data: {param1:param1,
				          	},
				            success:function(data){
				                //测试参数值
				                data=JSON.parse(data);
				               data.push('新鲜水果');
				               Cookie.set('data',JSON.stringify(data));
				               window.location.href='realGoods.html';
				                },
				            error:function(e){
				                alert('ajax hava an error');
				                }, 
				            complete:function(e){
				                }
        					});  

				});

			
			//居中弹窗
			var top=(window.innerHeight-$('.centerBlock').outerHeight())/2+'px';
			var left=(window.innerWidth-$('.centerBlock').outerWidth())/2+'px';
		
			$('.centerBlock').css('top',`${top}`);
			$('.centerBlock').css('left',`${left}`);

			//弹窗关闭
			$('.blockTop span').on('click',function(){
				$(this).parent().parent().hide();
				$('.bg').hide();
			});
			$('.blockDetail button:nth-child(2)').on('click',function(){
				$('.centerBlock').hide();
				$('.bg').hide();
			})

}