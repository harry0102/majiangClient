var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var WallVO = (function () {
    function WallVO() {
        this.id = 0;
        this.lv = 1;
        this.gold = 1;
        this.name = "城墙";
        this.max_hp = 1000;
        this.hp = 1000;
    }
    return WallVO;
}());
__reflect(WallVO.prototype, "WallVO");
