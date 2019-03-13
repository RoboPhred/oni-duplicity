module.exports = {
  roots: ["src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    // Support our local "@/foo" root alias.
    "@/(.*)$": "<rootDir>/src/$1",
    // Force lodash-es to use lodash as jest does not support import
    //  This is a more desirable alternative than running everything
    //  through babel, which will pass es6 constructs that will not work
    //  in the browser
    "lodash-es": "lodash"
  },
  globals: {
    "ts-jest": {
      tsConfig: "src/tsconfig.json"
    }
  }
};
