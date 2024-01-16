export function showLoadingSymbol() {
    const loadingSymbol = document.getElementById('loadingSymbol');

    loadingSymbol.style.left = `${window.innerWidth / 2 }px`;
    loadingSymbol.style.top = `${window.innerHeight / 2 }px`;
    loadingSymbol.style.position = 'absolute';
    loadingSymbol.style.zIndex = 9999;
    loadingSymbol.style.display = 'block';
    loadingSymbol.style.borderRadius = '50%';
    loadingSymbol.style.border = '5px solid #f3f3f3';
    loadingSymbol.style.borderTop = '5px solid #3498db';
    loadingSymbol.style.width = '50px';
    loadingSymbol.style.height = '50px';
    loadingSymbol.style.margin = '-25px 0 0 -25px';

    // Apply the spin animation
    loadingSymbol.style.animation = 'spin 2s linear infinite';
    loadingSymbol.style.margin = '-25px 0 0 -25px';
}

export function hideLoadingSymbol() {
    const loadingSymbol = document.getElementById('loadingSymbol');

    loadingSymbol.style.display = 'none';
}


// Define the @keyframes spin animation
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Create a <style> element and append the spin animation to the <head> of the document
const style = document.createElement('style');
style.textContent = spinKeyframes;
document.head.appendChild(style);