/**
 *
 * @author 
 *
 */
class RoomnameInputView extends BasePopUI {
    private back_btn: BaseButton;
    private ok_btn: BaseButton;
    private name_input: eui.TextInput;
    private screat_input: eui.TextInput;
    private backAction: Function;
    private conformAction: Function;
    
	public constructor() {
        super();
        this.skinName = "RoomnameInputSkin";
        this.x = 20;
        this.verticalCenter = 0;
	}
	
	public setCallback(backAction:Function,conformAction:Function):void{
	    this.backAction = backAction;
	    this.conformAction = conformAction;
	}
	
    protected childrenCreated(): void {
        super.childrenCreated();
        
        this.initEvent();
    }

    private initEvent(): void {
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
        this.ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickOk,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }

    private clickBack(e: egret.TouchEvent): void {
        SoundManager.getInstance().playEffectSound();
        var tw = egret.Tween.get(this);
        tw.to({ x: -this.width },300).call(this.tweenFinish,this);
    }
    private tweenFinish(): void {
        if(this.parent != null) {
            this.parent.removeChild(this);
            this.backAction();
        }
    }
    private clickOk(e: egret.TouchEvent): void {
        SoundManager.getInstance().playEffectSound();
        this.conformAction(this.name_input.text,this.screat_input.text);
    }
    
    public clear(e: egret.Event): void{

        this.back_btn = null;
        this.name_input = null;
        this.screat_input = null;
        
    }
}
