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
var StoryLogic = (function (_super) {
    __extends(StoryLogic, _super);
    function StoryLogic() {
        var _this = _super.call(this) || this;
        /**章节中的关卡数据 x,y,width,最后一个是更多游戏按钮的位置*/
        _this.chapter_data = [[493, 352, 220, 237, 448, 200, 451, 613, 220, 177, 642, 0],
            [493, 352, 220, 237, 448, 200, 451, 613, 220, 177, 642, 0],
            [493, 352, 220, 237, 448, 200, 451, 613, 220, 177, 642, 0],
            [493, 352, 220, 237, 448, 200, 451, 613, 220, 177, 642, 0]];
        return _this;
    }
    StoryLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new StoryLogic();
        }
        return this.instance;
    };
    StoryLogic.prototype.openStory = function () {
        //获取网络数据，得到关卡信息
        this.current_chapterID = 3;
        this.current_missionID = 18;
        this.openUI();
    };
    StoryLogic.prototype.openUI = function () {
        UIManager.getInstance().openFirstUI(UIManager.CLASS_UI_INDEX_STORY, TweenManager.TWEEN_UI_MOVE);
    };
    return StoryLogic;
}(egret.EventDispatcher));
StoryLogic.MISSION_STATE_LOCK = 0;
StoryLogic.MISSION_STATE_WANTED = 1;
StoryLogic.MISSION_STATE_FINISH = 2;
StoryLogic.MISSION_ITEM_STATE_LOCK = 0;
StoryLogic.MISSION_ITEM_STATE_WANTED = 1;
StoryLogic.MISSION_ITEM_STATE_FINISH = 2;
/**没一个大关卡中小关卡的数量*/
StoryLogic.MISSION_LIST_NUM = 15;
__reflect(StoryLogic.prototype, "StoryLogic");
