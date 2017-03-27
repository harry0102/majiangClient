var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var TweenManager = (function () {
    function TweenManager() {
        this.tween_ui_time = 500;
    }
    TweenManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new TweenManager();
        }
        return this.instance;
    };
    /**对ui进行缓动进入*/
    TweenManager.prototype.uiAppearTween = function (ui, type, extra, callback, thisObj) {
        var tw = egret.Tween.get(ui);
        var w = GlobalData.GameStage_width;
        var h = GlobalData.GameStage_height;
        var xx = 0; //目标x
        var yy = 0; //目标y
        //先根据类型初始化状态 
        if (type == TweenManager.TWEEN_UI_MOVE) {
            ui.anchorOffsetX = w / 2;
            ui.anchorOffsetY = h / 2;
            if (extra == 0) {
                ui.x = -w / 2;
                ui.y = h / 2;
            }
            else if (extra == 1) {
                ui.x = w / 2;
                ui.y = -h / 2;
            }
            else if (extra == 2) {
                ui.x = w * 3 / 2;
                ui.y = h / 2;
            }
            else {
                ui.x = w / 2;
                ui.y = h * 3 / 2;
            }
            if (callback == null) {
                tw.to({ x: w / 2, y: h / 2 }, this.tween_ui_time);
            }
            else {
                tw.to({ x: w / 2, y: h / 2 }, this.tween_ui_time).call(callback, thisObj);
            }
        }
        else if (type == TweenManager.TWEEN_UI_SCALE) {
            if (extra == 0) {
                //中间坐标不用变
                ui.anchorOffsetX = w / 2;
                ui.anchorOffsetY = h / 2;
                ui.x = w / 2;
                ui.y = h / 2;
                xx = w / 2;
                yy = h / 2;
            }
            else if (extra == 1) {
                ui.anchorOffsetX = w;
                ui.anchorOffsetY = 0;
                ui.x = w * 2;
                ui.y = -h;
                xx = w;
                yy = 0;
            }
            else if (extra == 2) {
                ui.anchorOffsetX = w;
                ui.anchorOffsetY = h;
                ui.x = w * 2;
                ui.y = h * 2;
                xx = w;
                yy = h;
            }
            else if (extra == 3) {
                ui.anchorOffsetX = 0;
                ui.anchorOffsetY = h;
                ui.x = -w;
                ui.y = h * 2;
                xx = 0;
                yy = h;
            }
            else {
                ui.anchorOffsetX = 0;
                ui.anchorOffsetY = 0;
                ui.x = -w;
                ui.y = -h;
                xx = 0;
                yy = 0;
            }
            ui.scaleX = ui.scaleY = 0;
            if (callback == null) {
                tw.to({ x: xx, y: yy, scaleX: 1, scaleY: 1 }, this.tween_ui_time);
            }
            else {
                tw.to({ x: xx, y: yy, scaleX: 1, scaleY: 1 }, this.tween_ui_time).call(callback, thisObj);
            }
        }
        else if (type == TweenManager.TWEEN_UI_SCALE_ROTATION) {
            ui.alpha = 0;
            if (callback == null) {
                tw.to({ alpha: 1 }, this.tween_ui_time);
            }
            else {
                tw.to({ alpha: 1 }, this.tween_ui_time).call(callback, thisObj);
            }
        }
    };
    /**对一级UI的缓动退出*/
    TweenManager.prototype.uiDisappearTween = function (ui, type, extra, callback, thisObj) {
        var tw = egret.Tween.get(ui);
        var w = GlobalData.GameStage_width;
        var h = GlobalData.GameStage_height;
        var xx = 0;
        var yy = 0;
        //所有要移出前 先把瞄点和坐标重置一下
        if (type == TweenManager.TWEEN_UI_MOVE) {
            ui.anchorOffsetX = w / 2;
            ui.anchorOffsetY = h / 2;
            ui.x = w / 2;
            ui.y = h / 2;
            if (extra == 0) {
                xx = w * 3 / 2;
                yy = h / 2;
            }
            else if (extra == 1) {
                xx = w / 2;
                yy = h * 3 / 2;
            }
            else if (extra == 2) {
                xx = -w / 2;
                yy = h / 2;
            }
            else {
                xx = w / 2;
                yy = -h / 2;
            }
            if (callback == null) {
                tw.to({ x: xx, y: yy }, this.tween_ui_time);
            }
            else {
                tw.to({ x: xx, y: yy }, this.tween_ui_time).call(callback, thisObj);
            }
        }
        else if (type == TweenManager.TWEEN_UI_SCALE) {
            if (callback == null) {
                tw.to({ alpha: 0 }, this.tween_ui_time);
            }
            else {
                tw.to({ alpha: 0 }, this.tween_ui_time).call(callback, thisObj);
            }
        }
        else if (type == TweenManager.TWEEN_UI_SCALE_ROTATION) {
            if (extra == 0) {
                xx = w;
                yy = -h;
            }
            else if (extra == 1) {
                xx = w;
                yy = h;
            }
            else if (extra == 2) {
                xx = -w;
                yy = h;
            }
            else {
                xx = -w;
                yy = -h;
            }
            if (callback == null) {
                tw.to({ x: xx, y: yy, scaleX: 0.01, scaleY: 0.01, rotation: 720 }, this.tween_ui_time);
            }
            else {
                tw.to({ x: xx, y: yy, scaleX: 0.01, scaleY: 0.01, rotation: 720 }, this.tween_ui_time).call(callback, thisObj);
            }
        }
    };
    /**二级UI的缓动退出，与一级UId差别，方向相反。注意：callback不能为空，必须在callback内删除ui*/
    TweenManager.prototype.uiSecondDisappearTween = function (ui, type, extra, callback, thisObj) {
        var tw = egret.Tween.get(ui);
        var w = GlobalData.GameStage_width;
        var h = GlobalData.GameStage_height;
        var xx = 0;
        var yy = 0;
        //所有要移出前 先把瞄点和坐标重置一下
        if (type == TweenManager.TWEEN_UI_MOVE) {
            ui.anchorOffsetX = w / 2;
            ui.anchorOffsetY = h / 2;
            ui.x = w / 2;
            ui.y = h / 2;
            if (extra == 0) {
                xx = -w / 2;
                yy = h / 2;
            }
            else if (extra == 1) {
                xx = w / 2;
                yy = -h / 2;
            }
            else if (extra == 2) {
                xx = w * 3 / 2;
                yy = h / 2;
            }
            else {
                xx = w / 2;
                yy = h * 3 / 2;
            }
            if (callback == null) {
                tw.to({ x: xx, y: yy }, this.tween_ui_time);
            }
            else {
                tw.to({ x: xx, y: yy }, this.tween_ui_time).call(callback, thisObj);
            }
        }
        else if (type == TweenManager.TWEEN_UI_SCALE) {
            //由于进入的时候设置好了，退出时原路返回即可
            tw.to({ scaleX: 0, scaleY: 0 }, this.tween_ui_time).call(callback, thisObj);
        }
        else if (type == TweenManager.TWEEN_UI_SCALE_ROTATION) {
            if (extra == 0) {
                xx = w;
                yy = -h;
            }
            else if (extra == 1) {
                xx = w;
                yy = h;
            }
            else if (extra == 2) {
                xx = -w;
                yy = h;
            }
            else {
                xx = -w;
                yy = -h;
            }
            tw.to({ x: xx, y: yy, scaleX: 0.01, scaleY: 0.01, rotation: 720 }, this.tween_ui_time).call(callback, thisObj);
        }
    };
    return TweenManager;
}());
/**随机取 非0的任意一种*/
TweenManager.TWEEN_UI_RANDOM = -1;
TweenManager.TWEEN_UI_NONE = 0;
TweenManager.TWEEN_UI_MOVE = 1;
TweenManager.TWEEN_UI_SCALE = 2;
TweenManager.TWEEN_UI_SCALE_ROTATION = 3;
__reflect(TweenManager.prototype, "TweenManager");
