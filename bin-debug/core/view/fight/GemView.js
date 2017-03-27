var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var GemView = (function (_super) {
    __extends(GemView, _super);
    function GemView(v) {
        var _this = _super.call(this) || this;
        _this.width_set = 100;
        _this.height_set = 90;
        _this.vo = v;
        _this.addChild(ViewUtil.getShape(_this.width_set, _this.height_set));
        _this.init();
        return _this;
    }
    /**当合成战士时，宝石暂时做隐藏*/
    GemView.prototype.setAppear = function (b) {
        this.visible = b;
        this.touchChildren = this.touchEnabled = b;
    };
    /**合成战士前的特效*/
    GemView.prototype.changeBomb = function () {
        this.bg.visible = false;
        var data = RES.getRes("bomb_json");
        var txtr = RES.getRes("bomb_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.vo.index % 2 == 0 ? "bomb1" : "bomb2"));
        mc.x = (this.width_set - mc.width) / 2;
        mc.y = (this.height_set - mc.height) / 2;
        this.addChild(mc);
        mc.play();
        mc.once(egret.Event.COMPLETE, function (e) {
            if (mc != null && mc.parent != null) {
                mc.stop();
                mc.parent.removeChild(mc);
                mc = null;
            }
        }, this);
    };
    /**更换索引（位置）*/
    GemView.prototype.setIndex = function (i) {
        this.vo.index = i;
    };
    /**晃动*/
    GemView.prototype.startTween = function (b) {
        if (b) {
            this.bg.rotation = -20;
            var tw = egret.Tween.get(this.bg, { loop: true });
            tw.to({ rotation: 20 }, 200).to({ rotation: -20 }, 200);
        }
        else {
            egret.Tween.removeTweens(this.bg);
            this.bg.rotation = 0;
        }
    };
    GemView.prototype.init = function () {
        var texture = RES.getRes("fight_" + this.vo.type);
        this.bg = new eui.Image(texture);
        this.bg.anchorOffsetX = texture.textureWidth / 2;
        this.bg.anchorOffsetY = texture.textureHeight / 2;
        this.bg.x = texture.textureWidth / 2;
        this.bg.y = texture.textureHeight / 2;
        this.bg.smoothing = true;
        this.addChild(this.bg);
        this.initEvent();
    };
    GemView.prototype.initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    GemView.prototype.click = function () {
        console.log("点击宝石索引：" + this.vo.index);
        FightLogic.getInstance().setSelectGem(this.vo.index);
    };
    GemView.prototype.clear = function () {
        this.bg = null;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    };
    return GemView;
}(egret.Sprite));
__reflect(GemView.prototype, "GemView");
