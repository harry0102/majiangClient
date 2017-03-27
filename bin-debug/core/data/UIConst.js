var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var UIConst = (function () {
    function UIConst() {
    }
    return UIConst;
}());
UIConst.POP_MESSAGE_TYPE_TIPS = 0;
UIConst.POP_MESSAGE_TYPE_WINDOW = 1;
UIConst.POP_MESSAGE_TYPE_WINDOW_CANCEL = 2;
UIConst.POP_MESSAGE_TYPE_WINDOW_NOPOPAGAIN = 3;
__reflect(UIConst.prototype, "UIConst");
