class List{
    constructor(options){
        this.cont = options.cont;
        this.url = options.url;
        this.load();
        this.addEvent();
    }
    load(){
        var that = this;
        ajaxGet(this.url,function(res){
            that.res = JSON.parse(res);
            that.getCookie();
            
            that.display()
        })
    }
    getCookie() {
        // 判断是否有cookie 
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        console.log(this.goods);    
        // this.display();
    }

    display(){
        // console.log(this.goods)
        var str = "";
        // for(var i = 0; i < this.e.length; i++){
        //     for(var j = 0; j < this.goods.length; j++){
        //         if(this.e[i].goodsId === this.goods[j].id) {
        //             str += `<tr index="${this.goods[j].id}">
        //                         <td><input type="radio"></td>
        //                         <td><img src="${this.e[i].img}" alt=""></td>
        //                         <td>${this.e[i].name}</td>
        //                         <td>${this.e[i].price}</td>
        //                         <td><input type="number" min="1" value="${this.goods[j].num}"></td>
        //                         <td><span>删除</span></td>
        //                         <td>${(this.e[i].price) * (this.goods[j].num)}</td>
        //                     </tr>`;
        //         }
        //     }
        // }
        for(var i=0;i<this.res.length;i++){
            if(this.res[i].goodsId === this.goods[this.goods.length-1].id) {
                    
            str +=  `<div class="box" index="${this.res[i].goodsId}"> 
                        <div class="shopmain-l">
                            <div class="shopmian-l-box">
                                <div class="shopmain-l-big">
                                    <img src="${this.res[i].img}" alt="">
                                </div>
                                <div class="shopmian-l-small">
                                    <ul class="tumbs"  style="opacity: 1; display: block;">
                                        <div class="owl-wrapper-outer">
                                            <div class="owl-wrapper" style="width: 152px; left: 0px; display: block; transition: all 1000ms ease 0s; transform: translate3d(0px, 0px, 0px);">
                                                <div class="owl-item active" style="width: 76px;">
                                                    <li><img src="${this.res[i].img}"/></li>	
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                    <div class="tumbs-nav">
                                        <span class="prev"><</span> 
                                        <span class="next">></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="shopmain-r">
                            <div class="goods-info">
                                <div class="title-box">
                                    <div class="name-row">
                                        <div class="tit ellipsis" >
                                            ${this.res[i].name}
                                        </div>
                                    </div>
                                    <div class="pub ellipsis">${this.res[i].tese}</div>
                                </div>
                                <div class="price-box">
                                    <div class="defbox">
                                        <div class="op">
                                            订花价格：<span class="num">${this.res[i].price}</span>
                                        </div>
                                    </div>
                                </div>
                                <dl class="row-info">
                                    <dt class="k">鲜花花材：</dt>
                                    <dd class="v">${this.res[i].huacai}</dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">鲜花包装：</dt>
                                    <dd class="v">${this.res[i].baozhuang}</dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">鲜花花语：</dt>
                                    <dd class="v">${this.res[i].huayu}</dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">鲜花附送：</dt>
                                    <dd class="v">${this.res[i].fusong}</dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">配送区域：</dt>
                                    <dd class="v">${this.res[i].quyu}</dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">备注：</dt>
                                    <dd class="v">
                                        <span class="lh">${this.res[i].beizhu}</span>
                                    </dd>
                                </dl>
                                <dl class="row-info">
                                    <dt class="k">小贴士：</dt>
                                    <dd class="v">${this.res[i].tieshi}</dd>
                                </dl>
                                <form action="https://www.xinyixianhua.com/booking/confirm.html" id="goodsform" method="get">
                                    <input type="hidden" name="params" value="553_1_1" /> 
                                    <div class="goods-action clearfix">
                                        <input type="button" class="btn" value="加入购物车">
                                        <a href="shopcar.html">去购物车</a>
                                    </div>
                                </form>
                            </div>
                        </div> 
                    </div>  `;
                
            }
        }
        this.cont.innerHTML = str;
    }
    addEvent(){
        var that = this;
        this.cont.onclick = function(eve){
            if(eve.target.className == "btn"){
                that.id = eve.target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index");
                // that.delete();
                that.setCookie();
            }
        }
    }

    // delete(){
    //     var that = this;
    //     this.html.addEventListener("scroll",function(eve){
    //         if(eve.target.tagName == "SPAN"){
    //             that.id = eve.target.parentNode.parentNode.getAttribute("index");
    //             eve.target.parentNode.parentNode.remove();
    //             that.updateCookie(function(i){
    //                 that.goods.splice(i,1);
    //             });
    //         }
    //     })
    // }
    setCookie(){
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        if(this.goods.length == 0){
            // console.log(this.goods);
            this.goods.push({
                id:this.id,
                num:1
            })
        }else{
            var onoff = true;   
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id === this.id){
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            if(onoff){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }
        }
        // console.log(this.goods)
        setCookie("goods",JSON.stringify(this.goods));
    }
}
new List({
    url:"http://localhost/1023-server/floors/xianhua/json/shopde.json",
    cont:document.querySelector(".cont")
})

