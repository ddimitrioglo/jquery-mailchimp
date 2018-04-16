$(function() {
  'use strict';

  const $formInput = $('input');

  /**
   * Init MailChimpForm
   */
  $('#subscribe-form').MailChimpForm({
    url: '//github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812',
    fields: '0:EMAIL,1:FULLNAME',
    submitSelector: '#submit-form',
    customMessages: {
      E001: 'This field can not be empty',
      E003: 'Please enter a valid email address',
    },
    onOk: (message) => {
      alert(message);
    }
  });

  /**
   * mc:input:error event handler
   */
  $formInput.on('mc:input:error', function () {
    console.log('mc:input:error event fired');

    addBorder($(this), 'red');
  });

  /**
   * mc:input:ok event handler
   */
  $formInput.on('mc:input:ok', function () {
    console.log('mc:input:ok event fired');

    addBorder($(this), 'green');
  });

  /**
   * @param element
   * @param {String} color
   */
  function addBorder(element, color) {
    element.css({'border': `1px solid ${color}`});
  }
});
