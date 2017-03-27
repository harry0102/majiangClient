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
var StartButton = (function (_super) {
    __extends(StartButton, _super);
    function StartButton(src_str) {
        return _super.call(this, src_str) || this;
    }
    StartButton.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.right = 343 + 20;
        this.bottom = 147;
    };
    return StartButton;
}(BaseButton));
__reflect(StartButton.prototype, "StartButton");
