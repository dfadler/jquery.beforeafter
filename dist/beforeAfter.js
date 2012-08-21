/*! jQuery Before After - v0.7.8 - 2012-08-21
* https://github.com/dfadler/jquery.beforeafter
* Copyright (c) 2012 Dustin Fadler; Licensed MIT, GPL */

;(function($, window, undefined) {

    var beforeAfter = 'beforeAfter',
        isLegacy =  Modernizr ? !Modernizr.generatedcontent : document.all && !document.querySelector,
        defaults = {
            contentPattern: new RegExp(/content: '.'/),
            elements: [],
            extensionPattern: new RegExp(/.css$/),
            legacy: true,
            pseudoPattern: (isLegacy || $.browser.mozilla) ? new RegExp(/:before|:after/) : new RegExp(/::before|::after/),
            stylesheets: document.styleSheets,
            stylesheetsLength: document.styleSheets.length,
            stylesheet: undefined,
            applyCss: false
        };

    function BeforeAfter(options) {
        this.ele = document;
        this.config = $.extend({}, defaults, options);

        if(this.config.legacy === true && !isLegacy) {
            return false;
        } else {
            this.init();
        }
    }

    BeforeAfter.prototype.checkStylesheet = function(stylesheet){

        var stylesheets = this.config.stylesheets,
            stylesheetsLength = stylesheets.length,
            stylesheet = (stylesheet === undefined) ? this.config.stylesheet : stylesheet;

        if(stylesheet === this.config.stylesheet) {
            var pattern = new RegExp(stylesheet);
            for(var i = 0; i < stylesheetsLength; i++) {
                if (pattern.test(stylesheets[i].href)) {
                    return stylesheets[i];
                }
            }
            return stylesheets;
        } else {
            return stylesheets;
        }
    };

    BeforeAfter.prototype.parseStylesheet = function(stylesheet) {

        var that = this.parseStylesheet,
            config = that.config = {
                stylesheets       : this.config.stylesheets,
                stylesheetsLength : this.config.stylesheets.length,
                stylesheet        : stylesheet || this.config.stylesheet,
                pattern           : this.config.pseudoPattern,
                declarations      : [],
                contents          : [],
                declarationsLength: '',
                declarationType   : isLegacy ? 'selectorText' : 'cssText',
                elements          : []
            };

        if(stylesheet === this.config.stylesheet) {
            
            that.parseRules(stylesheet);
            
        } else {

            for(var i = 0; i < config.stylesheetsLength; i++) {
                that.parseRules(config.stylesheets[i]);
            }
        }

        config.declarationsLength = config.declarations.length;

        for(var i = 0; i < config.declarationsLength; i++) {
            
            that.parseDeclaration(
                config.declarations[i],
                config.contents[i]
                );
        }
        
        return config.elements;

    };

    BeforeAfter.prototype.parseStylesheet.parseDeclaration = function (declaration, content){

            // this refers to the parent "parseStylesheet"
        var config = this.config,
            pseudoPrefix = new RegExp(/::/),
            pseudoClass = declaration[config.declarationType].match(config.pattern),
            pseudoClass = pseudoPrefix.test(pseudoClass) ? pseudoClass[0].replace('::', '') : pseudoClass[0].replace(':', ''),
            selectors = declaration.selectorText.split(','),
            selectorsLength = selectors.length,
            selector, content;

        for(var i = 0; i < selectorsLength; i++) {
            if( config.pattern.test(selectors[i]) ){
                selector = selectors[i].replace(config.pattern, '');
            }
        }

        config.elements.push({
            selector: selector,
            pseudoClass: pseudoClass,
            content: content
        });
    };

    BeforeAfter.prototype.parseStylesheet.parseRules = function (stylesheet) {
        
            // Firefox uses cssRules while other browser support rules/cssRules
        var rules = stylesheet.cssRules || stylesheet.rules,
            rulesLength = rules.length,
            // this refers to the parent "parseStylesheet"
            config = this.config;

        for(var i = 0; i < rulesLength; i++) {
            if(config.pattern.test(rules[i][config.declarationType])) {

                // This will only work if the content is a single character
                // Will need to refactor and test for longer content strings
                config.contents.push(
                    rules[i].style['content'].charAt(1)
                    );

                config.declarations.push(rules[i]);
            }
        }
    };

    BeforeAfter.prototype.addContainer = function(elements) {

        var elementsLength = elements.length,
            that = this.addContainer;

        if(elements.length) {
            
            for(var i = 0; i < elementsLength; i++){

                var element =  elements[i];

                that.add(element);
            }

        } else {

            that.add(elements);

        }

    };

    BeforeAfter.prototype.addContainer.add = function(element) {

            if(element.pseudoClass === 'before') {
                
                if($(element.selector + ' .before').length === 0) {
                    $(element.selector)
                        .prepend(
                            '<div class="before">'+element.content+'</div>'
                            );
                }


            } else {
                if($(element.selector + ' .after').length === 0) {
                   $(element.selector)
                        .append(
                            '<div class="after">'+element.content+'</div>'
                            );
                }
            }
    };

    BeforeAfter.prototype.init = function() {

        var stylesheets = this.checkStylesheet(),
            declarations = this.parseStylesheet(stylesheets);

        this.addContainer(declarations);

    };

    // A really lightweight plugin wrapper around the constructor
    // preventing against multiple instantiations
    $.fn[beforeAfter] = function(options) {

        return this.each(function(){

            var ele = window.document;

            if (!$.data(ele, 'plugin_' + beforeAfter)) {
                
                $.data(
                    ele,
                    'plugin_' + beforeAfter,
                    new BeforeAfter(options)
                    );
            }
        });

    };

})(jQuery, window);