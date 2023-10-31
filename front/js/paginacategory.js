import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'categorys',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectC').append(
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
    axios.get(url+ 'categorys', {
    }).then(function (response){
        $("#table_Category").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'name'},
                {data:'supplier'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}

$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'categorys', {
            name: $("#name").val(),
            supplier: $("#supplier").val()
           
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_Category").DataTable();
            table.row.add({
                "id": response.data.id,
                "name": response.data.name,
                "supplier": response.data.supplier
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
            $("#supplier").val("")
        } catch (errors) {
        console.error(errors);
    }
});