/**
 * Version Switcher for API Reference
 * Handles switching between different OpenAPI spec versions
 */

(function() {
  'use strict';

  const DEPRECATED_VERSIONS = ['0.8.0', '0.6.2', '0.6.1'];
  const SPECS_BASE_PATH = '/specs/';

  /**
   * Recreate the elements-api component with new spec URL
   * Stoplight Elements doesn't react to attribute changes, so we must recreate it
   */
  function updateApiElement(specFile) {
    const container = document.querySelector('.api-container');
    const oldElement = container.querySelector('elements-api');
    
    // Create new element with updated URL
    const newElement = document.createElement('elements-api');
    newElement.setAttribute('apiDescriptionUrl', SPECS_BASE_PATH + specFile);
    newElement.setAttribute('router', 'hash');
    newElement.setAttribute('layout', 'sidebar');
    
    // Replace old element
    if (oldElement) {
      oldElement.remove();
    }
    container.appendChild(newElement);
  }

  /**
   * Initialize the version switcher
   */
  function init() {
    const select = document.getElementById('version-select');
    const deprecationWarning = document.getElementById('deprecation-warning');

    if (!select) {
      console.warn('Version switcher: Select element not found');
      return;
    }

    // Handle version change
    select.addEventListener('change', function(event) {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const specFile = selectedOption.dataset.file;
      const version = selectedOption.value;

      // Recreate the API element with new spec
      updateApiElement(specFile);

      // Show/hide deprecation warning
      if (deprecationWarning) {
        if (DEPRECATED_VERSIONS.includes(version)) {
          deprecationWarning.classList.add('show');
        } else {
          deprecationWarning.classList.remove('show');
        }
      }

      // Update URL for bookmarking
      if (history.replaceState) {
        const url = new URL(window.location);
        url.searchParams.set('version', version);
        history.replaceState(null, '', url);
      }
    });

    // Check URL params for pre-selected version
    const urlParams = new URLSearchParams(window.location.search);
    const versionParam = urlParams.get('version');
    
    if (versionParam) {
      const optionToSelect = select.querySelector(`option[value="${versionParam}"]`);
      if (optionToSelect) {
        select.value = versionParam;
        select.dispatchEvent(new Event('change'));
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
