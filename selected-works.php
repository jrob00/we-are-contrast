<?php
include_once("includes/initialize.php");

// Grab entire list
$sql = "SELECT portfolioID, name, description, type, fileName FROM portfolio WHERE isVisible='1' ORDER BY orderNum";
$result = mysql_query($sql);
$i = 0;
while ($row = mysql_fetch_assoc($result)) {
	$portfolioArray[$i] = array(
		"portfolio"=>$row["portfolioID"], 
		"name"=>$row["name"], 
		"description"=>$row["description"], 
		"type"=>$row["type"], 
		"fileName"=>$row["fileName"]
	);
	$i++;
}
$lastKey = $i;
//print $sql."<br />";
//print_r($portfolioArray);

$page = "selected-works";
include_once("main.php");
?>