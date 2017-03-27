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
var WallView = (function (_super) {
    __extends(WallView, _super);
    function WallView(i, v) {
        var _this = _super.call(this) || this;
        _this.width_set = 100;
        _this.height_set = 100;
        _this.index = i;
        _this.vo = v;
        _this.level_src = Math.floor(v.lv / 5) + 1;
        _this.updateHp(_this.vo.max_hp);
        return _this;
    }
    WallView.prototype.updateHp = function (n) {
        this.vo.hp = n;
        var s = 4 - Math.ceil(n * 4 / this.vo.max_hp);
        s = s < 1 ? 1 : s;
        var src = "wall_wall" + this.level_src + "_" + s;
        if (this.bg == null || this.bg_src != src) {
            this.bg_src = src;
            this.changeBg();
        }
    };
    WallView.prototype.damageDeal = function (d) {
        this.vo.hp -= d;
        if (this.vo.hp <= 0) {
            this.vo.hp = 0;
        }
        this.updateHp(this.vo.hp);
    };
    WallView.prototype.changeBg = function () {
        if (this.bg != null && this.bg.parent != null) {
            this.bg.parent.removeChild(this.bg);
        }
        this.bg = new egret.Bitmap(RES.getRes(this.bg_src));
        this.bg.scaleX = this.bg.scaleY = 2;
        this.bg.x = (this.width_set - this.bg.texture.textureWidth * 2) / 2;
        this.bg.y = this.height_set - this.bg.texture.textureHeight * 2;
        this.addChild(this.bg);
    };
    return WallView;
}(egret.Sprite));
__reflect(WallView.prototype, "WallView");
