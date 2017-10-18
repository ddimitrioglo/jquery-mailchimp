$(function() {
  'use strict';

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
  $('input').on('mc:input:error', function() {
    alert('mc:input:error event fired');
    $(this).css({'border': '1px solid red'});
  });

});
