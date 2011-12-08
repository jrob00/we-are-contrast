<?php

ini_set("display_errors", "0"); # do not echo the errors
session_start();

require_once($_SERVER["DOCUMENT_ROOT"]."/includes/database.php");

new databaseConnection();

?>