//Genera una cadena aleatoria según la longitud dada
function getRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Genera las previsualizaciones
function createPreview(file, id) {
    var imgCodified = URL.createObjectURL(file);
    var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12" id="' + id + '"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore("#add-photo-container");
}

//Crea todas las imágenes y las pone en el documento
function createImages(all_ids) {
    for (const key in all_ids) {
        var image = all_ids[key];

        var img = $('<div class="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12" data-id="' + image.id + '"><div class="image-container"> <figure> <img src="images/' + image.name + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
        $("#my-images").append(img);
    }
}