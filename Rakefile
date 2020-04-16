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
#  sh "tippecanoe --cluster-densest-as-needed --base-zoom=20 -z20 -Z20 -f -o tiles.mbtiles src/#{ID}-3.geojsonseq"
  sh "tippecanoe --no-feature-limit --no-tile-size-limit --cluster-densest-as-needed --full-detail=10 --low-detail=10 --minimum-detail=10 --base-zoom=22 -z22 -Z22 -f -o tiles.mbtiles src/#{ID}-3.geojsonseq"
end
