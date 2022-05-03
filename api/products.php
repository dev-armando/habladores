<?php
/**
 * @Product endpoints
 * @author Armando Rojas <armando.develop@gmail.com>
 * @github: https://github.com/dev-armando
 */

$db = require('Database.php');

$code = $_REQUEST['code'] ?? '0'; 

$products = $db->execute("select name , priceusdsale , pricesell , code from products where code = :code " , [ 'code' => $code  ] );

 echo json_encode(['data' => $products]);

?>