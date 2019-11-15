class Car {
    constructor(options) {
        this.url = options.url;
        this.tbody = options.tbody;
        this.read();
        this.weiEvent();
    }

    read() {
        var _this = this;
        ajaxGet(this.url, function (e) {
            // console.log(e);
            _this.e = JSON.parse(e);
            // console.log(_this.e);
            _this.getCookie();
        })
    }
    getCookie() {
        this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
        // console.log(this.goods);    
        this.display();
    }

    display() {
        var str = "";
        var strr= "";
        for (var i = 0; i < this.e.length; i++) {
            for (var j = 0; j < this.goods.length; j++) {
                if (this.e[i].goodsId === this.goods[j].id) {
                    str += `<tr index="${this.goods[j].id}">
                                <td><input type="radio"></td>
                                <td><img src="${this.e[i].img}" alt=""></td>
                                <td class="teshude">${this.e[i].name}</td>
                                <td>${this.e[i].price}</td>
                                <td><input class="sumgb" type="number" min="1" value="${this.goods[j].num}"></td>
                                <td>${(this.e[i].price) * (this.goods[j].num)}</td>
                                <td><span style="background-color: #f00;width: 43px;line-height: 24px;display: block;vertical-align: middle;text-align: center;color: #fff;border-radius:16% 16% 16% 16%;">删除</span></td>
                            </tr>
                             `;
                    strr += `<em style="color:#ca0e25;">￥${(this.e[i].price) * (this.goods[j].num)}</em>`;
                }
            }
        }
        // var strr = `${(this.e[i].price) * (this.goods[j].num)}`;
        this.tbody.innerHTML = str;
        $(".cart-nr-zj-js").html(strr);
    }
    weiEvent() {
        var _this = this;
        this.tbody.addEventListener("click", function (e) {
            if (e.target.tagName == "SPAN") {
                _this.id = e.target.parentNode.parentNode.getAttribute("index");
                e.target.parentNode.parentNode.remove();
                _this.delCookie();
            }
        })
        this.tbody.addEventListener("input", function (e) {
            if (e.target.tagName == "INPUT") {
                _this.id = e.target.parentNode.parentNode.getAttribute("index");
                _this.value = e.target.value;
                _this.changeCookie();
            }
        })
    }
    delCookie() {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === this.id) {
                this.goods.splice(i, 1);
            }
        }
        setCookie("goods", JSON.stringify(this.goods));
    }
    changeCookie() {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].id === this.id) {
                this.goods[i].num = this.value;
            }
        }
        setCookie("goods", JSON.stringify(this.goods));
    }

}
new Car({
    url: "http://localhost/1023-server/floors/xianhua/json/shopde.json",
    tbody: document.querySelector("tbody")
})