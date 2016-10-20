var fs = require('fs');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {

  const realContentFolderPath = fs.realpathSync('./src/pages/');
  const layout = fs.readFileSync('./src/pages/index.html', {
    encoding: 'utf8'
  });

  const generatePage = template => {
    const pageContent = fs.readFileSync(template, {
      encoding: 'utf-8'
    });

    return layout.replace('{# PAGE_CONTENT #}', pageContent);
  }

  const pages = glob.sync('./src/pages/**/*.html');

  return pages.map(page => {
    console.log(page.replace(realContentFolderPath, ''));
    return new HtmlWebpackPlugin({
      templateContent: generatePage(page),
      filename: page.replace(realContentFolderPath, ''),
      hash: true
    })
  });
};
