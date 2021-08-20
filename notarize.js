const notarize = require('electron-notarize').notarize

module.exports = async (context) => {
  const { electronPlatformName } = context
  if (electronPlatformName === 'darwin') {
    try {
      console.log('Try notarize app')
      await notarize({
        appBundleId: 'by.gmar.homeidpanel',
        appPath: './dist/mac/HomeID Panel.app',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_ASP,
        ascProvider: process.env.APPLE_ASC_PROVIDER,
      })
      console.log('Success notarize')
    } catch (err) {
      console.log(err)
    }
  }
}
