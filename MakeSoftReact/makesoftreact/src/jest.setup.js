const { JSDOM } = require("jsdom");

const dom = new JSDOM();
global.window = dom.window;
global.document = dom.window.document;

// Import jest-dom to extend Jest matchers
require('@testing-library/jest-dom');

// Mocking the HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    // Add any other methods you need to mock
  };
});
