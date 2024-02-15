module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "@typescript-eslint/unbound-method": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unsafe-member-access": "off",
    "class-methods-use-this": "off",
    "no-useless-constructor": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        "extensions": [
          ".ts",
          ".tsx"
        ]
      },
      node: {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    },
  }
};
