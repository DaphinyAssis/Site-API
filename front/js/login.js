import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function(){
    axios.get(url+'profiles',{
    }).then(function(response){
        $.each(response.data, function (key, item){
            $('#selectP').append(
                $("<option></option>")
                .attr("value", item.id)
                .text(item.description)
            );
        });
    }).catch(function(error){
        alert(error);
    })
});

$("#btnSalvar").click(async function () {
    try {
        await axios.post(url + 'profiles', {
            name: $("#name").val(),
            password: $("#password").val()
           
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
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
            $("#password").val("")
        } catch (errors) {
        console.error(errors);
    }
});