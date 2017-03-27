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
var FightPauseUI = (function (_super) {
    __extends(FightPauseUI, _super);
    function FightPauseUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assets/skins/FightPauseSkin.exml";
        return _this;
    }
    FightPauseUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    FightPauseUI.prototype.init = function () {
        this.resume_btn = new BaseButton("goback_btn_png");
        this.resume_btn.anchorOffsetX = this.resume_btn.bg.width / 2;
        this.resume_btn.x = GlobalData.GameStage_width / 2;
        this.resume_btn.verticalCenter = 60;
        this.addChild(this.resume_btn);
        this.resume_btn.startTween();
        this.initEvent();
    };
    FightPauseUI.prototype.initEvent = function () {
        this.resume_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.resumeClick, this);
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    FightPauseUI.prototype.backClick = function () {
        UIManager.getInstance().closeSecondUI(true);
        FightLogic.getInstance().dispatchEvent(new MyUIEvent(MyUIEvent.FIGHT_CLOSEUI));
    };
    FightPauseUI.prototype.resumeClick = function () {
        UIManager.getInstance().closeSecondUI();
    };
    FightPauseUI.prototype.clear = function () {
        this.resume_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.resumeClick, this);
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backClick, this);
    };
    return FightPauseUI;
}(BaseSecondUI));
__reflect(FightPauseUI.prototype, "FightPauseUI");
