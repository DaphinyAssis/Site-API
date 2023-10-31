import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'stocks',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectS').append(
                $("<option></option>")
                .attr("value", item.id)
                .text(item.description)
            );
        });
    }).catch(function(error){
        alert(error);
    })
    loadTable();
});

function loadTable(){
    axios.get(url+ 'stocks', {
    }).then(function (response){
        $("#table_Stock").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'product'},
                {data:'quantity'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}


$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'stocks', {
            product: $("#product").val(),
            quantity: $("#quantity").val(),
            category: $("#category").val(),
            supplier: $("#supplier").val()
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_Stock").DataTable();
            table.row.add({
                "id": response.data.id,
                "product": response.data.product,
                "quantity": response.data.quantity
            }).draw();
        }).catch(function (error) {
            console.log(error);
        });
    } catch (errors) {
        console.error(errors);
    }
});
$("#btnLimpar").click(async function () {
    try {
        $("#id").val(""),
            $("#product").val(""),
            $("#quantity").val(""),
            $("#category").val(""),
            $("#supplier").val("")
    } catch (errors) {
        console.error(errors);
    }
});