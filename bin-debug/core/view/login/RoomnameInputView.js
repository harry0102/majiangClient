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
var RoomnameInputView = (function (_super) {
    __extends(RoomnameInputView, _super);
    function RoomnameInputView() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoomnameInputSkin";
        _this.x = 20;
        _this.verticalCenter = 0;
        return _this;
    }
    RoomnameInputView.prototype.setCallback = function (backAction, conformAction) {
        this.backAction = backAction;
        this.conformAction = conformAction;
    };
    RoomnameInputView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initEvent();
    };
    RoomnameInputView.prototype.initEvent = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOk, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    RoomnameInputView.prototype.clickBack = function (e) {
        SoundManager.getInstance().playEffectSound();
        var tw = egret.Tween.get(this);
        tw.to({ x: -this.width }, 300).call(this.tweenFinish, this);
    };
    RoomnameInputView.prototype.tweenFinish = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
            this.backAction();
        }
    };
    RoomnameInputView.prototype.clickOk = function (e) {
        SoundManager.getInstance().playEffectSound();
        this.conformAction(this.name_input.text, this.screat_input.text);
    };
    RoomnameInputView.prototype.clear = function (e) {
        this.back_btn = null;
        this.name_input = null;
        this.screat_input = null;
    };
    return RoomnameInputView;
}(BasePopUI));
__reflect(RoomnameInputView.prototype, "RoomnameInputView");
