<?php

if (empty($_FILES)) header("location: ./");

require("db.php");
require("generar.php");
$Generar = new Generar();

function getFileExtension(string $filename) : string {
    //$filename = 1.jpg            |   ["1", "jpg"]       | return ".jpg"
    $name = explode(".", $filename);
    return ".".array_pop($name);
}

if (isset($_FILES) && !empty($_FILES)) {
    $files = array_filter($_FILES, function($item) {
        return $item["name"][0] != "";
    });

    foreach ($files as $file) {
        $tmp_name = $file["tmp_name"];
        $name = $file["name"];
        $extension = getFileExtension($name);
        $newName = $Generar->GenerarP(10).$extension;
        $path = "images/$newName";
        $insertImages = $conexion->prepare("INSERT INTO images (image) VALUES (:image);");
        $wasUploaded = $insertImages->execute(array(
            ":image" => $newName
        ));

        if ($wasUploaded) {
            $id = $conexion->lastInsertId();
            $data["all_ids"]["id_$id"]["id"] = $id;
            $data["all_ids"]["id_$id"]["name"] = $newName;
            move_uploaded_file($tmp_name, $path);
        }
        else {
            die("Hubo un error, por favor, contacta al administrador.");
        }
    }
}

$data["status"] = "true";

/*

data = {
    all_ids : {
        id_1 : {
            id : 1,
            name : "sacbC63f.jpg"
        },
        id_2 : {
            id : 2,
            name : "vgu39u9q.jpg"
        }
    },
    status : "true"
}

*/

echo json_encode($data);

?>