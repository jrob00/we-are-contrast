<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>Contrast Design</title>
    <link rel="shortcut icon" href="http://www.wearecontrast.com/favicon.ico" />
    <script type="text/javascript" src="js/jquery-1.2.6.pack.js"></script>
    <script type="text/javascript" src="js/jquery.metadata.pack.js"></script>
    <script type="text/javascript" src="js/jquery.pngFix.pack.js"></script>

<?
switch($page) {
    case "selected-works":
?>
    
    <link rel="stylesheet" href="css/prettyPhoto.css" type="text/css" media="screen" charset="utf-8" />
    <script src="js/prettyPhoto.js" type="text/javascript" charset="utf-8"></script>

<?
    break;
    
    case "design-packages":
?>

    <script src="js/jquery.scrollTo-1.3.3-min.js" type="text/javascript"></script>
    <script src="js/jquery.localscroll-1.2.6-min.js" type="text/javascript"></script>
    <script src="js/jquery.serialScroll-1.2.1-min.js" type="text/javascript"></script>

    <script type="text/javascript" src="js/coda-slider.js" charset="utf-8"></script>
    <link rel="stylesheet" href="css/coda-slider.css" type="text/css" media="screen" />
<?    
    break;
    
    case "contact-us":
    break;
}
?>

    <script type="text/javascript">
    $(document).ready(function() {
        $('div#topbar a.button').click(function()
        {
            $('div.clients').slideToggle();
            $(this).toggleClass('panel-down');
        });
    });
    </script>
    
	<link rel="stylesheet" href="css/global.css" type="text/css" media="screen" />
<!--[if lt IE 8]>
    <link rel="stylesheet" type="text/css" href="css/ie.css" />
<![endif]-->
</head>

<body>
<div class="clients">
	<div>
		<dl class="project_manager">
			<dt>Project manager - Manage your web design project without having to pop over to Harrogate to see us.</dt>
			<dd><a href="http://wearecontrast.com/admin">Want to add some files or comments to an active project, or simply refresh your memory on current progress? Click here to login.</a></dd>
		</dl>

		<dl class="not">
			<dt>Not a client? Why not? We'd love to design you a new website</dt>
			<dd><a href="#contact">Then what are you doing here? Don't worry, you can easily remedy it by getting in touch with us about any projects you may have in mind.</a></dd>
		</dl>
	</div>
</div>

<div id="topbar">
    <div>
        <a href="#" class="button clients_open panel-up" title="Already experiencing a contrast? Click here">Log into our client to access your project manager</a>
    </div>
</div>
    
<div id="wrapper">
	<div id="branding">

        <div id="logo-container">
            <a href="/"><img id="logo" src="images/logo.png" /></a>
        </div>

		<h1>Welcome to Contrast Design</h1>
		<blockquote>We make: Web Sites, Web Applications, Print Media, Identity Systems, and pretty much anything else you can think of.</blockquote>

		<h2>Services Provided</h2>
		<ul>
			<li>Web Design</li>
			<li>Print Design</li>
			<li>Logo Design</li>
			<li>Branding</li>
			<li>Programming</li>
		</ul>

        <div id="navigation" class="<?=$page?>">
           <ul>
               <li id="selected-works"><a href="selected-works">Selected Words</a></li>
               <li id="design-packages"><a href="design-packages">Design Packages</a></li>
               <li id="contact-us"><a href="contact-us">Contact Us</a></li>
           </ul>
        </div>	

    </div>

	<div id="container">
		<div id="content">

<?
switch($page) {
    case "selected-works":
    default:
        include("selected-works.inc.php");
    break;
    
    case "design-packages":
        include("design-packages.inc.php");
    break;
    
    case "contact-us":
        include("contact-us.inc.php");
    break;
}
?>            
		</div>
	</div>

    <div id="siteInfo">© 2008 Contrast Design</div>

<!-- Analytics -->
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-707387-8");
pageTracker._initData();
pageTracker._trackPageview();
</script>
</div>
</body>

</html>