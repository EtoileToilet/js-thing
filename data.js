var modal = document.getElementById("form");
var btn = document.getElementById("airi_momodal");
var boom = document.getElementsByClassName("close")[0];
btn.onclick = function(){modal.style.display = "block";}
boom.onclick = function(){modal.style.display = "none";}
function dataGrab() {
    let itemname = document.getElementById('itemname').value;
    let manufacturer = document.getElementById('manufacturer').value;
    let count = document.getElementById('count').value;
    let price = document.getElementById('price').value;
    submitOK = "true";
    console.log(submitOK)
    if (itemname == "") {
        document.getElementById('itemname-error').innerHTML = 'Vui lòng nhập tên sản phẩm!' ;
        submitOK = "false";
    } else {
        document.getElementById('itemname-error').innerHTML = '' ;
        modal.style.display = "none";
    }
    if (manufacturer == "") {
        document.getElementById('manufacturer-error').innerHTML = 'Vui lòng nhập tên NSX!' ;
        submitOK = "false";
    } else {
        document.getElementById('manufacturer-error').innerHTML = '' ;
        modal.style.display = "none";
    }
    if (count == "") {
        document.getElementById('count-error').innerHTML = 'Vui lòng nhập số lượng!' ;
        submitOK = "false";
    } else {
        if (isNaN(count)){
            document.getElementById('count-error').innerHTML = 'Số lượng không hợp lệ!';
            modal.style.display = "block";
            submitOK = "false";
        } else {
        document.getElementById('count-error').innerHTML = '' ;
        modal.style.display = "none";
        }
    }
    if (price == "") {
        document.getElementById('price-error').innerHTML = 'Vui lòng nhập giá tiền sản phẩm!' ;
        submitOK = "false";
    } else {
        if (isNaN(price)){
            document.getElementById('price-error').innerHTML = 'Giá không hợp lệ!';
            modal.style.display = "block";
            submitOK = "false";
        } else {
        document.getElementById('price-error').innerHTML = '' ;
        modal.style.display = "none";
        }
    }
if (submitOK=="false"){return;}
else{
if (itemname&&manufacturer&&count&&price){
    let item = localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')) : [];
    item.push(
        {
            itemname: itemname,
            manufacturer: manufacturer,
            count: count,
            price: price
        }
    );
    localStorage.setItem('item',JSON.stringify(item));
    this;
    let tableContent = `<tr>
    <td>STT</td>
    <td>Tên mặt hàng</td>
    <td>NSX</td>
    <td>Số lượng</td>
    <td>Giá</td>
    <td>Hành động</td>
    </tr>`;
    item.forEach((item,index) => {
        let itemid = index;
        index ++;
        tableContent += `<tr>
        <td> ${index} </td>
        <td>${item.itemname}</td>
        <td>${item.manufacturer}</td>
        <td>${item.count}</td>
        <td>${item.price}</td>
        <td>
            <a href='#' onclick = 'change(${itemid})' >Sửa</a> | <a href='#' onclick = 'yeet(${itemid})' >Xóa</a>
        </td>
    </tr>`;
    })
    document.getElementById('grid').innerHTML = tableContent;
}
}
}
function render(){
    let item = localStorage.getItem('item') ? JSON.parse(localStorage.getItem('item')):[];
    if (item.length===0){
        document.getElementById('item-listings').style.display='none';
    }
    document.getElementById('item-listings').style.display='block';
    let tableContent = `<tr>
    <td>STT</td>
    <td>Tên mặt hàng</td>
    <td>NSX</td>
    <td>Số lượng</td>
    <td>Giá</td>
    <td>Hành động</td>
    </tr>`;
    item.forEach((item,index) => {
        let itemid = index;
        index ++;
        tableContent += `<tr>
        <td> ${index} </td>
        <td>${item.itemname}</td>
        <td>${item.manufacturer}</td>
        <td>${item.count}</td>
        <td>${item.price}</td>
        <td>
            <a href='#' onclick = 'change(${itemid})' >Sửa</a> | <a href='#' onclick = 'yeet(${itemid})' >Xóa</a>
        </td>
    </tr>`;
    })
    document.getElementById('grid').innerHTML = tableContent;
}
function yeet(id){
    let item = localStorage.getItem('item')?JSON.parse(localStorage.getItem('item')):[];
    let yeet_dialogue = "Xác nhận xoá? Dữ liệu đã xoá không thể lấy lại!"
    if (confirm(yeet_dialogue) == true) {
    item.splice(id,1);
    localStorage.setItem('item',JSON.stringify(item));
    render();
    }
}
function reset(id){
    let item = localStorage.getItem('item')?JSON.parse(localStorage.getItem('item')):[];
    let yeet_dialogue = "Xác nhận xoá hết và làm mới? Dữ liệu đã xoá không thể lấy lại!"
    if (confirm(yeet_dialogue) == true) {
    item.splice(id,id.length);
    localStorage.setItem('item',JSON.stringify(item));
    render();
    }
}
function change(id){
    modal.style.display = "block"
    let item=localStorage.getItem('item')?JSON.parse(localStorage.getItem('item')):[];
    document.getElementById('itemname').value=item[id].itemname;
    document.getElementById('manufacturer').value=item[id].manufacturer;
    document.getElementById('count').value=item[id].count;
    document.getElementById('price').value=item[id].price;
    document.getElementById('index').value=id;
    document.getElementById('dataGrab').style.display="none";
    document.getElementById('upd8').style.display="inline-block";
}
function upd8(){
    let item = localStorage.getItem('item')?JSON.parse(localStorage.getItem('item')):[];
    let index = document.getElementById('index').value
    item[index]={
        itemname:document.getElementById('itemname').value,
        manufacturer:document.getElementById('manufacturer').value,
        count:document.getElementById('count').value,
        price:document.getElementById('price').value,
    }
    localStorage.setItem('item',JSON.stringify(item));
    render();
    document.getElementById('dataGrab').style.display="inline-block";
    document.getElementById('upd8').style.display="none";
    modal.style.display = "none";
}