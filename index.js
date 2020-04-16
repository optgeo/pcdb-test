const Parser = require('json-text-sequence').parser

const parser = new Parser()
  .on('data', f => {
    delete f.properties.return_num
    delete f.properties.angle
    delete f.properties.asprsclass
    delete f.properties.return_tot
    delete f.properties.gpstime
    delete f.properties.intensity
    f.properties.height = f.geometry.coordinates[2]
    f.geometry.coordinates.length = 2
    f.tippecanoe = {
      layer: 'pc'
    }
    console.log(JSON.stringify(f))
  })
  .on('truncated', buf => {
    console.error('truncated')
  })
  .on('invalid', buf => {
    console.error('invalid')
  })
  .on('finish', () => {
  })

process.stdin.pipe(parser)

