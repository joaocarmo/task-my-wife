module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 'core-js@3',
        targets: {
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      },
    ],
    '@babel/preset-react',
  ],
}
