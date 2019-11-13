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
    display() {
        var str = "";
        for (var i = 0; i < this.res.length; i++) {
            str += `<li  class="box" index="${this.res[i].goodsId}">
                        <a href="shopdetails.html" class="shoplistimg">
                            <img src="${this.res[i].img}" alt="">
                        </a>
                        <div class="shopxinxi">
                            <div class="shopxinxi-t">
                                <a href="" >${this.res[i].name}</a>
                            </div>
                            <div class="shopxinxi-b">
                                <div class="shopjiage">
                                    <span class="num">${this.res[i].price}</span>
                                </div>
                                <input type="button" class="btn" value="立即购买">
                            </div>
                        </div>
                    </li>`;
        }
        this.cont.innerHTML = str;
    }
    addEvent() {
        var that = this;
        this.cont.onclick = function (eve) {
            if (eve.target.className == "btn") {
                that.id = eve.target.parentNode.parentNode.parentNode.getAttribute("index");
                that.setCookie();
            }
        }
    }
    setCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        if (this.goods.length == 0) {
            this.goods.push({
                id: this.id,
                num: 1
            })
        } else {
            var onoff = true;
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id === this.id) {
                    this.goods[i].num++;
                    onoff = false;
                }
            }
            if (onoff) {
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            }

        }
        setCookie("goods", JSON.stringify(this.goods));
    }
}
new List({
    url: "http://localhost/1023-server/floors/xianhua/json/goods.json",
    cont: document.querySelector(".cont")
})