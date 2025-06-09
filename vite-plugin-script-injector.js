// vite-plugin-script-injector.js
export default function scriptInjector() {
  return {
    name: 'script-injector',
    transformIndexHtml(html) {
      // Replace the placeholder comment with the actual script tag
      return html.replace(
        '<!-- %VITE_SCRIPT_PLACEHOLDER% -->',
        '<script type="module" src="./src/main.tsx"></script>'
      );
    }
  };
}