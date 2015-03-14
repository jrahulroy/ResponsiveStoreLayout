var Store = (function () {
    var items = [];
    
    var store = {
        
    };
    
    var addItem = function(item){
        var element = item.parentElement;
        var name = element.getAttribute("data-name");
        var found = false;
        
        for(var item in items){
            if(items[item].Name === name){
                items[item].Quantity = 1 + items[item].Quantity;
                found = true;
            }
        }
        
        if(!found){
             items.push({
                Name : element.getAttribute("data-name"),
                Price : element.getAttribute("data-price"),
                Quantity:1
            });
        }
       
        renderItems();
    }
    store.AddItem = addItem;
    
    var renderItems = function(){
        var table = document.getElementById("cartList");
        var total = 0;
        
        table.innerHTML = "";
        
        for(var item in items){
            var itemTd = document.createElement("td");
            itemTd.innerHTML = items[item].Quantity + " " + items[item].Name;
            
            var priceTd = document.createElement("td");
            priceTd.innerHTML = "$ " + items[item].Price * items[item].Quantity + ".00";
            
            var rowTr = document.createElement("tr");
            rowTr.appendChild(itemTd);
            rowTr.appendChild(priceTd);
            
            table.appendChild(rowTr);
            total += parseInt(items[item].Price, 10) * items[item].Quantity;
        }
        
        //Total Row
        var itemTd = document.createElement("td");
        itemTd.innerHTML = "Total:";
            
        var priceTd = document.createElement("td");
        priceTd.innerHTML = "$ " + total  + ".00";
            
        var rowTr = document.createElement("tr");
        rowTr.appendChild(itemTd);
        rowTr.appendChild(priceTd);
            
        table.appendChild(rowTr);      
        
    }
    
    var swapCart = function(opener){
        var element = opener.parentElement.parentElement;
        if(element.getAttribute("class").indexOf("opened") > -1){
            // Object is in Opened state
            element.setAttribute("class", "cart closed");
        } else {
            //Object is in closed state
            element.setAttribute("class", "cart opened");
        }
    }
    store.SwapCart = swapCart;
    return store;
})();