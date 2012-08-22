# jQuery Before After

A jQuery plugin for adding :before and :after support to browsers without generated content features.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/dfadler/beforeAfter/master/dist/beforeAfter.min.js
[max]: https://raw.github.com/dfadler/beforeAfter/master/dist/beforeAfter.js

### For parsing a single stylesheet

```html
<link rel="stylesheet" type="text/css" href="styles.css" />
<script src="jquery.js"></script>
<script src="dist/jquery.beforeAfter.min.js"></script>
<script>
  jQuery(function($) {
    $(document)
      .beforeAfter({
        stylesheet: 'styles.css'
      });
  });
</script>
```

### For parsing all linked stylesheets

```html
<link rel="stylesheet" type="text/css" href="styles-1.css" />
<link rel="stylesheet" type="text/css" href="styles-2.css" />
<script src="jquery.js"></script>
<script src="dist/jquery.beforeAfter.min.js"></script>
<script>
  jQuery(function($) {
    $(document).beforeAfter();
  });
</script>
```

## Documentation
Add the script after your stylesheet and jQuery, then create your css with before and after pseudo class as well as the respective class preceded by a direct child selector `>`.
```css
#wrapper h1:before, #wrapper h1 > .before
```


### Supported
* Non-ordinal pseudo selectors `:before and :after`
* Multiple and single stylesheets 
* Single stylesheet configuration option `{stylesheet:'styes.css'}`

### Unsupported
* Multiple ::before and ::after pseudo-elements using ordinals `:before(#), :after(#)`
* Chained pseudo selectors `:first-child:after`

## Examples

### Stylesheet

```css
#wrapper h1:before, #wrapper h1 > .before {
content: ">";
margin-right: 10px;
color: white; }

#wrapper h1:after, #wrapper h1 > .before {
content: "_";
color: white; }

#wrapper p:before, #wrapper p > .before {
font-family: impact;
content: "“";
font-size: 52px;
color: grey;
line-height: auto; }

#wrapper p:after, #wrapper p > .after {
content: "”";
font-family: impact;
font-size: 52px;
color: grey; }
```

__Note the class selectors on the same line as the pseudo class__

```css
#wrapper h1:before, #wrapper h1 > .before
```
While the plugin will not add true pseudo classes you will get containers `.before, .after` that will behave exactly the same.

### Document
```html
<!-- Its recommended that you use Modernizer with generated content in the build -->
<script src="modernizr.js"></script>
<link rel="stylesheet" type="text/css" href="styles.css" />
<div id="wrapper">
  <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h1>
  <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
<script src="jquery.js"></script>
<script src="jquery.beforeAfter.js"></script>
<script>
  // It is not essential to pass a stylesheet 
  // but doing so may improve performance and 
  // avoid the plugin processing css that was 
  // not built with it in mind.

  $(document)
    .beforeAfter({
      stylesheet: 'styles.css'
    });
</script>
```

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012  
Licensed under the MIT, GPL licenses.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt` to install the latest version. _You may need to run `sudo npm install -g grunt`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.

### Installing PhantomJS

In order for the qunit task to work properly, [PhantomJS](http://www.phantomjs.org/) must be installed and in the system PATH (if you can run "phantomjs" at the command line, this task should work).

Unfortunately, PhantomJS cannot be installed automatically via npm or grunt, so you need to install it yourself. There are a number of ways to install PhantomJS.

* [PhantomJS and Mac OS X](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
* [PhantomJS Installation](http://code.google.com/p/phantomjs/wiki/Installation) (PhantomJS wiki)

Note that the `phantomjs` executable needs to be in the system `PATH` for grunt to see it.

* [How to set the path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
* [Where does $PATH get set in OS X 10.6 Snow Leopard?](http://superuser.com/questions/69130/where-does-path-get-set-in-os-x-10-6-snow-leopard)
* [How do I change the PATH variable in Linux](https://www.google.com/search?q=How+do+I+change+the+PATH+variable+in+Linux)
