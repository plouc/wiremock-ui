const ghpages = require('gh-pages')

ghpages.publish('build', (err) => {
    if (err !== undefined) {
        console.error(err)
        process.exit(1)
    }

    console.log('demo successfully published!')
})