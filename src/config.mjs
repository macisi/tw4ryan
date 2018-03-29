const config = {
  development: {
    server: {
      protocol: 'http',
      host: 'localhost:3000',
      transport: 'session',
      state: true,
    },
    tumblr: {
      key: 'eoYwj4pYMaQkjNQBqAOzPP85IFjxxtEOikk8Y8rYVQqQ6KkQ6b',
      secret: 'T0FV2gEpj1xO3rYt6FFfCSViT44nINydPwhGsrtqr24QAb3FZy',
      callback: '/handle_tumblr_callback',
    },
  },
};

export default config[process.env.NODE_ENV || 'development'];