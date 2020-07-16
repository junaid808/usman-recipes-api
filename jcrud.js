$(function(){
    loadRecipes();
    $("#recipes").on("click",".btn-danger",handledelete)
    $("#recipes").on("click",".btn-warning",handleupdate)
    $("#addBtn").click(addRecipe)
    $("#updateSave").click(handleSave)
    
});

function handledelete(){
    console.log("MAZEY")
    var btn=$(this);
    var parentDiv =btn.closest(".rex")
    let id=parentDiv.attr("data-id")
    console.log(id)
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"DELETE",

        success:function(){
            loadRecipes();
        }
    })
}
function loadRecipes(){
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"GET",
        error:function(response){
            var recipe=$("#recipes")
            recipe.html("An error has occured");

        },
        success:function(response){
            console.log(response)
            var recipe=$("#recipes")
            recipe.empty()
            for(var i=0;i<response.length;i++){
                var rec =response[i];
                recipe.append(`<div class="rex" data-id="${rec._id}"><h3> ${rec.title}   </h3><body><button class="btn btn-warning float-right">Edit</button> <button class="btn btn-danger float-right">Delete</button>${rec.body}</body></div>`)
            
            }
        }
    });
}

function addRecipe(){
    var title=$("#title").val();
    var body=$("#body").val();
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes",
        method:"POST",
        data:{title,body}, 
        success:function(response){
            loadRecipes();
        }
    })
}
function handleupdate(){
    
    var btn=$(this);
    var parentDiv =btn.closest(".rex")
    let id=parentDiv.attr("data-id")
    $.get("https://usman-recipes.herokuapp.com/api/recipes/"+id,function(response){
        $("#updateId").val(response._id)
        $("#updateTitle").val(response.title)
        $("#updateBody").val(response.body)
        $("#updatemodel").modal("show")


    })


}
function handleSave(){
    var id=$("#updateId").val()
    var title=$("#updateTitle").val()
    var body=$("#updateBody").val()
    $.ajax({
        url:"https://usman-recipes.herokuapp.com/api/recipes/"+id,
        method:"PUT",
        data:{title,body}, 
        success:function(response){
            loadRecipes();
        }
    })



}