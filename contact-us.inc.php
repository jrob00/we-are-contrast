<?if ($_REQUEST["action"] == "send") {?>
    <p><span class="highlight">Thank You.</span> Your message has been sent.</p>
    <p>We'll get back to you <span class="highlight">ASAP</span>.</p>
<?} else {?>
    <form id="contact" name="contact" method="post">
    <input type="hidden" name="action" value="send" />
    <p>Send us an email at <a href="mailto:hello@wearecontrast.com">hello@wearecontrast.com</a> - or fill out the following form. Either way, we'll get back to you ASAP.</p>
    <p class="label">Your Name</p>
    <input type="text" name="name" />
    <p class="label">Your Email</p>
    <input type="text" name="email" />
    <p class="label">Question/Comment</p>
    <textarea name="message"></textarea><br />
    <input type="submit" value="Send Comment" />
    </form>
<?}?>