export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}
