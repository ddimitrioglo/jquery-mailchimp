(function($){
  'use strict';

  $.fn.MailChimpForm = function (options) {
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
        customMessages: {},
        onFail: (message) => {
          console.error(message);
        },
        onOk: (message) => {
          console.log(message);
        }
      }, options);

      let fieldsList = parseFields(cfg.fields);
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
          function (response) {
            const mcr = new McResponse(response, cfg.customMessages);

            if (mcr.isError && !isNaN(mcr.input)) {
              inputs[mcr.input].$errorEl.text(mcr.message);
              inputs[mcr.input].$inputEl.trigger('mc:input:error');
            } else if (mcr.isError && isNaN(mcr.input)) {
              cfg.onFail(mcr.message);
            } else {
              cfg.onOk(mcr.message);
            }
          },
          function (error) {
            cfg.onFail('MailChip error occurred');
          }
        );
      });

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

  /**
   * Ajax request wrapper
   * @param {String} url
   * @param {Object} data
   * @param {Function} onSuccess
   * @param {Function} onError
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
   * Parse fields from config
   * @param {String} fields
   */
  function parseFields(fields = '') {
    let result = [];

    fields.split(',').map(field => field.trim()).forEach(field => {
      if (!field.includes(':')) {
        throw new Error(`${field} should be in format: 0:FIELD1`);
      }

      let [ key, value ] = field.split(':');
      result[key] = value;
    });

    return result;
  }

  function McResponse(response, mapping = {}) {
    this.inputId = NaN;
    this.message = response.msg;
    this.isError = response.result === 'error';
    this.mapping = {
      E001: /^Please enter a value/i,
      E002: /^Please enter the date/i,
      E003: /^An email address must contain a single/i,
      E004: /^The domain portion of the email address is invalid/i,
      E005: /^Too many subscribe attempts for this email address/i,
      S001: /^Almost finished... We need to confirm your email/i,
    };

    let matches = this.message.match(/^(\d+)\s?-\s?(.*)$/);
    if (matches) {
      this.inputId = parseInt(matches[1]);
      this.message = matches[2];
    }

    this.code = Object.keys(this.mapping).find(code => this.mapping[code].test(this.message)) || 'UNCAUGHT';

    if (this.code === 'UNCAUGHT') {
      console.warn('If you see this message, please open an issue (https://github.com/ddimitrioglo/jquery-mailchimp/issues) with details below');
      console.warn(response);
    }

    return {
      input: this.inputId,
      message: mapping[this.code] ? mapping[this.code] : this.message,
      isError: this.isError
    };
  }

})(jQuery);
