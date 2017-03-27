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
var StoryUI = (function (_super) {
    __extends(StoryUI, _super);
    function StoryUI() {
        var _this = _super.call(this) || this;
        _this.chapter_id = -1; //当前章节id
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onStage, _this);
        return _this;
    }
    StoryUI.prototype.onStage = function (e) {
        this.new_chapter_id = StoryLogic.getInstance().current_chapterID;
        this.chapter_select = new ChapterSelectUI();
        this.chapter_select.y = 75;
        this.addChild(this.chapter_select);
        this.menu_btn = new BaseButton("menubtnbg_png");
        var bmp = new egret.Bitmap(RES.getRes("caidan_png"));
        bmp.x = (this.menu_btn.bg.width - bmp.width) / 2;
        bmp.y = 238;
        this.menu_btn.bg.addChild(bmp);
        this.menu_btn.anchorOffsetX = this.menu_btn.bg.width / 2;
        this.menu_btn.x = GlobalData.GameStage_width / 2;
        this.menu_btn.y = GlobalData.GameStage_height - this.menu_btn.bg.height;
        this.addChild(this.menu_btn);
        this.menu_btn.startTween();
        this.initEvent();
        this.loadChapter();
        SoundManager.getInstance().playBgSound(SoundManager.getInstance().sound_switch);
    };
    StoryUI.prototype.loadChapter = function () {
        //组装需要加载的资源
        var groupname = "story_" + this.new_chapter_id;
        var keys = ["story_" + this.new_chapter_id + "_jpg"];
        LoadManager.getInstance().startLoad("story" + this.new_chapter_id, keys, MyUIEvent.LOAD_STORY_CHAPTER);
    };
    StoryUI.prototype.initChapter = function (e) {
        if (e.data.groupname != "story" + this.new_chapter_id) {
            return;
        }
        this.new_chapter_ui = new ChapterUI(this.new_chapter_id);
        if (this.chapter_ui == null) {
            this.chapter_ui = this.new_chapter_ui;
            this.chapter_id = this.new_chapter_id;
            this.addChildAt(this.chapter_ui, 0);
            this.new_chapter_ui = null;
        }
        else {
            this.chapter_select.setTween(true);
            this.addChildAt(this.new_chapter_ui, 0);
            var tw1 = egret.Tween.get(this.chapter_ui);
            var tw2 = egret.Tween.get(this.new_chapter_ui);
            var goX;
            if (this.new_chapter_id < this.chapter_id) {
                this.new_chapter_ui.x = -GlobalData.GameStage_width;
                goX = GlobalData.GameStage_width;
            }
            else {
                this.new_chapter_ui.x = GlobalData.GameStage_width;
                goX = -GlobalData.GameStage_width;
            }
            tw1.to({ x: goX }, 500);
            tw2.to({ x: 0 }, 500).call(this.tweenFinish, this);
        }
    };
    StoryUI.prototype.tweenFinish = function () {
        if (this.chapter_ui != null && this.chapter_ui.parent != null) {
            this.chapter_ui.parent.removeChild(this.chapter_ui);
            this.chapter_ui = null;
        }
        this.chapter_ui = this.new_chapter_ui;
        this.chapter_id = this.new_chapter_id;
        this.new_chapter_ui = null;
        this.chapter_select.setTween(false);
    };
    StoryUI.prototype.initEvent = function () {
        this.menu_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMenu, this);
        StoryLogic.getInstance().addEventListener(MyUIEvent.OPEN_MISSION_LIST, this.openMission, this);
        StoryLogic.getInstance().addEventListener(MyUIEvent.CHANGE_CHAPTER, this.changeChapter, this);
        StoryLogic.getInstance().addEventListener(MyUIEvent.CLOSE_MENU, this.closeMenu, this);
        LoadManager.getInstance().addEventListener(MyUIEvent.LOAD_STORY_CHAPTER, this.initChapter, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    StoryUI.prototype.openMission = function (e) {
        SoundManager.getInstance().playEffectSound();
        var ui = new MissionUI(this.chapter_id, e.data);
        this.addChild(ui);
    };
    StoryUI.prototype.changeChapter = function (e) {
        SoundManager.getInstance().playEffectSound();
        this.new_chapter_id = e.data.id;
        this.loadChapter();
    };
    StoryUI.prototype.clickMenu = function (e) {
        SoundManager.getInstance().playEffectSound();
        if (this.is_tween) {
            return;
        }
        this.is_tween = true;
        var tw = egret.Tween.get(this.menu_btn);
        tw.to({ x: -GlobalData.GameStage_width / 2 }, 300).call(this.openMenu, this);
    };
    StoryUI.prototype.openMenu = function () {
        this.is_tween = false;
        if (this.menu == null) {
            this.menu = new MenuUI();
        }
        this.addChild(this.menu);
        this.menu.x = -GlobalData.GameStage_width / 2;
        var tw = egret.Tween.get(this.menu);
        tw.to({ x: 0 }, 300);
    };
    StoryUI.prototype.closeMenu = function () {
        this.menu = null;
        this.is_tween = true;
        var tw = egret.Tween.get(this.menu_btn);
        tw.to({ x: GlobalData.GameStage_width / 2 }, 300).call(this.menuBtnAppear, this);
    };
    StoryUI.prototype.menuBtnAppear = function () {
        this.is_tween = false;
    };
    StoryUI.prototype.clear = function () {
        this.menu_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMenu, this);
        StoryLogic.getInstance().removeEventListener(MyUIEvent.OPEN_MISSION_LIST, this.openMission, this);
        StoryLogic.getInstance().removeEventListener(MyUIEvent.CHANGE_CHAPTER, this.changeChapter, this);
        StoryLogic.getInstance().removeEventListener(MyUIEvent.CLOSE_MENU, this.closeMenu, this);
        LoadManager.getInstance().removeEventListener(MyUIEvent.LOAD_STORY_CHAPTER, this.initChapter, this);
        egret.Tween.removeAllTweens();
        this.removeChildren();
        this.chapter_select = null;
        this.menu_btn.clear();
        this.menu_btn = null;
        this.menu = null;
    };
    return StoryUI;
}(BaseFirstUI));
__reflect(StoryUI.prototype, "StoryUI");
