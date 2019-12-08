/**
 *
 * 功能描述:
 *
 * @className index
 * @projectName mis-front
 * @author yanshaowen
 * @date 2019/12/7 15:02
 */
import katex from 'katex';
import renderMathInElement from 'katex/dist/contrib/auto-render.js';
export default {
  install(Vue) {
    // Vue.directive('katex', {
    //   inserted: function (el, binding) {
    //     const options = (binding.value && binding.value.options) || {};
    //     renderMathInElement(el, options);
    //   }
    // })
    Vue.directive('katex',  function(el, binding) {
      // const d = el.createElement('div')
      // el.appendChild(d)
      el.childNodes = []
      el.remove()
      if (binding.arg && binding.arg === 'auto') {
        const options = (binding.value && binding.value.options) || {};
        renderMathInElement(el, options);
      } else {
        const expression = binding.value.expression || binding.value;
        const additionalOptions = binding.value.options || {};

        const options = Object.assign(
          {
            displayMode: binding.arg === 'display',
          },
          additionalOptions
        );

        katex.render(expression, el, options);
      }
    });
  },
}
