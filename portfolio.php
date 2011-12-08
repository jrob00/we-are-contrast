<?php
# Display Single Portfolio Pieces

if (!$_GET["id"]) {
	header("Location: /");
	exit;
} else {
	$id = $_GET["id"]
}

include_once("includes/initialize.php");

// Grab entire list
$sql = "SELECT * FROM portfolio WHERE isVisible='1' ORDER BY orderNum";
$result = mysql_query($sql);
while ($row = mysql_fetch_assoc($result))
	$portfolioArray[] = $row["id"];

// Grab specific piece
$sql = "SELECT * FROM portfolio WHERE isVisible='1' AND portfolioID='$id'";
$result = mysql_query($sql);
if ($result) {
	if (mysql_num_rows($result)>0) {
		$row = mysql_fetch_assoc($result);
		$name = $row["name"];
		$desc = $row["desc"];
		$fileName = $row["fileName"];
	}
}

print_r($portfolioArray);
print"<hr />";

print"name:".$name."<br />";
print"desc:".$desc."<br />";
print"fileName:".$fileName."<br />";

?>