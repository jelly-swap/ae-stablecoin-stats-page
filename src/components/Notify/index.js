export const success = (firstMessage, secondaryMessage, link, text) => {
  window.toastProvider.addMessage(firstMessage, {
    secondaryMessage,
    variant: 'success',
    colorTheme: 'light',
    actionHref: link,
    actionText: text,
    closeElem: true
  });
};

export const error = (firstMessage, secondaryMessage, link, text) => {
  window.toastProvider.addMessage(firstMessage, {
    secondaryMessage,
    variant: 'failure',
    colorTheme: 'light',
    actionHref: link,
    actionText: text,
    closeElem: true
  });
};

export const processing = (firstMessage, secondaryMessage, link, text) => {
  window.toastProvider.addMessage(firstMessage, {
    secondaryMessage: secondaryMessage,
    variant: 'processing',
    colorTheme: 'light',
    actionHref: link,
    actionText: text,
    closeElem: true
  });
};
