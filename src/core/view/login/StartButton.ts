/**
 *
 * @author 
 *
 */
class StartButton extends BaseButton{
	public constructor(src_str:string) {
    	super(src_str);
	}
	
    protected createChildren() {
        super.createChildren();
        
        this.right = 343+20;
        this.bottom = 147;
    }
}
