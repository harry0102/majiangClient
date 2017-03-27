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
var ChapterUI = (function (_super) {
    __extends(ChapterUI, _super);
    function ChapterUI(id) {
        var _this = _super.call(this) || this;
        _this.chapter_id = id;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    ChapterUI.prototype.onStage = function () {
        this.mission_data = StoryLogic.getInstance().chapter_data[this.chapter_id - 1];
        this.mission_num = this.mission_data.length / 3 - 1;
        this.current_mission = this.chapter_id == StoryLogic.getInstance().current_chapterID ?
            Math.ceil(StoryLogic.getInstance().current_missionID / StoryLogic.MISSION_LIST_NUM) - 1 : 999; //如果是以前的章节，全部已通关
        this.mission_btn_arr = [];
        var img = RES.getRes("story_" + this.chapter_id + "_jpg");
        this.addChild(new egret.Bitmap(img));
        for (var i = 0; i < this.mission_num; i++) {
            /**状态 0锁定 1开启 2通关*/
            var state = i < this.current_mission ? StoryLogic.MISSION_STATE_FINISH :
                (i == this.current_mission ? StoryLogic.MISSION_STATE_WANTED : StoryLogic.MISSION_STATE_LOCK);
            var mission = new MissionBtn(i, this.mission_data[i * 3 + 2], state);
            mission.x = this.mission_data[i * 3];
            mission.y = this.mission_data[i * 3 + 1];
            this.addChild(mission);
            this.mission_btn_arr.push(mission);
        }
        this.more_btn = new BaseButton("mainmoregame_btn");
        this.more_btn.anchorOffsetX = this.more_btn.bg.width / 2;
        this.more_btn.anchorOffsetY = this.more_btn.bg.height / 2;
        this.more_btn.x = this.mission_data[this.mission_num * 3];
        this.more_btn.y = this.mission_data[this.mission_num * 3 + 1];
        this.addChild(this.more_btn);
        this.more_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMoreGame, this);
    };
    ChapterUI.prototype.clickMoreGame = function (e) {
        SoundManager.getInstance().playEffectSound();
        UIManager.getInstance().popMessage(StringConst.String_00002, UIConst.POP_MESSAGE_TYPE_WINDOW);
    };
    ChapterUI.prototype.clear = function () {
        this.more_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMoreGame, this);
        this.removeChildren();
        this.more_btn = null;
        this.mission_btn_arr = null;
        this.mission_data = null;
    };
    return ChapterUI;
}(eui.Group));
__reflect(ChapterUI.prototype, "ChapterUI");
