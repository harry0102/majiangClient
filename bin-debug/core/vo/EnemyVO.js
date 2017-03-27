var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var EnemyVO = (function () {
    function EnemyVO() {
        /**攻击范围 */
        this.attack_range = 10;
        /**自身状态 0正常，可以走   99已死亡，移除*/
        this.state = 0;
        this.dot_damage = 0;
        /**额外数据 当冰封时为冰封剩余回合数 中毒是为剩余中毒回合数数 */
        this.extra_value = 0;
        FightLogic.getInstance().soldier_max_id++;
        this.uuid = FightLogic.getInstance().soldier_max_id;
    }
    return EnemyVO;
}());
__reflect(EnemyVO.prototype, "EnemyVO");
