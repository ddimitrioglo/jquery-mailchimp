# jquery-mailchimp

This is a jQuery plugin to simplify work with MailChimp forms. (inspired by [ajaxChimp][2])

## Set-up

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
                <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
                </label>
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
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
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
* Form action: `https://github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812`
* Form `fnames` (keep them ordered): `EMAIL,FULLNAME`

And you are ready to use `jquery-mailchimp` approach:

1. Download and add to your project `jquery-mailchimp.min.js`

2. Initialize plugin:

```javascript
$('#subscribe-form').MailChimpForm({
  url: 'github.us16.list-manage.com/subscribe/post?u=21d66d0fb5dc3af7cb8a859fa&id=5b10837812',
  fields: 'EMAIL,FULLNAME',
  submitSelector: '#submit-form'
});
```

1. Add a wrapper to your inputs with class `mc-form-group-` + `INPUT_NAME` and `<div class="mc-error"></div>` to show validation errors:

```html
<div class="mc-form-group-FULLNAME">
    <input type="text" name="FULLNAME" placeholder="Full name">
    <div class="mc-error"></div>
</div>
```

That's it!

Check our [demo][3] to see how it works

## Improvements

Have an idea how to improve this module? 
Feel free to contribute or open an issue with `enhancement` label.

## License

This repository can be used under the MIT license.
> See [LICENSE][1] for more details.

[1]: https://en.wikipedia.org/wiki/MIT_License
[2]: https://github.com/scdoshi/jquery-ajaxchimp
[3]: https://ddimitrioglo.github.io/jquery-mailchimp/
