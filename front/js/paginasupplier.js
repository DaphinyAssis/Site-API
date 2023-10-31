import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'suppliers',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectS1').append(
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
    axios.get(url+ 'suppliers', {
    }).then(function (response){
        $("#table_Supplier").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'email'},
                {data:'category'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}

$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'suppliers', {
            name: $("#name").val(),
            email: $("#email").val(),
            category: $("#category").val(),
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_Supplier").DataTable();
            table.row.add({
                "id": response.data.id,
                "email": response.data.email,
                "category": response.data.category
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
            $("#email").val(""),
            $("#category").val("")
    } catch (errors) {
        console.error(errors);
    }
});