export function remarkMermaidToDiv() {
  function visit(node) {
    if (node.type === 'code' && node.lang === 'mermaid') {
      node.type = 'html';
      // We wrap the raw text in a div so it passes through expressive-code and Astro untouched.
      // We escape HTML entities just in case.
      const safeValue = node.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      node.value = `<div class="mermaid-raw" style="display:none;" data-raw="${encodeURIComponent(node.value)}">${safeValue}</div>`;
    }
    if (node.children) {
      for (const child of node.children) {
        visit(child);
      }
    }
  }
  return (tree) => {
    visit(tree);
  };
}
