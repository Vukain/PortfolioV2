module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.unshift({
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: true,
              svgoConfig: {
                plugins: ['prefixIds'],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      });
      return config;
    },
  },
};
