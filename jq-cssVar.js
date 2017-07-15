(function($){
    //check if there's variable support before attaching the plugin to jQuery
    if(window.CSS && window.CSS.supports && window.CSS.supports("--css-var", 0)){
        //GLOBAL PLUGIN
        $.cssVar = function(variable, value){
            let varname = variable;
            if(/^\w+(?:\w|-)*$/.test(varname))
                varname = `--${varname}`;
            
            if(/^--\w+(?:\w|-)*$/.test(varname)){
                if( ((typeof value == typeof "abc42") || (typeof value == typeof 42)) && value==value ){
                    //only allows numbers and string, doesn't allow NaN
                    document.body.style.setProperty(varname, value);
                }else{
                    return window.getComputedStyle(document.body).getPropertyValue(varname);
                }
            }
            
            return this;
        }
        
        //INSTANCE PLUGIN
        $.fn.cssVar = function(variable, value){
            let varname = variable;
            if(/^\w+(?:\w|-)*$/.test(varname))
                varname = `--${varname}`;
            
            if(/^--\w+(?:\w|-)*$/.test(varname)  &&  this[0]){                
                if( ((typeof value == typeof "abc42") || (typeof value == typeof 42)) && value==value ){
                    //only allows numbers and string, doesn't allow NaN
                    this.each((e)=>{
                        e.style.setProperty(varname, value);
                    });
                }else{
                    return window.getComputedStyle(this[0]).getPropertyValue(varname);
                }
            }
            
            return this;
        }
    }else
        throw new Error("This browser doesn't have enough CSS support to use CSS variables.");
})(jQuery);