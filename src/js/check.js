function check(){
		////数量增加减少
			$('.goodsNum .left').on('click',function(e){
						let i=$(this).next().val();
						if(i>1){
							i--;
						}
						$(this).next().val(i);
						let $currentLi = $(e.target).closest('li');
						Checkout.amend($currentLi.index(),$(this).next().val());
						
					});
			$('.goodsNum .right').on('click',function(e){
						let i=$(this).prev().val()-0;
						if(i>=1&&i<200){
							i++;
						}
						$(this).prev().val(i);
			
						let $currentLi = $(e.target).closest('li');
						Checkout.amend($currentLi.index(),$(this).prev().val());
						
			})
			
			$('.goodsListDe li div:last-of-type').on('click','span',(e)=>{
				console.log('ddd');
				 let $currentLi = $(e.target).closest('li');

						 Checkout.remove($currentLi.index());
			});
}