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
var LoadingInGameUI = (function (_super) {
    __extends(LoadingInGameUI, _super);
    function LoadingInGameUI() {
        var _this = _super.call(this) || this;
        _this.bar_width_min = 50;
        _this.bar_width_max = 338;
        _this.skinName = "resource/assets/skins/LoadingSkin.exml";
        return _this;
    }
    LoadingInGameUI.prototype.childrenCreated = function () {
        this.reset();
    };
    LoadingInGameUI.prototype.reset = function () {
        this.progress_txt.text = "";
        this.progress_bar.width = this.bar_width_min;
        this.progress_bar.mask = this.progress_bar_mask;
    };
    LoadingInGameUI.prototype.setText = function (str) {
    };
    LoadingInGameUI.prototype.setProgress = function (current, total) {
        this.progress_bar.width = (current / total) * this.bar_width_max;
        this.progress_txt.text = "资源加载中..." + current + "/" + total;
    };
    LoadingInGameUI.prototype.clear = function () {
        this.reset();
    };
    return LoadingInGameUI;
}(eui.Component));
__reflect(LoadingInGameUI.prototype, "LoadingInGameUI");
