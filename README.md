# jquery-mailchimp

This is a jQuery plugin to simplify work with MailChimp forms. (inspired by [ajaxChimp][1])

### Installation

* Download [jquery-mailchimp.min.js][2] and add to your project
* Include it in your template: `<script src="/your/project/path/js/jquery-mailchimp.min.js"></script>`

> Make sure you have jQuery v1.9+ included in your project

### Getting Started

Instead of using MailChimp's standard embedded forms:

```html
<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
  #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
</style>
<div id="mc_embed_signup">
    <form action="https://github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&amp;id=5b10837812" 
          method="post" id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" class="validate" 
          target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
            <h2>Subscribe to our mailing list</h2>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group">
                <label for="mce-EMAIL">Email Address </label>
                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
            </div>
            <div class="mc-field-group">
                <label for="mce-FULLNAME">Full Name </label>
                <input type="text" value="" name="FULLNAME" class="" id="mce-FULLNAME">
            </div>
            <div id="mce-responses" class="clear">
                <div class="response" id="mce-error-response" style="display:none"></div>
                <div class="response" id="mce-success-response" style="display:none"></div>
            </div>
            <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="xxx" tabindex="-1" value=""></div>
            <div class="clear">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
    </form>
</div>
<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
<script type='text/javascript'>
  (function($) {
    window.fnames = new Array(); 
    window.ftypes = new Array();
    fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FULLNAME';ftypes[1]='text';
  }(jQuery));
  var $mcj = jQuery.noConflict(true);
</script>
<!--End mc_embed_signup-->
```

You just have to use:
* Form action: `//github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812`
* Array of `fnames` as coma separated `<KEY>:<VALUE>` string: `0:EMAIL,1:FULLNAME`

And you are ready to use `jquery-mailchimp` approach:

1. Compound your custom form by adding wrappers to the all of your inputs with class `mc-form-group-` + `INPUT_NAME`. 
And add an error placeholder inside your wrapper `<div class="mc-error"></div>` to show validation errors:

```html
<div class="mc-form-group-FULLNAME">
    <input type="text" name="FULLNAME" placeholder="Full name">
    <div class="mc-error"></div>
</div>
```

2. Add submit button `<button id="submit-form">Subscribe</button>`

3. Initialize the plugin:

```javascript
$('#subscribe-form').MailChimpForm({
  url: '//github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812',
  fields: '0:EMAIL,1:FULLNAME',
  submitSelector: '#submit-form'
});
```

4. Enjoy!

### Available configs

```text
$('#your-form-id').MailChimpForm({
  url: <String>,                    # default: form="action"
  fields: <String>,                 # default: ''
  inputSelector: <String>,          # default: 'input'
  errorSelector: <String>,          # default: '.mc-error'
  submitSelector: <String>,         # default: '',
  onFail: <Function>,               # default: function(message) { console.log(message) }
  onOk: <Function>                  # default: function(message) { console.log(message) }
});
```

### Demo

Please check our [demo][3] to see how it works, btw you can subscribe and we will let you know about plugin updates :wink:

### Available events

* `mc:input:error` - fired on validation error
* `mc:input:ok` - fired on validation succeeded

### Improvements

* If you are facing some issues - don't hesitate to open an issue
* If you have an idea how to improve this module, feel free to contribute or open an issue with `enhancement` label

### License

This repository can be used under the MIT license.
> See [LICENSE][4] for more details.

[1]: https://github.com/scdoshi/jquery-ajaxchimp
[2]: https://github.com/ddimitrioglo/jquery-mailchimp/blob/master/dist/jquery-mailchimp.min.js
[3]: https://ddimitrioglo.github.io/jquery-mailchimp/
[4]: https://github.com/ddimitrioglo/jquery-mailchimp/blob/master/LICENSE
