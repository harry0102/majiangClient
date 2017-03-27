var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GlobalData = (function () {
    function GlobalData() {
    }
    return GlobalData;
}());
GlobalData.GameStage_width = 640;
GlobalData.GameStage_height = 960;
GlobalData.version = 201703241545;
__reflect(GlobalData.prototype, "GlobalData");
