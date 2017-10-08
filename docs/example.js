$(function() {
  'use strict';

  $('#test-form').MailChimpForm({
    url: 'xxx',
    fields: 'EMAIL,FNAME,COMPANY',
    submitSelector: '#submit-form'
  });

});
