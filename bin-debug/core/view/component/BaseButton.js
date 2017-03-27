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
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton(srcstr) {
        var _this = _super.call(this) || this;
        _this.src_str = srcstr;
        _this.init();
        return _this;
    }
    BaseButton.prototype.init = function () {
        this.bg = new egret.Sprite();
        this.addChild(this.bg);
        var img = RES.getRes(this.src_str);
        this.src = new egret.Bitmap(img);
        this.bg.addChild(this.src);
    };
    BaseButton.prototype.startTween = function () {
        var oldX = this.bg.x;
        var tw = egret.Tween.get(this.bg, { loop: true });
        //        tw.to({ y: this.bg.y + 20},500)
        //            .to({ y: oldY },500).wait(100);
        tw.to({ x: this.bg.x + 20 }, 500)
            .to({ x: oldX }, 500).wait(100);
    };
    BaseButton.prototype.clear = function () {
        egret.Tween.removeTweens(this.bg);
        this.removeChildren();
        this.src_str = null;
        this.src = null;
    };
    return BaseButton;
}(eui.Group));
__reflect(BaseButton.prototype, "BaseButton");
