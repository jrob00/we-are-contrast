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
	<title>WeAreContrast.com</title>
	
	<script src="js/mootools.v1.11.js" type="text/javascript"></script>
	<script src="js/jd.gallery.js" type="text/javascript"></script>
	<script src="js/HistoryManager.js" type="text/javascript"></script>  
	<link rel="stylesheet" href="css/layout.css" type="text/css" media="screen" charset="utf-8" />
	<link rel="stylesheet" href="css/jd.gallery.css" type="text/css" media="screen" />
	
	<style type="text/css" media="screen">
	#branding {
		background-color: 000;
		color: fff;
		height: 80px;
		width: 100%;
	}
	#myGallery {
		margin-top: 20px;
		/*width: 400px !important;
		height: 200px !important;*/
	}
	</style>
</head>

<body>
	<div id="branding">
		<div>hello@wearecontrast.com</div>
	</div>

	<div id="myGallery">
		<?foreach ($portfolioArray AS $key=>$array) {?>

		<div class="imageElement">
			<h3><?=$array["name"]?></h3>
			<p><?=$array["type"]?></p>
			<a href="portfolio.php?id=<?=$array["portfolioID"]?>" title="open image" class="open"></a>
			<img src="photos/<?=$array["fileName"]?>" class="full" />
		</div>
		<?}?>
		
		<div class="imageElement">
			<h3>Item 1 Title</h3>
			<p>Item 1 Description</p>
			<a href="portfolio.php?id=1" title="open image" class="open"></a>
			<img src="photos/1.jpg" class="full" />
			<img src="photos/1-mini.jpg" class="thumbnail" />
		</div>
		<div class="imageElement">
			<h3>Item 2 Title</h3>
			<p>Item 2 Description</p>
			<a href="mypage2.html" title="open image" class="open"></a>
			<img src="photos/2.jpg" class="full" />
			<img src="photos/2-mini.jpg" class="thumbnail" />
		</div>
	</div>

<script type="text/javascript">
function startGallery() {
	var myGallery = new gallery($('myGallery'), {
	timed: false,
	useHistoryManager: true,
	showArrows: true,
	showCarousel: false,
	embedLinks: true
	});
	HistoryManager.start();
}
window.addEvent('domready', startGallery);
</script>

</body>
</html>