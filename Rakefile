ID = '30I8399011219'
MAXZOOM = 24
DETAIL = 32 - MAXZOOM

desc 'download las files'
task :download do
  1.upto(4) {|i|
    u = "https://pointcloud.pref.shizuoka.jp/lasmap/public/#{ID}/{#{ID}-#{i}.las}"
    sh "curl #{u} --output './src/#1'"
  }
end

desc 'create shapefiles'
task :shapefile do
  1.upto(4) {|i|
    sh "las2ogr -i src/#{ID}-#{i}.las -o src/#{ID}-#{i}.shp -f 'ESRI Shapefile'"
  }
end

desc 'create a geojsonseq from shapefiles'
task :geojsonseq do
  1.upto(4) {|i|
    sh "ogr2ogr -f GeoJSONSeq -lco RS=YES -s_srs EPSG:6676 -t_srs EPSG:4326 /vsistdout/ src/#{ID}-#{i}.shp | node index.js > src/#{ID}-#{i}.geojsonseq"
  }
end

desc 'create mbtiles from a geojsonseq'
task :tippecanoe do
  inputs = (1..4).to_a.map{|i| "src/#{ID}-#{i}.geojsonseq"}.join(' ')
#  sh "tippecanoe --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=9 --low-detail=9 --base-zoom=23 --minimum-zoom=12 --maximum-zoom=23 -f -o tiles.mbtiles #{inputs}"
  sh "tippecanoe --read-parallel --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=#{DETAIL} --low-detail=#{DETAIL} --base-zoom=#{MAXZOOM} --minimum-zoom=12 --maximum-zoom=#{MAXZOOM} -f -o tiles.mbtiles #{inputs}"
end

desc 'expand to the filesystem'
task :expand do
  sh "tile-join --force --no-tile-compression\
    --output-to-directory=docs/zxy --maximum-zoom=#{MAXZOOM}\
    --no-tile-size-limit tiles.mbtiles"
end

desc 'build the style'
task :style do
  sh 'parse-hocon hocon/style.conf > docs/style.json'
  sh 'parse-hocon hocon/ort.conf > docs/ort.json'
  sh 'gl-style-validate docs/style.json'
  sh 'gl-style-validate docs/ort.json'
end

desc 'host the site'
task :host do
  sh "budo -d docs"
end
