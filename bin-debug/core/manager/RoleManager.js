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
var RoleManager = (function (_super) {
    __extends(RoleManager, _super);
    function RoleManager() {
        var _this = _super.call(this) || this;
        _this.attack = 30;
        return _this;
    }
    RoleManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new RoleManager();
        }
        return this.instance;
    };
    return RoleManager;
}(egret.EventDispatcher));
__reflect(RoleManager.prototype, "RoleManager");
