$(document).ready(function(){
    $('.delete-article').on('click', function(e){
        $target = $(e.target)
        const id = $target.attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/article/'+id,
            success: ()=> {
                alert('this has been deleted')
                window.location.href='/'
            },
            error: (err)=> console.log(err)
        })
    })
})