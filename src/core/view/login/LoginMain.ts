/**
 *
 * @author 
 *
 */
class LoginMain extends eui.Component{
    
    private btn: StartButton;
    private nameInput: RoomnameInputView;//菜单2级界面
    
	public constructor() {
    	super();
        this.skinName = "resource/assets/skins/LoginMainSkin.exml";
	}
    
    protected createChildren() {
        super.createChildren();
        this.btn = new StartButton("startgame_png");
        this.addChild(this.btn);
//        this.btn.startTween();
        this.btn.once(egret.TouchEvent.TOUCH_TAP,this.click,this);
        this.once(egret.Event.REMOVED_FROM_STAGE,this.clear,this);
    }
    
    private click(e:egret.Event):void
    {
        
        var tw = egret.Tween.get(this.btn);
        tw.to({ alpha:0 },300).call(this.showInput,this);
        
//        //打开游戏
//        StoryLogic.getInstance().openStory();
    }
    
    private showInput():void{
        
        //弹出输入框，编辑房间名字和密码
        if(this.nameInput == null) {
            this.nameInput = new RoomnameInputView();
            this.nameInput.setCallback(this.resetTheState.bind(this),this.loadGameStage.bind(this));
        }
        this.addChild(this.nameInput);
        this.nameInput.x = -GlobalData.GameStage_width;
        var tw = egret.Tween.get(this.nameInput);
        tw.to({ x: 20 },300);
        
    }
    
    private resetTheState(){
        var tw = egret.Tween.get(this.btn);
        tw.to({ alpha: 1 },300);
        this.btn.once(egret.TouchEvent.TOUCH_TAP,this.click,this);
    }
    
    private loadGameStage(name:string,secret:string){
        console.log('name:'+name+'-----secret:'+secret);
    }
    
    private clear():void
    {
        if(this.btn.parent != null)
        {
            this.btn.parent.removeChild(this.btn);
        }
        this.btn.clear();
        this.btn = null;
    }
}
