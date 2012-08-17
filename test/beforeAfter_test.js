/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

    $(document)
        .beforeAfter({
            stylesheet: 'styles.css',
            legacy: false
        });

    var beforeAfter = $(document).data('plugin_beforeAfter'),
        trueCheckStylesheet = beforeAfter.checkStylesheet('styles.css').href,
        stylesheets = document.styleSheets,
        stylesheetsLength = stylesheets.length,
        stylesPattern = RegExp(/styles.css/),
        styles;

        (function () {
            for(var i = 0; i < stylesheetsLength; i++) {
                if(stylesPattern.test(stylesheets[i].href)) {
                    styles = stylesheets[i];
                }
            }
        })();

    module('Plugin Initialization');

    test('Plugin Loaded', function(){
        ok($.fn.beforeAfter, 'beforeAfter exists');
        ok(beforeAfter, 'Tunnle for private methods was attached to document');
        ok(typeof(beforeAfter.init) === 'function', 'init method exists');
    });

    module('Stylesheet Methods');

    test('Flow Control', function(){
        ok(typeof(beforeAfter.checkStylesheet) === 'function', 'checkStylesheet method exists');
        ok(beforeAfter.checkStylesheet('37a6259cc0c1dae299a7866489dff0bd.css') === document.styleSheets, 'A stylesheet that does not exist should return all stylesheets');
        ok(trueCheckStylesheet.match(/styles.css/)[0] === 'styles.css', 'Should return the passed stylesheet if it exists');
    });

    test('Parse Stylesheet(s)', function(){
        ok(typeof(beforeAfter.parseStylesheet) === 'function', 'parseStylesheet method exists');

        var parsedStyles = beforeAfter.parseStylesheet(styles);
        ok(parsedStyles, 'parsedStylesheet should return an array');
        ok(typeof(parsedStyles[0]) === 'object', 'elements within array should be objects');
        ok(parsedStyles[0].pseudoClass, 'object should have pseudoClass property');
        ok(parsedStyles[0].selector, 'object should have selector property');
        ok(parsedStyles[0].content, 'object should have content property');
    });

    module('Append Containers');

    test('Adding containers to layout', function(){
        ok(typeof(beforeAfter.addContainer) === 'function', 'appendContainer method exists');
        ok(typeof(beforeAfter.addContainer.add) === 'function', 'appendContainer.add method exists');

        var elementBefore = {
            selector: '#wrapper h1',
            pseudoClass: 'before',
            content: '>'
        };

        beforeAfter.addContainer.add(elementBefore);
    
        ok($(elementBefore.selector + ' .'+elementBefore.pseudoClass).length === 1, 'container should have class ' + elementBefore.pseudoClass);
        ok($(elementBefore.selector + ' .'+elementBefore.pseudoClass).text() === elementBefore.content, 'container should be equal to ' + elementBefore.content);

        var elementAfter = {
            selector: '#wrapper h1',
            pseudoClass: 'after',
            content: '_'
        };

        beforeAfter.addContainer.add(elementAfter);

        ok($(elementAfter.selector + ' .'+elementAfter.pseudoClass).length === 1, 'container should have class ' + elementAfter.pseudoClass);
        ok($(elementAfter.selector + ' .'+elementAfter.pseudoClass).text() === elementAfter.content, 'container should be equal to ' + elementAfter.content);

        $('#wrapper h1 .before, #wrapper h1 .after')
            .remove();

    });

}(jQuery));
