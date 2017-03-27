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
var PreLoadUI = (function (_super) {
    __extends(PreLoadUI, _super);
    function PreLoadUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    PreLoadUI.prototype.createView = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("logo_png");
        this.addChild(this.bg);
        ViewUtil.setCenter(this.bg);
    };
    return PreLoadUI;
}(egret.Sprite));
__reflect(PreLoadUI.prototype, "PreLoadUI");
