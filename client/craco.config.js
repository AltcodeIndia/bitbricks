// import { ProvidePlugin } from 'webpack'; 

// export default function override(config) { 
//     const fallback = config.resolve.fallback || {}; 
//     Object.assign(fallback, { 
//       "stream": false,
//     }),
//     Object.assign(fallback, {
//       "http": require.resolve("stream-http")
//     }),
//     Object.assign(fallback, {
//       "https": require.resolve("https-browserify")
//     }),
//     Object.assign(fallback, {
//       "zlib":false
//     }),
//    config.resolve.fallback = fallback; 
//    config.plugins = (config.plugins || []).concat([ 
//      new ProvidePlugin({ 
//       process: 'process/browser', 
//       Buffer: ['buffer', 'Buffer'] 
//     }) 
//    ]) 
//    return config; }

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": false 
    }
  }
}
