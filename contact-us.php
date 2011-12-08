<?php
include_once("includes/initialize.php");

if ($_REQUEST["action"] == "send") {

    $name = trim($_REQUEST["name"]);
    $email = trim($_REQUEST["email"]);
    $message = stripslashes(trim($_REQUEST["message"]));
    $message = $name."\n\n".$email."\n\n".$message;

    $headers = 'From: '.$name.' <'.$email.'>' . "\r\n";
    $headers .= 'Reply-To: '.$name.' <'.$email.'>' . "\r\n";

    $recipients[] = "Contrast Design <hello@wearecontrast.com>";

    mail(join(',', $recipients), "Web Form Message", $message, $headers);
}

$page = "contact-us";
include_once("main.php");
?>