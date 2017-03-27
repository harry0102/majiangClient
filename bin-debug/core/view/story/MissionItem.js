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
var MissionItem = (function (_super) {
    __extends(MissionItem, _super);
    /**
     * @param id 显示的关卡数字
     * @param star 星数 如果锁定状态，则不显示，待打状态为0星
     * @param state 状态  0锁定 1代打 2通关*/
    function MissionItem(id, star, state) {
        var _this = _super.call(this) || this;
        _this.mission_id = id;
        _this.src_str = "listli_bg" + (Math.ceil(id / 15) - 1) + (state == StoryLogic.MISSION_ITEM_STATE_LOCK ? "n" : "");
        var texture = RES.getRes(_this.src_str);
        _this.bg = new eui.Image(texture);
        _this.addChild(_this.bg);
        _this.star = new eui.Group();
        _this.star.horizontalCenter = 0;
        _this.star.top = texture.textureHeight + 18;
        _this.addChild(_this.star);
        _this.width_set = texture.textureWidth;
        _this.height_set = texture.textureHeight + 40;
        _this.bg_height = texture.textureHeight;
        _this.changeState(state, star);
        return _this;
    }
    MissionItem.prototype.changeState = function (s, star_num) {
        this.state = s;
        if (s == StoryLogic.MISSION_ITEM_STATE_LOCK) {
            var t1 = RES.getRes("mainsuo");
            this.lock = new eui.Image(t1);
            this.lock.x = (this.width_set - t1.textureWidth) / 2;
            this.lock.y = (this.bg_height - t1.textureHeight) / 2;
            this.addChild(this.lock);
        }
        else if (s == StoryLogic.MISSION_ITEM_STATE_WANTED) {
            this.addNumImage();
            this.changeStar(0);
        }
        else {
            this.addNumImage();
            this.changeStar(star_num);
        }
    };
    MissionItem.prototype.addNumImage = function () {
        if (this.mission_id_img != null && this.mission_id_img.parent != null) {
            return;
        }
        //        var mission_id_img: egret.Sprite = ViewUtil.getArtNum("wnum_",id.toString());
        //        mission_id_img.x = (texture.textureWidth - mission_id_img.width)/2;
        //        mission_id_img.y = (texture.textureHeight - mission_id_img.height)/2;
        //        this.addChild(mission_id_img);
        var mission_id_img = new eui.Label();
        mission_id_img.text = this.mission_id.toString();
        mission_id_img.x = (this.width_set - mission_id_img.width) / 2;
        mission_id_img.y = (this.bg_height - mission_id_img.height) / 2;
        this.addChild(mission_id_img);
    };
    MissionItem.prototype.changeStar = function (n) {
        this.star.removeChildren();
        for (var i = 0; i < 3; i++) {
            var t = RES.getRes(i < n ? "listli_starl" : "listli_stara");
            var s = new eui.Image(t);
            s.anchorOffsetY = t.textureHeight / 2;
            //            s.x = (t.textureWidth + 2) * i;
            s.x = 35 * i;
            this.star.addChild(s);
        }
    };
    MissionItem.prototype.clear = function () {
        this.star.removeChildren();
        this.bg = null;
        this.star = null;
        this.lock = null;
        this.mission_id_img = null;
    };
    return MissionItem;
}(eui.Group));
__reflect(MissionItem.prototype, "MissionItem");
