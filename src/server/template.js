export default function template(
  helmet,
  content = '',
  sheetsRegistry,
  bundles,
  initialState = {},
) {
  const scripts = `...
                   <script>
                     // Если браузер поддерживает service-worker - регистрируем
                     if ('serviceWorker' in navigator) {
                       window.addEventListener('load', () => {
                         navigator.serviceWorker.register('/service-worker.js')
                           .then(registration => {
                             console.log('Service Worker is registered! ');
                           })
                           .catch(err => {
                             console.log('Registration failed  ', err);
                           });
                       });
                     }
                     </script>`

  return `<!DOCTYPE html>
              <html lang="en">
              <head>
                ...
                <link rel="manifest" href="/manifest.json">
              </head>
              <body>
                ...
                ${scripts}
              </body>
              `
}
