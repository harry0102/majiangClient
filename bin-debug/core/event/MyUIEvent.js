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
var MyUIEvent = (function (_super) {
    __extends(MyUIEvent, _super);
    function MyUIEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    return MyUIEvent;
}(egret.Event));
/**登录*/
MyUIEvent.LOGIN_IN = "LOGIN_IN";
/**切换章节*/
MyUIEvent.CHANGE_CHAPTER = "CHANGE_CHAPTER";
/**打开关卡*/
MyUIEvent.OPEN_MISSION_LIST = "OPEN_MISSION_LIST";
/**更新小关卡界面*/
MyUIEvent.UPDATE_MISSION_ITEM = "UPDATE_MISSION_ITEM";
/**关闭菜单界面*/
MyUIEvent.CLOSE_MENU = "CLOSE_MENU";
/**战斗界面——关闭界面*/
MyUIEvent.FIGHT_CLOSEUI = "FIGHT_CLOSEUI";
/**战斗界面--宝石操作*/
MyUIEvent.FIGHT_GEM_OPERATOR = "FIGHT_GEM_OPERATOR";
/**战斗界面--战士攻击*/
MyUIEvent.FIGHT_SOLDIER_ATTACK = "FIGHT_SOLDIER_ATTACK";
/**战斗界面--合成战士*/
MyUIEvent.FIGHT_SOLDIER_COMPOSE = "FIGHT_SOLDIER_COMPOSE";
/**战斗界面--攻击后宝石补全*/
MyUIEvent.FIGHT_GEM_COMPLEMENT = "FIGHT_GEM_COMPLEMENT";
/**战斗界面--连击：战士合成+自动攻击*/
MyUIEvent.FIGHT_SOLDIER_COMBO = "FIGHT_SOLDIER_COMBO";
/**加载资源：章节资源*/
MyUIEvent.LOAD_STORY_CHAPTER = "LOAD_STORY_CHAPTER";
__reflect(MyUIEvent.prototype, "MyUIEvent");
