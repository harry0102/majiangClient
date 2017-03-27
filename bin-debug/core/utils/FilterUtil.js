var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var FilterUtil = (function () {
    function FilterUtil() {
    }
    /**灰色滤镜*/
    FilterUtil.getGrayFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    };
    /**模糊滤镜*/
    FilterUtil.getBlurFilter = function () {
        var blurFliter = new egret.BlurFilter(1, 1);
        return [blurFliter];
    };
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
