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
var MenuUI = (function (_super) {
    __extends(MenuUI, _super);
    function MenuUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainMenuSkin";
        return _this;
    }
    MenuUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //返回按钮
        this.back_btn = new BaseButton("menubtnbg_png");
        this.back_btn.x = 0;
        this.back_btn.y = -30;
        var bmp = new egret.Bitmap(RES.getRes("fanhui_png"));
        bmp.x = (this.back_btn.bg.width - bmp.width) / 2;
        bmp.y = 238;
        this.back_btn.bg.addChild(bmp);
        this.addChild(this.back_btn);
        this.back_btn.startTween();
        //商城按钮背景旋转
        var tw = egret.Tween.get(this.shop_bg, { loop: true });
        tw.to({ rotation: this.rotation + 1000 }, 3000);
        //经验条
        this.expbar.setBarMinMax(22, 238);
        this.expbar.setProgress(700, 1000);
        //购买道具
        this.buy_prop_btn_arr = [];
        for (var i = 0; i < 4; i++) {
            this['prop' + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBuyProp, this);
        }
        //强化城墙
        this.update_wall_btn_arr = [];
        this.initEvent();
    };
    MenuUI.prototype.initEvent = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.shop_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShop, this);
        this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickSetting, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    MenuUI.prototype.clickSetting = function () {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().openSecondUI(new SettingUI(), TweenManager.TWEEN_UI_MOVE);
    };
    MenuUI.prototype.clickShop = function () {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().openSecondUI(new ShopUI(), TweenManager.TWEEN_UI_SCALE);
    };
    MenuUI.prototype.clickBack = function (e) {
        SoundManager.getInstance().playEffectSound();
        var tw = egret.Tween.get(this);
        tw.to({ x: -this.width }, 300).call(this.tweenFinish, this);
    };
    MenuUI.prototype.tweenFinish = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
            StoryLogic.getInstance().dispatchEvent(new MyUIEvent(MyUIEvent.CLOSE_MENU));
        }
    };
    MenuUI.prototype.clickBuyProp = function (e) {
        SoundManager.getInstance().playEffectSound();
    };
    MenuUI.prototype.clickUpdateWall = function (e) {
        SoundManager.getInstance().playEffectSound();
    };
    MenuUI.prototype.clear = function (e) {
        this.back_btn.clear();
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        for (var i = 0; i < this.buy_prop_btn_arr.length; i++) {
            this.buy_prop_btn_arr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBuyProp, this);
            this.buy_prop_btn_arr[i] = null;
        }
        for (var i = 0; i < this.update_wall_btn_arr.length; i++) {
            this.update_wall_btn_arr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickUpdateWall, this);
            this.update_wall_btn_arr[i] = null;
        }
        egret.Tween.removeTweens(this.shop_bg);
        this.expbar.clear();
        this.back_btn = null;
        this.shop_bg = null;
        this.shop_btn = null;
        this.expbar = null;
        this.role_lv = null;
        this.role_atk = null;
        this.help_btn = null;
        this.coint_txt = null;
        this.setting_btn = null;
        this.buy_prop_btn_arr = null;
        this.prop_num_arr = null;
        this.update_wall_btn_arr = null;
        this.wall_lv_arr = null;
        this.wall_select = null;
    };
    return MenuUI;
}(BasePopUI));
__reflect(MenuUI.prototype, "MenuUI");
