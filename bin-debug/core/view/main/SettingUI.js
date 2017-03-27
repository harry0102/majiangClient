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
var SettingUI = (function (_super) {
    __extends(SettingUI, _super);
    function SettingUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assets/skins/SettingSkin.exml";
        return _this;
    }
    SettingUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.back_btn = new BaseButton("goback_btn_png");
        this.back_btn.anchorOffsetX = this.back_btn.bg.width / 2;
        this.back_btn.x = GlobalData.GameStage_width / 2;
        this.back_btn.y = this.bg.y + this.bg.height - this.back_btn.bg.height / 2;
        this.addChild(this.back_btn);
        this.back_btn.startTween();
        this.sound_close.visible = !SoundManager.getInstance().sound_switch;
        this.sound_eff_close.visible = !SoundManager.getInstance().sound_effect_switch;
        this.initEvent();
    };
    SettingUI.prototype.initEvent = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.sound_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSoundSwitch, this);
        this.sound_eff_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSoundEffectSwitch, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    SettingUI.prototype.clickSoundSwitch = function () {
        SoundManager.getInstance().playBgSound(!SoundManager.getInstance().sound_switch);
        this.sound_close.visible = !SoundManager.getInstance().sound_switch;
        SoundManager.getInstance().playEffectSound();
    };
    SettingUI.prototype.clickSoundEffectSwitch = function () {
        SoundManager.getInstance().setSoundEffectSwitch(!SoundManager.getInstance().sound_effect_switch);
        this.sound_eff_close.visible = !SoundManager.getInstance().sound_effect_switch;
        SoundManager.getInstance().playEffectSound();
    };
    SettingUI.prototype.clickBack = function () {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().closeSecondUI();
    };
    SettingUI.prototype.clear = function () {
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.sound_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSoundSwitch, this);
        this.sound_eff_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSoundEffectSwitch, this);
    };
    return SettingUI;
}(BaseSecondUI));
__reflect(SettingUI.prototype, "SettingUI");
