<?php
####### database connection class ###########

class databaseConnection {
    
    private $host = "localhost";
    private $name = "contrast";
    private $user = "root";
    private $password = "";

    public function databaseConnection() {
        $this->open();
    }

    public function open() {
		mysql_connect($this->host, $this->user, $this->password);
		mysql_select_db($this->name);
    }

    public function close() {
        mysql_close();
    }
    
}

?>
