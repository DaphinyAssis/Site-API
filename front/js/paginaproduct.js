import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'products',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectP1').append(
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
    axios.get(url+ 'products', {
    }).then(function (response){
        $("#table_Product").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'name'},
                {data:'price'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}


$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'products', {
            name: $("#name").val(),
            code: $("#code").val(),
            price: $("#price").val(),
            category: $("#category").val()
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_Product").DataTable();
            table.row.add({
                "id": response.data.id,
                "name": response.data.name,
                "price": response.data.price
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
            $("#name").val(""),
            $("#code").val(""),
            $("#price").val(""),
            $("#category").val("")
    } catch (errors) {
        console.error(errors);
    }
});