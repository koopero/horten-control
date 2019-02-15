const deindent = require('deindent')

module.exports = function renderPageHTML( page ) {
  let title = page.title || 'horten-control'

  return deindent`<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${ title }</title>
    <meta name="viewport" content="width=device-width">
    <link href="/horten-control/style/main.css" rel="stylesheet"/>
  </head>
  <body class='horten'>
    <div id="app"></div>
    <script>
      __HortenPage = ${JSON.stringify( page )}
    </script>
    <script src="/horten-control/main.js"></script>
  </body>
  </html>
`
}