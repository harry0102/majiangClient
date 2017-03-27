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
var MissionUI = (function (_super) {
    __extends(MissionUI, _super);
    /**设置关卡
     * @param chapterID 当前点击的章节id 1开始
     * @param id 当前点击的大关卡 0开始 */
    function MissionUI(chapterID, index) {
        var _this = _super.call(this) || this;
        _this.charter_id = chapterID;
        _this.mission_index = index;
        _this.skinName = "resource/assets/skins/MissionListSkin.exml";
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    MissionUI.prototype.onStage = function (e) {
        this.newest_mission_id = StoryLogic.getInstance().current_missionID;
        var shape = ViewUtil.getShape(GlobalData.GameStage_width, GlobalData.GameStage_height, 0x000000, 0.7);
        this.addChildAt(shape, 0);
        var texture = RES.getRes("listgk" + this.mission_index);
        this.mission_id_img = new eui.Image(texture);
        this.mission_id_img.anchorOffsetY = texture.textureHeight / 2;
        this.mission_id_img.x = 345;
        this.mission_id_img.y = 100 + this.title_bg.height / 2;
        this.addChild(this.mission_id_img);
        this.mission_list_con = new eui.Group();
        this.mission_list_con.horizontalCenter = 0;
        this.mission_list_con.top = 200;
        this.addChild(this.mission_list_con);
        this.mission_arr = [];
        for (var i = 0; i < StoryLogic.MISSION_LIST_NUM; i++) {
            var n = this.mission_index * StoryLogic.MISSION_LIST_NUM + (i + 1);
            var star = i % 4;
            var state = this.getState(i);
            var item = new MissionItem(n, star, state);
            item.name = n.toString();
            item.x = (item.width_set + 60) * (i % 3);
            item.y = (item.height_set + 10) * Math.floor(i / 3);
            if (state == StoryLogic.MISSION_ITEM_STATE_WANTED) {
                this.current_mission_item = item;
            }
            this.mission_list_con.addChild(item);
            this.mission_arr.push(item);
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
        }
        if (this.current_mission_item != null) {
            this.addCurrentHand();
        }
        this.initEvent();
    };
    MissionUI.prototype.addCurrentHand = function () {
        var ww;
        if (this.finger == null) {
            var texture = RES.getRes("finger_png");
            this.finger = new eui.Image(texture);
            this.finger.anchorOffsetX = texture.textureWidth / 2;
            this.finger.anchorOffsetY = texture.textureHeight / 2;
            this.finger.scaleX = this.finger.scaleY = 0.7;
            this.finger.smoothing = true;
        }
        //eui的localToGlobal好坑啊 全靠凑啊
        this.finger.x = this.current_mission_item.x + this.current_mission_item.width_set + 100;
        this.finger.y = this.current_mission_item.y + this.current_mission_item.height_set - 34 + this.mission_list_con.top;
        this.addChild(this.finger);
        this.finger.touchEnabled = false;
        var tw = egret.Tween.get(this.finger, { loop: true });
        tw.to({ scaleX: 0.5, scaleY: 0.5 }, 400).to({ scaleX: 0.7, scaleY: 0.7 }, 400);
    };
    /**获取小关卡的状态  i 小关卡的索引 0-14*/
    MissionUI.prototype.getState = function (i) {
        if (this.charter_id < StoryLogic.getInstance().current_chapterID) {
            return StoryLogic.MISSION_ITEM_STATE_FINISH;
        }
        else {
            var index = Math.floor((this.newest_mission_id - 1) / StoryLogic.MISSION_LIST_NUM); //当前的大关卡
            if (this.mission_index < index) {
                return StoryLogic.MISSION_ITEM_STATE_FINISH;
            }
            else if (this.mission_index == index) {
                if (i < (this.newest_mission_id - 1) % 15) {
                    return StoryLogic.MISSION_ITEM_STATE_FINISH;
                }
                else if (i == (this.newest_mission_id - 1) % 15) {
                    return StoryLogic.MISSION_ITEM_STATE_WANTED;
                }
                else {
                    return StoryLogic.MISSION_ITEM_STATE_LOCK;
                }
            }
            else {
                return StoryLogic.MISSION_ITEM_STATE_LOCK;
            }
        }
    };
    MissionUI.prototype.initEvent = function () {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        StoryLogic.getInstance().addEventListener(MyUIEvent.UPDATE_MISSION_ITEM, this.updateMissionItem, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    MissionUI.prototype.updateMissionItem = function (e) {
        if (this.click_mission_item != null) {
            this.click_mission_item.changeState(StoryLogic.MISSION_ITEM_STATE_WANTED, 3);
        }
        //	    if(this.current_mission_item != null && e.data.id == this.current_mission_item.mission_id)
        //        {
        //            this.current_mission_item.changeState(StoryLogic.MISSION_ITEM_STATE_FINISH,0);
        //        }
    };
    MissionUI.prototype.clickBack = function (e) {
        SoundManager.getInstance().playEffectSound();
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    MissionUI.prototype.clickItem = function (e) {
        SoundManager.getInstance().playEffectSound();
        this.click_mission_item = e.currentTarget;
        var n = parseInt(e.currentTarget.name);
        if (e.currentTarget.state == StoryLogic.MISSION_ITEM_STATE_LOCK) {
            console.log("点击第" + this.charter_id + "章节 第" + (this.mission_index + 1) + "关卡 第" + n + "小关此关卡还没开通");
        }
        else {
            console.log("点击第" + this.charter_id + "章节 第" + (this.mission_index + 1) + "关卡 第" + n + "小关");
            UIManager.getInstance().startFight(this.charter_id * 100 + n);
        }
    };
    MissionUI.prototype.clear = function (e) {
        this.removeChildren();
        this.back_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        StoryLogic.getInstance().removeEventListener(MyUIEvent.UPDATE_MISSION_ITEM, this.updateMissionItem, this);
        for (var i; i < this.mission_arr.length; i++) {
            this.mission_arr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
        }
        this.back_btn = null;
        this.mission_id_img = null;
        this.title_bg = null;
        this.mission_arr = null;
    };
    return MissionUI;
}(eui.Component));
__reflect(MissionUI.prototype, "MissionUI");
