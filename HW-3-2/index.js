function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
}

function checkValue(id) {
    var x = document.getElementById(id).value;
    if (!isFloat(x)) {
        document.getElementById('noti').innerHTML = '<div>Giá trị nhập ở ô <em>' + 
        ((id === "num1") ? " Số thứ nhất " : " Số thứ hai ") + '</em>không phải là số</div>';
        return false;
    }

    document.getElementById('noti').innerHTML = "";
        
    return true;
}

function addInput(event, id) {
    document.getElementById(id).value = event.target.value;
}

function calculate() {
    var answer;

    var a = document.getElementById("num1").value;
    var b = document.getElementById("num2").value;

    if (!isFloat(a) || !isFloat(b)) {
        document.getElementById('noti').innerHTML = '<div>Chưa điền đủ 2 số hợp lệ để thực hiện phép tính</div>';
        return;
    }
        
    a = parseFloat(a);
    b = parseFloat(b);

    if (document.getElementById("plus").checked)
        answer = a + b;
    else if (document.getElementById("minus").checked)
        answer = a - b;
    else if (document.getElementById("multipy").checked)
        answer = a * b;
    else if (document.getElementById("divide").checked)
        answer = a / b;
    else {
        document.getElementById('noti').innerHTML = '<div>Chưa chọn phép tính<div/>'
        return;
    }
    document.getElementById("answer").value = answer;
    document.getElementById('noti').innerHTML = "";
}