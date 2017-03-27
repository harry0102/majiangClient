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
var ChapterSelect = (function (_super) {
    __extends(ChapterSelect, _super);
    function ChapterSelect() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChapterSelectSkin";
        _this.horizontalCenter = 0;
        _this.top = 60;
        _this.init();
        return _this;
    }
    ChapterSelect.prototype.init = function () {
        this.chapter_arr = [this.chapter1, this.chapter2, this.chapter3, this.chapter4];
        this.chapter1.filters = this.chapter2.filters = FilterUtil.getGrayFilter();
    };
    ChapterSelect.prototype.setSelect = function (i) {
        if (i > 1) {
        }
    };
    return ChapterSelect;
}(eui.Component));
__reflect(ChapterSelect.prototype, "ChapterSelect");
