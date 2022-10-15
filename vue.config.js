module.exports = {
  pwa: {
    name: 'Harmonic mix APP',
    themeColor: '#000000'
  },
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      overrideEndpoint: false,
      region: 'us-east-1',
      bucket: 'harmonicmix-app',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: true,
      pwaFiles: 'index.html,service-worker.js,manifest.json',
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  }
}
