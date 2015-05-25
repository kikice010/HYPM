$(document).ready(function() {

    var $container = $('#equipment-container');
    $.ajax({
        url: 'http://hypermediagym.altervista.org/php/get_all_equipment.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            if (data.hasOwnProperty('equipment')) {
                for (var i in data.equipment) {
                    $container.append(
                        createEquipmentElement(data.equipment[i].name, data.equipment[i].description, data.equipment[i].image_path));
                }
            }
        }
    });

    function createEquipmentElement(name, description, image_path) {
        return (
            $('<div>').attr('class', 'single-equipment-item')
            .append($('<h2>').text(name))
            .append($('<div>').text(description))
            .append($('<img>').attr({
                src: "../resources/images/equipment/" + image_path,
                height: "auto"
            })));
    }

});
