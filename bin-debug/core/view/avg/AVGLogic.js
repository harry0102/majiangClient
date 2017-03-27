var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var AVGLogic = (function () {
    function AVGLogic() {
    }
    AVGLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new AVGLogic();
        }
        return this.instance;
    };
    /**开始剧情*/
    AVGLogic.prototype.startAVG = function (mission_id) {
        FightLogic.getInstance().startFight(mission_id);
    };
    return AVGLogic;
}());
__reflect(AVGLogic.prototype, "AVGLogic");
