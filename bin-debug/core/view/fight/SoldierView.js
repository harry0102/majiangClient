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
var SoldierView = (function (_super) {
    __extends(SoldierView, _super);
    function SoldierView(gem) {
        var _this = _super.call(this) || this;
        _this.width_set = 100;
        _this.height_set = 90;
        _this.gem_type = gem;
        _this.init();
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.clear, _this);
        return _this;
    }
    SoldierView.prototype.changeFly = function () {
        this.removeChildren();
        this.soldier.stop();
        this.fly = FightLogic.getInstance().getMovieClip("fly");
        this.fly.frameRate = 12;
        this.fly.play(-1);
        this.addChild(this.fly);
    };
    /**战士攻击动画效果：各种爆炸，冰封效果*/
    SoldierView.prototype.bombEffectPlay = function () {
        //黄色，红色，蓝色，黑色
        if (this.bomb_bg == null) {
            this.bomb_bg = new egret.Bitmap(RES.getRes("beattack_" + this.gem_type + "_0"));
            this.bomb_bg.scaleX = this.bomb_bg.scaleY = 2;
            this.bomb_bg.x = (this.width - this.bomb_bg.texture.textureWidth) / 2;
            this.bomb_bg.y = this.height - this.bomb_bg.texture.textureHeight;
            this.addChild(this.bomb_bg);
            setTimeout(this.removeBombBg, 300);
        }
    };
    SoldierView.prototype.init = function () {
        //        this.skill = FightLogic.getInstance().getMovieClip("skill");
        //        this.skill.gotoAndStop(4);
        //        this.skill.x = (this.width_set - this.skill.width)/2;
        //        this.skill.y = (this.height_set - this.skill.height)/2;
        this.soldier = FightLogic.getInstance().getMovieClip("soldier");
        this.soldier.x = (this.width_set - this.soldier.width) / 2;
        this.soldier.y = (this.height_set - this.soldier.height) / 2;
        this.soldier.frameRate = 12;
        //        this.skill.play(-1);
        this.soldier.play(-1);
        //        this.addChild(this.skill);
        this.addChild(this.soldier);
    };
    SoldierView.prototype.removeBombBg = function () {
        if (this.bomb_bg != null && this.bomb_bg.parent != null) {
            this.bomb_bg.parent.removeChild(this.bomb_bg);
            this.bomb_bg = null;
        }
    };
    SoldierView.prototype.clear = function () {
        this.removeChildren();
        this.soldier.stop();
        if (this.skill != null) {
            this.skill.stop();
        }
        if (this.fly != null) {
            this.fly.stop();
        }
        this.fly = null;
        this.skill = null;
        this.soldier = null;
    };
    return SoldierView;
}(egret.Sprite));
__reflect(SoldierView.prototype, "SoldierView");
