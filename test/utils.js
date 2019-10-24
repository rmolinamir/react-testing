/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
export function findByTestAttr(wrapper, val) {
  return wrapper.find(`[data-test="${val}"]`);
}
