


const React = require('react');
const MockIcon = (props) => <svg {...props} data-testid="mock-icon" />;

module.exports = new Proxy(
  {},
  {
    get: () => MockIcon,
  }
);