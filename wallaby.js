module.exports = () => {
  return {
    files: [
      '!lib/**/*.spec.js',
      'lib/**/*.js'
    ],
    tests: [
      'lib/**/*.spec.js'
    ],
    debug: true,
    env: {
      type: 'node'
    }
  };
};
