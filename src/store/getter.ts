export default {
  role: (state, getters) => {
    return state.user?.role ?? ''
  }
};
