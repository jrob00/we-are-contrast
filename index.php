<?php
include_once("includes/initialize.php");

// Grab entire list
$sql = "SELECT portfolioID, name, description, type, fileName FROM portfolio WHERE isVisible='1' ORDER BY orderNum";
$result = mysql_query($sql);
while ($row = mysql_fetch_assoc($result)) {
	$portfolioArray[] = array(
		"portfolio"=>$row["portfolioID"], 
		"name"=>$row["name"], 
		"description"=>$row["description"], 
		"type"=>$row["type"], 
		"fileName"=>$row["fileName"]
	);
}
//print $sql."<br />";
//print_r($portfolioArray);

?>
<html>
<head>
	<title>Contrast Design</title>

	<script src="js/mootools.release.83.js" type="text/javascript"></script>
	<script src="js/showcase.slideshow.js" type="text/javascript"></script>
	<link rel="stylesheet" href="css/jd.slideshow.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/mainstyle.css" type="text/css" media="screen" />		

	<!--[if lt IE 8]>
		<link rel="stylesheet" type="text/css" href="ie.css" />
	<![endif]-->



	<script type="text/javascript">
	countArticle = 0;
	var mySlideData = new Array();

	<?foreach ($portfolioArray AS $key=>$array) {?>
mySlideData[countArticle++] = new Array(
	'photos/<?=$array["fileName"]?>',
	'#',
	'<?=addslashes($array["name"])?>',
	'<?=addslashes($array["description"])?>',
	'<?=addslashes($array["type"])?>'
	);
	<?}?>

	</script>
</head>

<body>
	<div id="branding">
		<h1>Contrast Design Studio</h1>
		<h2>Services Provided</h2>
		<ul>
			<li>Web Design</li>
			<li>Print Design</li>
			<li>Logo Design</li>
			<li>Branding</li>
			<li>Programming</li>
		</ul>
	</div>
	
	<div id="container">	
		<div id="content">
			<div class="jdSlideshow" id="mySlideshow"></div>
		</div>
		
		<script type="text/javascript">
		function startSlideshow() {
		var slideshow = new showcaseSlideShow($('mySlideshow'), mySlideData);
		}
		addLoadEvent(startSlideshow);
		</script>
		
		<div id="contact"><a href="mailto:hello@wearecontrast.com">hello@wearecontrast.com</a></div>	
	</div>

<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-707387-8");
pageTracker._initData();
pageTracker._trackPageview();
</script>
</body>

</html>