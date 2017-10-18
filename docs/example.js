$(function() {
  'use strict';

  $('#subscribe-form').MailChimpForm({
    url: 'github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812',
    fields: 'EMAIL,FULLNAME',
    submitSelector: '#submit-form'
  });

});
