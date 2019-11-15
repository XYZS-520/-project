class List {
    constructor(options) {
        this.cont = options.cont;
        this.url = options.url;
        this.load();
        this.addEvent();
    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.display()
        })
    }
    // shopdetails.html
    display() {     
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            str += `<li  class="box" index="${this.res[i].goodsId}">
                        <a href="shopdetails.html" class="shoplistimg">
                            <img src="${this.res[i].img}" alt="" class="ibtn">
                        </a>
                        <div class="shopxinxi">
                            <div class="shopxinxi-t">
                                <a href="" >${this.res[i].name}</a>
                            </div>
                            <div class="shopxinxi-b">
                                <div class="shopjiage">
                                    <span class="num">${this.res[i].price}</span>
                                </div>
                                <a href="shopdetails.html"><input type="button" class="btn" value="立即购买"></a>
                            </div>
                        </div>
                    </li>`;
        }
        this.cont.innerHTML = str;
    }
    addEvent() {
        var that = this;
        this.cont.onclick = function (eve) {
            if (eve.target.className == "ibtn") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                console.log(that.id);
                // var section = document.querySelector(section);
                // var ul = document.querySelector(ul);
                // var li = document.querySelector(li);
                $(".box").attr("id",that.id);
                // console.log($(".box"));
                // that.setCookie();
                that.seesion();
            }
        }
    }
    seesion() {
        sessionStorage.ids = this.id;
        console.log(this.id)
    }
    // setCookie() {
    //     this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
    //     if (this.goods.length == 0) {
    //         this.goods.push({
    //             id: this.id,
    //             num: 1
    //         })
    //     } else {
    //         var onoff = true;
    //         for (var i = 0; i < this.goods.length; i++) {
    //             if (this.goods[i].id === this.id) {
    //                 this.goods[i].num++;
    //                 onoff = false;
    //             }
    //         }
    //         if (onoff) {
    //             this.goods.push({
    //                 id: this.id,
    //                 num: 1
    //             })
    //         }

    //     }
    //     setCookie("goods", JSON.stringify(this.goods));
    // }
}
new List({
    url: "http://localhost/1023-server/floors/xianhua/json/goods.json",
    cont: document.querySelector(".cont")
})