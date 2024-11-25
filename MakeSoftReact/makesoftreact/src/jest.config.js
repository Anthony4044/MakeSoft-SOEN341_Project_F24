module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel for JS/JSX
    },
    testEnvironment: 'jsdom', // Use jsdom for React tests
    transformIgnorePatterns: ['/node_modules/(?!bad-words|badwords-list)'], // Transform specific node_modules
  };
  