<?php

$conexion = new PDO("mysql:host=localhost;dbname=multiple_images", "root", "");
$setnames = $conexion->prepare("SET NAMES 'utf8mb4'");
$setnames->execute();

?>