# pcdb-test

この作品は、以下の著作物を改変して利用しています。

【出典：静岡県ポイントクラウドデータベース】、[CCライセンス 表示 4.0 国際](https://creativecommons.org/licenses/by/4.0/legalcode.ja)
 
# install
```zsh
git clone https://github.com/optgeo/pcdb-test.git
cd pcdb-test
yarn
```

# use
```zsh
rake -T
rake download
rake shapefile
rake geojsonseq
rake tippecanoe
rake expand
rake style
rake host
```

# vector tile specifications
- layer name: pc
- minzoom: 22
- maxzoom: 22

# see also
- https://pointcloud.pref.shizuoka.jp/lasmap/ankendetail?ankenno=30I8399011219
- https://pointcloud.pref.shizuoka.jp/lasmap/ankenmap?ankenno=30I8399011219

