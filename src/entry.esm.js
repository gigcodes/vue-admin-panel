
// Import vue components
import * as components from '@/bootstrap/index';

// install function executed by Vue.use()
const install = function installGigcodesAdmin(app) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/bootstrap/index';
export * from '@/bootstrap/plugins';
