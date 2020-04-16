ID = '30I8399011219'

desc 'download a test las file.'
task :download do
  u = "https://pointcloud.pref.shizuoka.jp/lasmap/public/#{ID}/{#{ID}-3.las}"
  sh "curl #{u} --output './src/#1'"
end

desc 'create shapefile'
task :shapefile do
  sh "las2ogr -i src/#{ID}-3.las -o src/#{ID}-3.shp -f 'ESRI Shapefile'"
end

desc 'create geojsonseq from shapefile'
task :geojsonseq do
  sh "ogr2ogr -f GeoJSONSeq -lco RS=YES -s_srs EPSG:6676 -t_srs EPSG:4326 /vsistdout/ src/#{ID}-3.shp | node index.js > src/#{ID}-3.geojsonseq"
end

desc 'create mbtiles'
task :tippecanoe do
  sh "tippecanoe --no-feature-limit --no-tile-size-limit --drop-densest-as-needed --full-detail=9 --low-detail=9 --base-zoom=23 --minimum-zoom=15 --maximum-zoom=23 -f -o tiles.mbtiles src/#{ID}-3.geojsonseq"
end

desc 'expand to the filesystem'
task :expand
end

