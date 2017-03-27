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
var FightResult = (function (_super) {
    __extends(FightResult, _super);
    function FightResult(win) {
        var _this = _super.call(this) || this;
        _this.skinName = win ? "FightWinSkin" : "FightLostSkin";
        return _this;
    }
    FightResult.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.back_btn = new BaseButton("goback_btn_png");
        this.back_btn.anchorOffsetX = this.back_btn.bg.width / 2;
        this.back_btn.x = GlobalData.GameStage_width / 2;
        this.back_btn.y = this.height - 300;
        this.addChild(this.back_btn);
        this.back_btn.startTween();
        this.initEvent();
    };
    FightResult.prototype.initEvent = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    FightResult.prototype.clickBack = function () {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().closeSecondUI();
        FightLogic.getInstance().dispatchEvent(new MyUIEvent(MyUIEvent.FIGHT_CLOSEUI));
    };
    FightResult.prototype.clear = function () {
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    return FightResult;
}(BaseSecondUI));
__reflect(FightResult.prototype, "FightResult");
