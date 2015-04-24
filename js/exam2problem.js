function MenuInput()
{
    if (document.getElementById("menu").value=="Retrieve Categories")
    {
        document.getElementById("CategoryList").style.visibility = "visible"
        document.getElementById("AddCategory").style.visibility = "hidden"
        document.getElementById("ChangeDescription").style.visibility = "hidden"
        document.getElementById("DeleteCategory").style.visibility = "hidden"
        document.getElementById("About").style.visibility = "hidden"
    }
    else if (document.getElementById("menu").value=="Add Category")
    {
        document.getElementById("CategoryList").style.visibility = "hidden"
        document.getElementById("AddCategory").style.visibility = "visible"
        document.getElementById("ChangeDescription").style.visibility = "hidden"
        document.getElementById("DeleteCategory").style.visibility = "hidden"
        document.getElementById("About").style.visibility = "hidden"
    }
    else if (document.getElementById("menu").value=="Change Description")
    {
        document.getElementById("CategoryList").style.visibility = "hidden"
        document.getElementById("AddCategory").style.visibility = "hidden"
        document.getElementById("ChangeDescription").style.visibility = "visible"
        document.getElementById("DeleteCategory").style.visibility = "hidden"
        document.getElementById("About").style.visibility = "hidden"
    }
    else if (document.getElementById("menu").value=="Delete Category")
    {
        document.getElementById("CategoryList").style.visibility = "hidden"
        document.getElementById("AddCategory").style.visibility = "hidden"
        document.getElementById("ChangeDescription").style.visibility = "hidden"
        document.getElementById("DeleteCategory").style.visibility = "visible"
        document.getElementById("About").style.visibility = "hidden"
    }
    else if (document.getElementById("menu").value=="About Me")
    {
        document.getElementById("CategoryList").style.visibility = "hidden"
        document.getElementById("AddCategory").style.visibility = "hidden"
        document.getElementById("ChangeDescription").style.visibility = "hidden"
        document.getElementById("DeleteCategory").style.visibility = "hidden"
        document.getElementById("About").style.visibility = "visible"
    }
    else
    {
        document.getElementById("CategoryList").style.visibility = "hidden"
        document.getElementById("AddCategory").style.visibility = "hidden"
        document.getElementById("ChangeDescription").style.visibility = "hidden"
        document.getElementById("DeleteCategory").style.visibility = "hidden"
        document.getElementById("About").style.visibility = "hidden"
    }
}

function GetCategories()
{
    var objRequest = new XMLHttpRequest();
    var url_1 =  "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var categoryoutput = JSON.parse(objRequest.responseText);
            GenerateTable(categoryoutput);
        }
    }
    objRequest.open("GET", url_1, true);
    objRequest.send(); 
}


function CreateCategory()
{
    var objRequest = new XMLHttpRequest()
    var url_2 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    var catid = document.getElementById("catname").value;
    var catdes = document.getElementById("catdescription").value;
    var newcat = '{"CName":"' + catid + '","CDescription":"' + catdes +'"}';
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult_2(result); 
        }
    }
    objRequest.open("POST", url_2, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcat);
}

function changeDescription()
{
    var objRequest_3 = new XMLHttpRequest()
    var url_3 =  "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    var catID = document.getElementById("ID").value;
    var catDes = document.getElementById("newCat").value;
    var newd = '{"CID": '+catID+' ,"CDescription":"'+catDes+'" }'; 
    objRequest_3.onreadystatechange = function()
    {
       if (objRequest_3.readyState == 4 && objRequest_3.status == 200)
       {
        var result_3 =JSON.parse(objRequest_3.responseText);
        OperationResult_3(result_3);
       }
    }
    objRequest_3.open("POST", url_3, true);
    objRequest_3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest_3.send(newd); 
}


function deleteCategory()
{
    var confirmed = window.confirm('No going back');
    var objRequest_4 = new XMLHttpRequest()
    var url_4 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url_4 += document.getElementById("removeid").value;
    if (confirmed == true)
    {
        objRequest_4.onreadystatechange = function()
        {
            if (objRequest_4.readyState == 4 && objRequest_4.status == 200)
            {
                var result_4 = JSON.parse(objRequest_4.responseText);
                OperationResult_4(result_4);
            }
        }
        objRequest_4.open("GET",url_4,true);
        objRequest_4.send();
    }
}

function GenerateTable(result)
{
    var count = 0;
    var ResultTable = "<table border=1><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        ResultTable += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>"+ result.GetAllCategoriesResult[count].CDescription +"</td></tr>";
    }
    ResultTable += "</table>";
    document.getElementById("result_11").innerHTML = ResultTable;
}

function OperationResult_2(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result_22").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result_22").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function OperationResult_3(output)
{
    if (output == 1)
    {
        document.getElementById("result_33").innerHTML = "Operation completed successfully!";
    }
    else if (output == 0)
    {
        document.getElementById("result_33").innerHTML = "Operation failed with an unspecified error!";
    }
    else if (output == -2)
    {
        document.getElementById("result_33").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object!";
    }
    else
    {
        document.getElementById("result_33").innerHTML = "Operation failed because a record with the supplied Order ID could not be found!";
    }
}

function OperationResult_4(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {
        document.getElementById("result_44").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result_44").innerHTML = "The operation was not successful!" + "<br>" + output.DeleteCategoryResult.Exception;
    }
    
}