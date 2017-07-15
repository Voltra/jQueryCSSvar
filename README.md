# cssVar - A jQuery plugin for handling CSS variables in Javascript #

CSS variables are new to CSS3 and have many advantages over their prepocessors counterparts, such as being accessible in Javascript.

However accessing those variables in pure javascript tend to be an open door to very repetitive boilerplate, which is why I decided to created this plugin for jQuery.

It is originally a plugin from my other library (lightquery, currently in-dev), I just ported it to comply with jQuery's plugin syntax.

----

## How to install/use ? ##
For now there is no npm package for this plugin, it might appear someday (in which case I'll update this part).

For now you need to download the library manually from this repository and include it in your HTML/PHP file :

```html
  <head>
    <!-- [...] -->

    <script src="path/to/jquery"></script>
    <script src="path/to/the/cssVar/plugin"></script>

    <!-- [...] -->
  </head>
```

Once that is done, you can use cssVar in any script loaded after the plugin.

## Accessing variables ##
```css
:root{
  --variable-name: 42;
}
```
To access this variable, we simply use
```javascript
jQuery.cssVar("--variable-name");  //returns 42
jQuery.cssVar("variable-name"); //equivalent, also returns 42
```

## Variable name selector ##

Because all CSS variable must start with "--", I made it possible to use the variables' names without "--".
Therefore,
```javascript
jQuery.cssVar("--x");
```
and
```javascript
jQuery.cssVar("x");
```
are strictly equivalent.


## Modifying global variables ##
```css
:root{
  --var: 404
}
```

Just like any other plugin of jQuery, cssVar adopts the getter/setter syntax, therefore we can modify this variable like so :

```javascript
jQuery.cssVar("var"); //returns 404
jQuery.cssVar("var", 42); //returns jQuery for chaining
jQuery.cssVar("var"); //returns 42
```

## Non-global (instance) variables ##
Even though using only global CSS variables is the best use case, sometimes you just need to have non-global variables/modify those variables locally.
Therefore cssVar is also ready for this.

```css
:root{
  --var1: 404;
}

.class{
  --var1: 42;
  --var2: 40;
}
```

```javascript
jQuery(".class").cssVar("var1"); //returns 42
jQuery(".class").cssVar("var2"); //returns 40
jQuery.cssVar("var1"); //returns 404

jQuery(".class").eq(2).cssVar("var1", 41);
jQuery(".class").eq(0).cssVar("var1"); //returns 42
jQuery(".class").eq(2).cssVar("var1"); //returns 41

jQuery(".class").cssVar("var1", 440);
jQuery(".class").eq(0).cssVar("var1"); //returns 440
jQuery(".class").eq(2).cssVar("var1"); //returns 440
```

## Specifications ##
- The getter only retrieves the variable's value from the first element of the matched set
- The setter sets the variable's value for each element of the matched set
- CSS variables only accept numbers and string, those are the only values that you can set those variables to
- If an error occurs, it returns what the method was called on (the matched set if instance, jquery if global)
- All modifications you can do to those variables follow the same rules as if they were done in CSS (cf. [How to use CSS variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables))
