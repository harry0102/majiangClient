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
var MissionBtn = (function (_super) {
    __extends(MissionBtn, _super);
    function MissionBtn(id, width, state) {
        if (state === void 0) { state = 0; }
        var _this = _super.call(this) || this;
        _this.mission_id = id;
        _this.btn_width = width;
        _this.state = state;
        _this.anchorOffsetX = width / 2;
        _this.anchorOffsetY = width / 2;
        _this.init();
        return _this;
    }
    MissionBtn.prototype.init = function () {
        this.bg_circle = new egret.Bitmap(RES.getRes("btnbg_png"));
        this.tween_circle = new egret.Bitmap(RES.getRes("btnbg_png"));
        this.lock_bmp = new egret.Bitmap(RES.getRes("mainsuo"));
        this.bg_circle.smoothing = this.tween_circle.smoothing = this.lock_bmp.smoothing = true;
        this.bg_circle.anchorOffsetX = this.bg_circle.anchorOffsetY = this.bg_circle.width / 2;
        this.tween_circle.anchorOffsetX = this.tween_circle.anchorOffsetY = this.tween_circle.width / 2;
        this.lock_bmp.anchorOffsetX = this.lock_bmp.anchorOffsetY = this.lock_bmp.width / 2;
        this.bg_circle.x = this.bg_circle.y = this.lock_bmp.x = this.tween_circle.x = this.tween_circle.y = this.btn_width / 2;
        this.lock_bmp.y = this.btn_width / 2 + 10;
        this.addChild(this.bg_circle);
        this.addChild(this.tween_circle);
        this.addChild(this.lock_bmp);
        if (this.state == StoryLogic.MISSION_STATE_LOCK) {
            this.tween_circle.visible = false;
            this.bg_circle.scaleX = this.bg_circle.scaleY = (this.btn_width - 40) / this.bg_circle.width;
            this.lock_bmp.scaleX = this.lock_bmp.scaleY = (this.btn_width - 70) / this.lock_bmp.width;
        }
        else if (this.state == StoryLogic.MISSION_STATE_WANTED) {
            this.lock_bmp.visible = false;
            this.bg_circle.scaleX = this.bg_circle.scaleY = (this.btn_width + 30) / this.bg_circle.width;
            var s1 = (this.btn_width + 0) / this.tween_circle.width;
            var s2 = (this.btn_width - 20) / this.tween_circle.width;
            this.tween_circle.scaleX = this.tween_circle.scaleY = s1;
            if (this.tw == null) {
                this.tw = egret.Tween.get(this.tween_circle, { loop: true });
            }
            this.tw.to({ scaleX: s2, scaleY: s2 }, 800).to({ scaleX: s1, scaleY: s1 }, 800);
        }
        else {
            this.lock_bmp.visible = false;
            this.tween_circle.visible = false;
            this.bg_circle.alpha = 0;
        }
        this.once(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    MissionBtn.prototype.clickMission = function (e) {
        if (this.state != StoryLogic.MISSION_STATE_LOCK) {
            var event = new MyUIEvent(MyUIEvent.OPEN_MISSION_LIST);
            event.data = this.mission_id;
            StoryLogic.getInstance().dispatchEvent(event);
        }
    };
    MissionBtn.prototype.clear = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
        egret.Tween.removeTweens(this.tween_circle);
        this.removeChildren();
        this.bg_circle = null;
        this.tween_circle = null;
        this.lock_bmp = null;
    };
    return MissionBtn;
}(eui.Group));
__reflect(MissionBtn.prototype, "MissionBtn");
