
$(document).ready(function() {
    var results;
    $('#example').DataTable( {
        ajax : {
            url : "/products/findAll",
            dataSrc :''
        }
        , columns: [
            { data: '_id' },
            { data: '고시년도' },
            { data: '회차' },
            { data: '개최일자' },
            { data : '안건일련번호'},
            { data: '소관부서' },
            { data: '안건제목' },
            { data : '심의결과'},
            { data : '개요'}
        ]
        , "lengthMenu": [ 5, 10, 15, 20]
    } );
} );
