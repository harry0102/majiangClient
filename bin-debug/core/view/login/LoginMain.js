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
var LoginMain = (function (_super) {
    __extends(LoginMain, _super);
    function LoginMain() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assets/skins/LoginMainSkin.exml";
        return _this;
    }
    LoginMain.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btn = new StartButton("startgame_png");
        this.addChild(this.btn);
        //        this.btn.startTween();
        this.btn.once(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    LoginMain.prototype.click = function (e) {
        var tw = egret.Tween.get(this.btn);
        tw.to({ alpha: 0 }, 300).call(this.showInput, this);
        //        //打开游戏
        //        StoryLogic.getInstance().openStory();
    };
    LoginMain.prototype.showInput = function () {
        //弹出输入框，编辑房间名字和密码
        if (this.nameInput == null) {
            this.nameInput = new RoomnameInputView();
            this.nameInput.setCallback(this.resetTheState.bind(this), this.loadGameStage.bind(this));
        }
        this.addChild(this.nameInput);
        this.nameInput.x = -GlobalData.GameStage_width;
        var tw = egret.Tween.get(this.nameInput);
        tw.to({ x: 20 }, 300);
    };
    LoginMain.prototype.resetTheState = function () {
        var tw = egret.Tween.get(this.btn);
        tw.to({ alpha: 1 }, 300);
        this.btn.once(egret.TouchEvent.TOUCH_TAP, this.click, this);
    };
    LoginMain.prototype.loadGameStage = function (name, secret) {
        console.log('name:' + name + '-----secret:' + secret);
    };
    LoginMain.prototype.clear = function () {
        if (this.btn.parent != null) {
            this.btn.parent.removeChild(this.btn);
        }
        this.btn.clear();
        this.btn = null;
    };
    return LoginMain;
}(eui.Component));
__reflect(LoginMain.prototype, "LoginMain");
