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
var LoadManager = (function (_super) {
    __extends(LoadManager, _super);
    function LoadManager() {
        return _super.call(this) || this;
    }
    LoadManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new LoadManager();
        }
        return this.instance;
    };
    LoadManager.prototype.startLoad = function (groupname, keys, event_name, override) {
        if (override === void 0) { override = false; }
        if (this.loading_view == null) {
            this.loading_view = new LoadingInGameUI();
        }
        UIManager.getInstance().loadingCon.addChild(this.loading_view);
        this.group_name = groupname;
        this.event_name = event_name;
        RES.createGroup(groupname, keys, override);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup(groupname);
    };
    LoadManager.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == this.group_name) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.dispatchComplete();
        }
        if (this.loading_view != null && this.loading_view.parent != null) {
            this.loading_view.clear();
            this.loading_view.parent.removeChild(this.loading_view);
        }
    };
    LoadManager.prototype.dispatchComplete = function () {
        var event = new MyUIEvent(this.event_name);
        event.data = { groupname: this.group_name };
        this.dispatchEvent(event);
    };
    LoadManager.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    LoadManager.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    LoadManager.prototype.onResourceProgress = function (event) {
        if (event.groupName == this.group_name && this.loading_view != null) {
            this.loading_view.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return LoadManager;
}(egret.EventDispatcher));
__reflect(LoadManager.prototype, "LoadManager");
