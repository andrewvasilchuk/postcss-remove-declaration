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
            // Check with decl.value after removing !important
            if (decl.prop in toRemove && toRemove[decl.prop].replace('!important', '').trim() === decl.value) {
              // If targeted value has !important
              if (toRemove[decl.prop].includes('!important')) {
                // And if declaration is important
                if (decl.important) {
                  // Remove declaration
                  decl.remove()
                }
              } else {
                // If targeted value doesn't have !important
                // Remove irrespective of whether declaration is important or not
                decl.remove();
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
