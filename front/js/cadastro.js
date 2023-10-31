import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    axios.get(url + 'users', {
    }).then(function (response) {
        $.each(response.data, function (key, item) {                      
            $('#selectU').append(
                $("<option></option>")
                  .attr("value", item.id)
                  .text(item.description)
            );
        });   
    }).catch(function (error) {
        alert(error);
    });
    loadTable();
});

function loadTable(){
    axios.get(url+ 'users', {
    }).then(function (response){
        $("#table_User").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'name'},
                {data:'email'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}

$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'users', {
            name: $("#name").val(),
            email: $("#email").val(),
            admin: $("#admin").prop('checked'),
            password: $("#password").val()
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_User").DataTable();
            table.row.add({
                "id": response.data.id,
                "name": response.data.name,
                "email": response.data.email
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
            $("#admin").prop('checked', false),
            $("#password").val("")
    } catch (errors) {
        console.error(errors);
    }
});

