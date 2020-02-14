function _(id) {
    return document.getElementById(id);
}
function validasiPIN(a) {
    var pin = _(a).value.trim();
        if (pin == "") {
            Swal.fire({
                icon: "error",
                title: "Ooppss",
                text: "PIN tidak boleh Kosong",
            });
            return false
        }
    return true    
}
//JQUERY
$(document).ready(function(){
    $("#btnAdmin").click(function() {
        if (validasiPIN('pinAdmin')) {
            $('#adminForm').submit();
        }
    })
    $("#btnKasir").click(function() {
        if (validasiPIN('pinKasir')) {
            $('#kasirForm').submit();
        }
    })
    $("#btnTO").click(function() {
        
        if (validasiPIN('pinWaiter')) {
            $('#TOForm').submit();
        }
    })
})