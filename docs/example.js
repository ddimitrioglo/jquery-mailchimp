$(function() {
  'use strict';

  const $formInput = $('input');

  /**
   * Init MailChimpForm
   */
  $('#subscribe-form').MailChimpForm({
    url: '//github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812',
    fields: 'EMAIL,FULLNAME',
    submitSelector: '#submit-form'
  });

  /**
   * mc:input:error event handler
   */
  $formInput.on('mc:input:error', function() {
    console.log('mc:input:error event fired');
    $(this).css({'border': '1px solid red'});
  });

  /**
   * mc:input:ok event handler
   */
  $formInput.on('mc:input:ok', function() {
    console.log('mc:input:ok event fired');
    $(this).css({'border': '1px solid green'});
  });

});
