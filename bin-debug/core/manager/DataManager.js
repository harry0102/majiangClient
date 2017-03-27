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
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        return _super.call(this) || this;
    }
    DataManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new DataManager();
        }
        return this.instance;
    };
    DataManager.prototype.initJsonData = function () {
        RES.getResByUrl("Definfos_json", this.DefinfosCompelte, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl("WallData_json", this.WallDataCompelte, this, RES.ResourceItem.TYPE_JSON);
    };
    DataManager.prototype.getEnemyVOByID = function (id) {
        var vo = new EnemyVO();
        var i = Math.floor(Math.random() * this.enemy_arr.length); //临时随机，待服务器发正确id
        var o = this.enemy_arr[i];
        vo.id = o['id'];
        vo.lv = parseInt(o['lv']);
        vo.name = o['name'];
        vo.hp = vo.energy = parseInt(o['energy']);
        vo.type = parseInt(o['type']);
        vo.img = parseInt(o['img']);
        vo.attacktype = parseInt(o['attacktype']);
        vo.dropjb = parseInt(o['dropjb']);
        vo.exp = parseInt(o['exp']);
        vo.speed = parseInt(o['speed']);
        vo.attack = parseInt(o['attack']);
        return vo;
    };
    DataManager.prototype.getWallVOByLevel = function (lv) {
        var vo = new WallVO();
        var o = this.wall_arr[lv - 1];
        vo.id = lv - 1;
        vo.lv = lv;
        vo.gold = o['gold'];
        vo.name = o['name'];
        vo.max_hp = o['hp'];
        return vo;
    };
    DataManager.prototype.getJsonData = function (src) {
        switch (src) {
            case "Definfos_json":
                return this.enemy_arr;
            case "WallData_json":
                return this.wall_arr;
        }
        return null;
    };
    DataManager.prototype.DefinfosCompelte = function (e) {
        this.enemy_arr = e;
    };
    DataManager.prototype.WallDataCompelte = function (e) {
        this.wall_arr = e;
    };
    return DataManager;
}(egret.EventDispatcher));
__reflect(DataManager.prototype, "DataManager");
