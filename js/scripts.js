$(document).ready(function(){

    // Modal

    $(".modal").on("click", function (e) {
        console.log(e);
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();
        }
    });

    // -> Modal

    // Abrir el inspector de archivos
    
    $(document).on("click", "#add-photo", function(){
        $("#add-new-photo").click();
    });
    
    // -> Abrir el inspector de archivos

    var formData = new FormData();

    // Cachamos el evento change
    
    $(document).on("change", "#add-new-photo", function () {

        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;

        for (var i = 0; i < files.length; i++) {
            element = files[i];
            
            if (supportedImages.indexOf(element.type) != -1) {
                var id = getRandomString(7);
                createPreview(element, id);
                formData.append(id, element);
                
            }
            else {
                seEncontraronElementoNoValidos = true;
            }
        }
        
        if (seEncontraronElementoNoValidos) {
            showMessage("Se encontraron archivos no validos.");
        }
        else {
            showMessage("Todos los archivos se subieron correctamente.");
        }
    
    });
    
    // -> Cachamos el evento change

    // Eliminar previsualizaciones
    
    $(document).on("click", "#Images .image-container", function(e){
        var parent = $(this).parent();
        var id = $(parent).attr("id");
        formData.delete(id);
        $(parent).remove();
    });
    
    // -> Eliminar previsualizaciones

    // Al enviar el formulario
    
    $(document).on("submit", "#upload-multi-images", function (e) {
    
        e.preventDefault();

        //Envio mediante Ajax
        $.ajax({
            url: "upload.php",
            type: "post",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function () {
                loading(true, "Subiendo foto...");
            },
            success: function (res) {
                loading(false);
                if (res.status == "true") {
                    createImages(res.all_ids);
                    $("#Images form .row > div:not(#add-photo-container)").remove();
                    formData = new FormData();
                } else {
                    alert(res.error);
                }
            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    
    });
    
    // -> Al enviar el formulario

    // Eliminar imagenes subidas

    $(document).on("click", "#MyImages .image-container", function (e) {
        var parent = $(this).parent();
        var id = $(parent).attr("data-id");
        var data = {
            id : id
        }
        $.post("delete.php", data, function(res) {
            if (res == "true") {
                showMessage("¡Imagenes eliminadas correctamente!");
                $(parent).remove();
            }
            else {
                showMessage("Lo sentimos, hubo un error eliminando esta imagen.");
            }
        });
    });

    // -> Eliminar imagenes subidas

});