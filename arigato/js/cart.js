$(document).ready(function(){
    initCartItemsFromStorage();
    initEmptyCart();
    initShowNumberOfItems();
    initRemovingItems();
})

function initEmptyCart(){
    var cartContainer = $('.cart-items-container');
    var emptyHTML = '<div class="empty-heading"><span><b>В корзине пока нет товаров</b></span><a href="catalog.html" class="button btn-red">Перейти к покупкам</a></div>'
    if(cartContainer.children().length == 0){
        cartContainer.html(emptyHTML);  
        //alert(emptyHTML);
        $('.cart-icon').addClass('empty');
    }
}

function initShowNumberOfItems(){
    if($('.cart-items-container .item').length > 0){
        $('.cart-icon').removeClass('empty');
        $('.items-in-bag').html($('.cart-items-container').children().length);  
    }
}

var itemsIds = [];
$('.btn-cart').on('click', function(e){
    e.preventDefault();
    var itemId = $(this).parents('.item').attr('id');
    var quantityOfItems = Number($(this).parents('.item').find('.quantity').text());

    if($(e.target).hasClass('more-than-one-item')){     
        for(var i = 0; i < quantityOfItems; i++){
            itemsIds.push(Number(itemId));
            initCartItemsHTML();
            setCartItemsHTML();
            initShowNumberOfItems();
            initCartStorage();
            //initItemCounter();
            initRemovingItems();
        }
    }
    else {
        itemsIds.push(Number(itemId));
        initCartItemsHTML();
        setCartItemsHTML();
        initShowNumberOfItems();
        initCartStorage();
        //initItemCounter();
        initRemovingItems();
    }
})
 
var cartItemsHTML = localStorage['cart-storage'] ? localStorage['cart-storage'] : '';
function initCartItemsHTML(){
    var lastItem = itemsIds[itemsIds.length-1];
    cartItemsHTML += 
        '<div class="item" id="' + window.catalog[lastItem].id + '">' +
            '<a href = "item.html" class="img-small open-item"><img src="'+ window.catalog[lastItem].thumbnail +'" alt=""></a>\n' +
            '<div class="row">\n'+
                '<a href = "item.html" class="open-item"><h6 class="title">'+ window.catalog[lastItem].title +'</h6></a><a class="icon-remove"></a>\n' +
                '<span class="details size">'+ window.catalog[lastItem].size +' шт</span><span class="details weight">'+ window.catalog[lastItem].weight +' гр</span>\n'+
            '</div>\n'+
            '<div class="row flex-row">\n'+
                //'<div class="counter"><span class="plus">+</span><span class="quantity-cart">1</span><span class="minus disabled">-</span></div>\n'+
                '<span class="price"><span class="current-price-cart"><b>'+ window.catalog[lastItem].discountedPrice +'</b> грн</span></span>\n'+
            '</div>\n'+
        '</div>';           
}

function setCartItemsHTML(){
    $('.cart-items-container').html(cartItemsHTML);
}

function initCartStorage(){
    if($('.cart-items-container').find('.item')){
        localStorage['cart-storage'] = $('.cart-items-container').html();    
    }
}

function initCartItemsFromStorage(){
    $('.cart-items-container').html(localStorage['cart-storage']);
}

function initRemovingItems() {
    $('.icon-remove').on('click', function(){
        $(this).parents('.item').remove();
        initCartStorage();
        initEmptyCart();
        initShowNumberOfItems();
    })   
}

