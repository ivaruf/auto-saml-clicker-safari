// ==UserScript==
// @name        GitHub SAML Auto-Continue
// @description Automatically clicks the Continue button on GitHub SAML SSO pages for oslokommune
// @match       https://github.com/*
// @run-at      document-idle
// @version     1.0
// ==/UserScript==

function clickSamlContinue() {
  const form = document.querySelector('form[action*="/orgs/oslokommune/saml/initiate"]');
  if (form) {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.click();
      return true;
    }
  }
  return false;
}

if (!clickSamlContinue()) {
  const observer = new MutationObserver(() => {
    if (clickSamlContinue()) {
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 10000);
}
