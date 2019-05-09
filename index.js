const postcss = require("postcss");

module.exports = postcss.plugin("postcss-remove-declaration", function(options) {
  options = options || {};
  const { remove } = options;

  return css => {
    css.walkRules(rule => {
      let toRemove = remove[removeLineBreaks(rule.selector)];

      if (toRemove) {
        if (typeof toRemove === "string") {
          if (toRemove === "*") {
            rule.remove();
            return;
          } else {
            toRemove = [toRemove];
          }
        }

        if (Array.isArray(toRemove)) {
          rule.walkDecls(decl => {
            if (toRemove.includes(decl.prop)) {
              decl.remove();
            }
          });
        } else if (typeof toRemove === "object") {
          rule.walkDecls(decl => {
            if (decl.prop in toRemove && toRemove[decl.prop] === decl.value) {
              decl.remove();
            }
          });
        }
      }
    });
  };
});

function removeLineBreaks(string) {
  return string.replace(/(\r\n|\n|\r)/gm, "");
}
