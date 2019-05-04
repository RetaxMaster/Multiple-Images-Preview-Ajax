<?php

if (isset($_POST["id"])) {
    require("db.php");
    
    $id = $_POST["id"];
    
    $getImageName = $conexion->prepare("SELECT image FROM images WHERE id = :id;");
    $obtuvo_la_imagen = $getImageName->execute(array(
        ":id" => $id
    ));

    if ($obtuvo_la_imagen) {
        $image = $getImageName->fetch(PDO::FETCH_ASSOC);
        $image = $image["image"];
    
        //Lo eliminamos de la base de datos
        $deleteImage = $conexion->prepare("DELETE FROM images WHERE id = :id");
        $eliminoImagen = $deleteImage->execute(array(
            ":id" => $id
        ));

        if ($eliminoImagen) {
            //Lo eliminamos del servidor
            if(unlink("images/$image")) {
                die("true");
            }
            else {
                die("Hubo un error, por favor, contacta al administrador.");
            }
        }
        else {
            die("Hubo un error, por favor, contacta al administrador.");
        }
    }
    else {
        die("Hubo un error, por favor, contacta al administrador.");
    }


}

header("location: ./");

?>