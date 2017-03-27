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
var LogoAnimation = (function (_super) {
    __extends(LogoAnimation, _super);
    function LogoAnimation() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assets/skins/LogoAnimationSkin.exml";
        _this.init();
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    LogoAnimation.prototype.init = function () {
        this.addChild(ViewUtil.getShape(GlobalData.GameStage_width, GlobalData.GameStage_height, 0x888888, 0.2));
        this.logo.anchorOffsetX = this.logo.width / 2;
        this.logo.anchorOffsetY = this.logo.height / 2;
        this.logo.x = this.width / 2;
        this.logo.y = 0;
        this.logo_txt.alpha = 0;
        this.logo.scaleX = this.logo.scaleY = 0.1;
    };
    LogoAnimation.prototype.onStage = function (e) {
        var tw = egret.Tween.get(this.logo);
        tw.to({ y: GlobalData.GameStage_height / 2 - 100, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut).call(this.txtTween, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    };
    LogoAnimation.prototype.txtTween = function () {
        var tw = egret.Tween.get(this.logo_txt);
        tw.to({ alpha: 1 }, 500).wait(100).call(this.clear, this);
    };
    LogoAnimation.prototype.clear = function () {
        UIManager.getInstance().openFirstUI(UIManager.CLASS_UI_INDEX_LOGINMAIN);
    };
    LogoAnimation.prototype.removeStage = function (e) {
        console.log("removeStage");
    };
    return LogoAnimation;
}(eui.Component));
__reflect(LogoAnimation.prototype, "LogoAnimation");
