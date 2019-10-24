// Libraries
import checkProps from 'check-prop-types';

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
export function findByTestAttr(wrapper, val) {
  return wrapper.find(`[data-test="${val}"]`);
}

export function checkPropTypes(component, conformingProps) {
  const propError = checkProps(
    component.propTypes,
    conformingProps,
    'prop',
    component.name,
  );
  expect(propError).toBeUndefined();
}