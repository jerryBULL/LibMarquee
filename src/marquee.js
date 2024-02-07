/**
 * marquee - https://github.com/jerryBULL/LibMarquee
 * version - 1.0.0
 */

(function(){
    let Marquee = function(el, _options) {
        let options = {
            state: "start", // start、stop
            startPosition: "start", // start、end
            speed: 30,
            isRepeat: false,
        };

        this.el = document.getElementById(el);
        this.options = Object.assign(options, _options);
        this.intervalList = [];

        this._CheckObjectInstantiated(el);
        this._Init();

        window.marqueeObjectList[el] = this;
    };

    function Plugin(el, options) {
        if(document.getElementById(el) === null){
            throw new Error("element isn't found.");
        }

        return new Marquee(el, options);
    }

    window.marqueeObjectList = {};
    window.marquee = Plugin;
    window.marquee.Constructor = Marquee;

    var _proto = Marquee.prototype;
    _proto._Init = function () {
        this._SetNode();

        if(this.options.isRepeat){
            this.el.classList.add("repeat");
            this._CloneNode();
        }

        this._Run();
    };
    _proto._CheckObjectInstantiated = function (el) {
        if(typeof window.marqueeObjectList[el] !== "undefined"){
            this._ClearObject(window.marqueeObjectList[el]);
        }
    };
    _proto._ClearObject = function (object) {
        let intervalNum = object.intervalList.length;

        while(intervalNum--){
            window.clearInterval(object.intervalList[intervalNum]);
            object.intervalList.pop();
        }

        let copyList = object.listBox.querySelectorAll(".copy");
        copyList.forEach(function(element) {
            element.remove();
        });
    };
    _proto._SetNode = function () {
        if(this.el.querySelector(".marquee-list_box") === null){
            throw new Error(".marquee-list_box isn't found.");
        }else if(this.el.querySelector(".list_box-list") === null){
            throw new Error(".list_box-list isn't found.");
        }

        this.listBox = this.el.querySelector(".marquee-list_box");
        this.list    = this.el.querySelector(".list_box-list");
    };
    _proto._CloneNode = function () {
        let listBox = this.listBox;
        let list    = this.list;

        let copyNum = Math.ceil(listBox.offsetWidth / list.offsetWidth) - 1;
        let childrenNum = list.children.length;

        while(copyNum--){
            for(let j=0; j<childrenNum; j++){
                list.appendChild(list.children[j].cloneNode(true));
            }
        }

        let copyList = list.cloneNode(true);
        copyList.classList.add("copy");
        listBox.appendChild(copyList);  
    };
    _proto._Run = function () {
        let $this = this;

        let listBox = this.listBox;
        let options = this.options;

        let setInterval = function (list, isCopy) {
            let nowOffset = options.startPosition === "start" ? 0 : listBox.offsetWidth;
            if(isCopy){
                nowOffset = nowOffset + list.offsetWidth;
            }

            list.style.transform = `translateX(${nowOffset}px)`;
            interval = window.setInterval(function () {
                if (typeof list === "undefined") {
                    window.clearInterval(interval);
                    return;
                }

                if($this.options.state === "stop"){
                    return;
                }

                let eleWidth = list.offsetWidth;

                nowOffset--;

                if (nowOffset < eleWidth * -1) {
                    nowOffset = options.isRepeat ? list.offsetWidth : listBox.offsetWidth;
                }

                list.style.transform = `translateX(${nowOffset}px)`;
            }, options.speed);

            $this.intervalList.push(interval);
        };

        setInterval(listBox.children[0], false);
        if(this.options.isRepeat){
            setInterval(listBox.children[1], true);
        }
    };

    _proto.Start = function () {
        this.options.state = "start";
    };
    _proto.Stop = function () {
        this.options.state = "stop";
    };
}());