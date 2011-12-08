<?php
####### database connection class ###########

class databaseConnection {
    
    private $host = "localhost";
    private $name = "jrob00_contrast";
    private $user = "jrob00_contrast";
    private $password = "tsartnoc";

    public function databaseConnection() {
        $this->open();
    }

    public function open() {
		mysql_connect($this->host, $this->user, $this->password) or die(mysql_error());
		mysql_select_db($this->name) or die(mysql_error());
    }

    public function close() {
        mysql_close();
    }
    
}

?>
