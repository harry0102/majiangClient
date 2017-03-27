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
var BaseSecondUI = (function (_super) {
    __extends(BaseSecondUI, _super);
    function BaseSecondUI() {
        var _this = _super.call(this) || this;
        //动画需要
        _this.anchorOffsetX = GlobalData.GameStage_width / 2;
        _this.anchorOffsetY = GlobalData.GameStage_height / 2;
        return _this;
    }
    return BaseSecondUI;
}(eui.Component));
__reflect(BaseSecondUI.prototype, "BaseSecondUI");
