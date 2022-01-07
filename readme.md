# loader

- file-loader 会将文件打包到dist目录下，并返回一个文件名
- url-loader limit 作限制, 如果是大于limit值, 会将打包成一张图片，否则就打包成base64
- css-loader 分析css文件之间的关系，将它们组合成一段CSS
- style-loader 将css挂载到style标签上
- sass-loader node-sass 打包sass文件
