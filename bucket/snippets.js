$.extend($.fn, {
     beforeAfter: function(options) {
     
         this.defaults =  {
             stylesheet: false
         };
     
         this.configuration = $({}, this.defaults, options);
     
         console.dir(this.configuration);
         Need to abstract this into a plugin
     
         var styleSheetRulesLength = function(i) {
           document.styleSheets[0].rules.length  
         } 
         console.dir(document.styleSheets)
         for(var i = 0; i < ; i++) { 
         
            // var selectorText = document.styleSheets[0].rules[i].selectorText;
            //::before
            //::(before|after)
            console.dir(document.styleSheets)
                // if( selectorText === 'h1') {
                //     // console.dir(document.styleSheets[0].rules[i].style);
                //     console.dir(document.styleSheets[0]);
                //     // console.dir(document);
                // }
         } 
     } 
    });