const postcss = require("postcss");

const IMPORTANT = '!important'

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
            if (decl.prop in toRemove) {
              let value = toRemove[decl.prop]
              const hasImportant = value.endsWith(IMPORTANT)
              if (hasImportant) {
                value = value.slice(0, -IMPORTANT.length).trim()
              }
              if (decl.value === value) {
                if (decl.important && !hasImportant) return
                decl.remove()
              }
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
