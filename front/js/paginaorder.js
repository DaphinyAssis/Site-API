import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'orders',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectO').append(
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
    axios.get(url+ 'orders', {
    }).then(function (response){
        $("#table_Order").DataTable({
            data: response.data,
            columns: [
                {data:'id'},
                {data:'email'},
                {data:'product'},
                {data:'price'}
            ]
        });
    }).catch(function (error){
        alert(error);
    });
}

$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'orders', {
            number: $("#number").val(),
            email: $("#email").val(),
            product: $("#product").val(),
            quantity: $("#quantity").val(),
            price: $("#price").val()
           
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            var table=$("#table_Order").DataTable();
            table.row.add({
                "id": response.data.id,
                "email": response.data.email,
                "product": response.data.product,
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
            $("#number").val(""),
            $("#email").val(""),
            $("#product").val(""),
            $("#quantity").val(""),
            $("#price").val("")

        } catch (errors) {
        console.error(errors);
    }
});