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
var SoldierListView = (function (_super) {
    __extends(SoldierListView, _super);
    function SoldierListView(v) {
        var _this = _super.call(this) || this;
        _this.vo = v;
        _this.touchEnabled = true;
        _this.soldier_arr = [];
        if (_this.vo.derection == FightLogic.SOLDIER_LIST_TYPE_BIG) {
            var s = new SoldierView(_this.vo.gem_type);
            s.scaleX = s.scaleY = 2;
            _this.soldier_arr.push(s);
            _this.addChild(s);
        }
        else {
            for (var i = 0; i < _this.vo.data.length; i++) {
                var s = new SoldierView(_this.vo.gem_type);
                if (_this.vo.derection == FightLogic.SOLDIER_LIST_TYPE_HORIZONTAL) {
                    s.x = (s.width_set + 2) * i;
                }
                else {
                    s.y = (s.height_set + 10) * i;
                }
                _this.soldier_arr.push(s);
                _this.addChild(s);
            }
        }
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.click, _this);
        _this.once(egret.Event.REMOVED_FROM_STAGE, _this.clear, _this);
        return _this;
    }
    /***/
    /**移动到城墙变身为球型效果*/
    SoldierListView.prototype.change = function () {
        var index = 0;
        while (index < this.numChildren) {
            this.getChildAt(index).changeFly();
            index++;
        }
    };
    /**战士攻击动画效果：各种爆炸，冰封效果*/
    SoldierListView.prototype.bombEffectPlay = function (i) {
        if (this.vo.derection == FightLogic.SOLDIER_LIST_TYPE_BIG) {
            if (this.bomb_bg == null) {
                this.bomb_bg = new egret.Bitmap(RES.getRes("beattack_" + this.vo.gem_type + "_0"));
                this.bomb_bg.scaleX = this.bomb_bg.scaleY = 2;
                this.bomb_bg.x = (this.width - this.bomb_bg.texture.textureWidth) / 2;
                this.bomb_bg.y = this.height - this.bomb_bg.texture.textureHeight;
                this.addChild(this.bomb_bg);
                setTimeout(this.removeBombBg, 300);
            }
        }
        else {
            this.soldier_arr[i].bombEffectPlay();
        }
    };
    /**战士消失*/
    SoldierListView.prototype.soldierDiappear = function (i) {
        if (this.soldier_arr[i] != null) {
            this.soldier_arr[i].visible = this.vo.derection == FightLogic.SOLDIER_LIST_TYPE_BIG; //小战士消失，大战士一直存在
        }
    };
    SoldierListView.prototype.click = function () {
        FightLogic.getInstance().attack_combo_num = 1;
        FightLogic.getInstance().soldierFight(this.vo);
    };
    SoldierListView.prototype.removeBombBg = function () {
        if (this.bomb_bg != null && this.bomb_bg.parent != null) {
            this.bomb_bg.parent.removeChild(this.bomb_bg);
            this.bomb_bg = null;
        }
    };
    SoldierListView.prototype.clear = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.removeChildren();
        this.vo = null;
    };
    return SoldierListView;
}(egret.Sprite));
__reflect(SoldierListView.prototype, "SoldierListView");
