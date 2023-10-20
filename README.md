# LibMarquee Github Page
[Marquee Demo](https://jerrybull.github.io/LibMarquee/ "link")

# 簡介
使用純 JS 打造跑馬燈套件。
可做到循環撥放、指定起始位置、給定事件做開始和暫停播放。

# 用法教學
### 引入
```html
<link rel="stylesheet" href="./Content/JS/marquee/marquee.css" />
<script src="./Content/JS/marquee/marquee.min.js"></script>
```

### 跑馬燈容器
```html
<div id="marquee01" class="marquee">
    <div class="marquee-list_box">
        <div class="list_box-list">
            <div>marquee01</div>
            <div>marquee02</div>
        </div>
    </div>
</div>
```

### 執行 JS
```javascript
    let marquee01 = marquee("marquee01", {
        1. state: "start",
        startPosition: "start",
        speed: 30,
        isRepeat: true,
    });

    //跑馬燈暫停
    marquee01.stop();

    //跑馬燈開始
    marquee01.Start();
```
# 參數介紹
### state - 跑馬燈狀態
1. start - 開始 (default)
2. stop - 暫停

### startPosition - 從哪個位置開始跑
1. start - 最前端 (default)
2. end - 最尾端

### speed - 文字移動速度

### isRepeat - 內容是否需要重複
1. true - 會複製能夠塞滿整個容器的文字產生循環撥放的效果
2. false - 僅跑提供的內容 (default)

# 注意事項
id 是唯一的，如果有重複 id 的話只會有一個跑馬燈容器做動!