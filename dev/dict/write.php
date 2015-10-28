<?php
/**
 * Created by PhpStorm.
 * User: tos
 * Date: 28.03.15
 * Time: 22:31
 */
$param = $_POST['data'];

$file = "result";
$f1 = fopen($file, "a");
$output = $param;
fwrite($f1, $output);
fclose($f1);