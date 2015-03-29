<?php
/**
 * Created by PhpStorm.
 * User: tos
 * Date: 28.03.15
 * Time: 22:31
 */
$param = $_POST['page'];
for ($i=160; $i < 240; $i++){
    if ($param == 'Z_'.$i) {
        $f = $param;
    }
}
if($f){
    $f1 = file_get_contents($f);
    echo $f1;
}