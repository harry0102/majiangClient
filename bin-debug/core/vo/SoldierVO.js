var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var SoldierVO = (function () {
    function SoldierVO() {
        FightLogic.getInstance().soldier_max_id++;
        this.id = FightLogic.getInstance().soldier_max_id;
    }
    return SoldierVO;
}());
__reflect(SoldierVO.prototype, "SoldierVO");
