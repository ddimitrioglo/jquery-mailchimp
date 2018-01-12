(function($){
  'use strict';

  $.fn.MailChimpForm = function(options) {

    /**
     * Ajax request wrapper
     * @param url
     * @param data
     * @param onSuccess
     * @param onError
     */
    function request(url, data, onSuccess, onError) {
      $.ajax({
        url: url,
        dataType: 'jsonp',
        contentType: 'application/json',
        data: data,
        success: onSuccess,
        error: onError
      });
    }

    /**
     * Stop default behaviour
     * @param event
     */
    function cancelEvent(event) {
      event.preventDefault();
      event.stopPropagation();
    }

    /**
     * Main handler
     */
    return this.each(function () {
      let inputs = {};
      let $form = $(this);

      /**
       * Configuration object
       */
      let cfg = $.extend({
        url: $form.attr('action'),
        fields: '',
        inputSelector: 'input',
        errorSelector: '.mc-error',
        submitSelector: '',
        onFail: function (message) {
          console.error(message);
        },
        onOk: function (message) {
          console.log(message);
        }
      }, options);

      let fieldsList = cfg.fields.split(',').map(field => field.trim());
      let $submitElement = $(cfg.submitSelector);

      if (!cfg.url) {
        throw new Error('Url must be specified!');
      }

      /**
       * Init MailChimpForm inputs
       */
      fieldsList.map((item, index) => {
        let $formGroup = $form.find(`.mc-form-group-${item}`);

        inputs[index] = {
          name: item,
          $inputEl: $formGroup.find(cfg.inputSelector),
          $errorEl: $formGroup.find(cfg.errorSelector)
        };
      });

      /**
       * Form submit event listener
       */
      $submitElement.on('click', function (e) {
        cancelEvent(e);
        resetErrors();

        request(cfg.url.replace('/post?', '/post-json?').concat('&c=?'), getData(),
          function (res) {
            if (res.result === 'error') {
              let inputIndex;
              let errorMessage = res.msg;

              if (errorMessage.substr(1, 4).indexOf('-') >= 0) {
                let result = res.msg.split('-').map(item => item.trim());
                inputIndex = result[0];
                errorMessage = result[1];
              }

              onError(errorMessage, inputIndex);
            } else if (res.result === 'success') {
              cfg.onOk(res.msg);
            }
          },
          function (err) {
            cfg.onFail('MailChip error occurred');
          }
        );
      });

      /**
       * Internal error handler
       * @param message
       * @param inputIndex
       */
      function onError(message, inputIndex) {
        if (inputIndex) {
          inputs[inputIndex].$errorEl.text(message);
          inputs[inputIndex].$inputEl.trigger('mc:input:error');
        } else {
          cfg.onFail(message);
        }
      }

      /**
       * Reset previous errors
       */
      function resetErrors() {
        for (let inputIndex in inputs) {
          let input = inputs[inputIndex];

          if (input.$errorEl.text().length) {
            input.$errorEl.text('');
            input.$inputEl.trigger('mc:input:ok');
          }
        }
      }

      /**
       * Get form data
       * @returns {Object}
       */
      function getData() {
        let data = {};
        for (let index in inputs) {
          let item = inputs[index];
          data[item.name] = item.$inputEl.val();
        }
        return data;
      }
    });
  };

})(jQuery);
