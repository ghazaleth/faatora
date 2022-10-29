$("#invoice").fadeOut();

$.ajax({
    url:"https://app.faatora.com/api/demo_invoice",
    method:"get",
    success:function(json){
        $(".loading").fadeOut();
        $("#invoice").fadeIn();
        let data = json.data;
        // Company Details
        company_details_invoice.innerHTML = `
        <h5 class="company_name">${data.settings.company_name}</h5>
        ${data.settings.company_address !== "" ? `<p class="company_address fs-6 fw-bold m-0">${data.settings.company_address}</p>` : ""}
        <div>
            ${data.settings.company_zipcode !== "" ? `<span class="company_zipcode fs-6 fw-bold m-0">${data.settings.company_zipcode}, </span>` : ""}
            ${data.settings.company_city !== "" ? `<span class="company_city fs-6 fw-bold m-0">${data.settings.company_city}</span>` : ""}
        </div>
        ${data.settings.company_country !== "" ? `<p class="company_country fs-6 fw-bold m-0">${data.settings.company_country}</p>` : ""}
        ${data.settings.vat_number !== "" ? `<p class="vat_number fs-6 fw-bold m-0">VAT No: ${data.settings.vat_number}</p>` : ""}
        `
        company_details.innerHTML = `
        <h5 class="company_name my-4">${data.settings.company_name}</h5>
        ${data.settings.company_address !== "" ? `<p class="company_address fs-6 fw-bold m-0">${data.settings.company_address}</p>` : ""}
        <div>
            ${data.settings.company_zipcode !== "" ? `<span class="company_zipcode fs-6 fw-bold m-0">${data.settings.company_zipcode}, </span>` : ""}
            ${data.settings.company_city !== "" ? `<span class="company_city fs-6 fw-bold m-0">${data.settings.company_city}</span>` : ""}
        </div>
        ${data.settings.company_country !== "" ? `<p class="company_country fs-6 fw-bold m-0">${data.settings.company_country}</p>` : ""}
        ${data.settings.vat_number !== "" ? `<p class="vat_number fs-6 fw-bold m-0">VAT No: ${data.settings.vat_number}</p>` : ""}
        `
        //invoice_date.innerHTML = `${data.invoice.due_date}`
        invoice_date_printing.innerHTML = `${data.invoice.due_date}`
        // Sender Details && Recevier
        customer = JSON.parse(data.invoiceDetails.customer_data);
        sender_details.innerHTML = `
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Name:</span> <span>${customer.billing_name}</span></p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Address:</span> ${customer.billing_address}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Contact no:</span> ${customer.billing_phone}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>City:</span> ${customer.billing_city}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Country:</span> ${customer.billing_country}</p>
            <p class="fs-6 fw-bold m-0 d-flex justify-content-between"><span>Vat no:</span> ${customer.vat_number}</p>
        `
        sender_details_invoice.innerHTML = `
            <p class="justify-content-between d-flex"><span>Name:</span> <span>${customer.billing_name}</span></p>
            <p class="justify-content-between d-flex"><span>Address:</span> ${customer.billing_address}</p>
            <p class="justify-content-between d-flex"><span>Contact no:</span> ${customer.billing_phone}</p>
            <p class="justify-content-between d-flex"><span>City:</span> ${customer.billing_city}</p>
            <p class="justify-content-between d-flex"><span>Country:</span> ${customer.billing_country}</p>
            <p class="justify-content-between d-flex"><span>Vat no:</span> ${customer.vat_number}</p>
        `
        recevier_details_invoice.innerHTML = `
            <p class="fw-bold mb-3 d-flex justify-content-between"><span>Name:</span> <span>${customer.shipping_name}</span></p>
            <p class="fw-bold mb-3 d-flex justify-content-between"><span>Address:</span> ${customer.shipping_address}</p>
            <p class="fw-bold mb-3 d-flex justify-content-between"><span>Contact no:</span> ${customer.shipping_phone}</p>
            <p class="fw-bold mb-3 d-flex justify-content-between"><span>City:</span> ${customer.shipping_city}</p>
            <p class="fw-bold mb-3 d-flex justify-content-between"><span>Country:</span> ${customer.shipping_country}</p>
            <p class="fw-bold m-0 d-flex justify-content-between"><span>Vat no:</span> ${customer.vat_number}</p>
        `
        recevier_details.innerHTML = `
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Name:</span> <span>${customer.shipping_name}</span></p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Address:</span> ${customer.shipping_address}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Contact no:</span> ${customer.shipping_phone}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>City:</span> ${customer.shipping_city}</p>
            <p class="fs-6 fw-bold mb-3 d-flex justify-content-between"><span>Country:</span> ${customer.shipping_country}</p>
            <p class="fs-6 fw-bold m-0 d-flex justify-content-between"><span>Vat no:</span> ${customer.vat_number}</p>
        `
        // Product Details
        var products = data.invoiceDetails.items;
        products.forEach((product, index) =>{
            tbody.innerHTML += `
                <tr>
                    <td class="table_invoice_td">${index +1}</td>
                    <td class="table_invoice_td">${product.description}</td>
                    <td class="table_invoice_td">${product.quantity}</td>
                    <td class="table_invoice_td">${product.discount == "0" ? "-" : product.discount}</td>
                    <td class="table_invoice_td">${product.itemTaxPrice}</td>
                    <td class="table_invoice_td">${product.price}.00</td>
                </tr>
            `
            table_invoice.innerHTML += `
                <tr>
                    <td>${index +1}</td>
                    <td>${product.description}</td>
                    <td>${product.quantity}</td>
                    <td>${product.discount == "0" ? "-" : product.discount}</td>
                    <td>${product.itemTaxPrice}</td>
                    <td>${product.price}.00</td>
                </tr>
            `
        })

        //Total Amount
        total_amount.innerHTML = `
            <div class="border border-3 bg-light p-4">
                <div class="d-flex justify-content-between mb-3">
                    <h5 class="m-0">Total (Excluding Vat)</h5>
                    <h5 class="m-0">${parseInt(data.invoice.totalTaxPrice)}.00</h5>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <h5 class="m-0">Discount</h5>
                    <h5 class="m-0">${data.invoice.totalDiscount == 0 ? "0" : data.invoice.totalDiscount}</h5>
                </div>
                <div class="d-flex justify-content-between mb-3">
                    <h5 class="m-0">Total VAT (15%) VAT</h5>
                    <h5 class="m-0">3.00</h5>
                </div>
            </div>
            <div class="border border-3 background-head bg-dark text-light">
                <div class="d-flex justify-content-between p-3">
                    <h5 class="m-0">Total Amount Due</h5>
                    <h5 class="m-0">${data.invoice.totalRate}.00</h5>
                </div>
            </div>
        `
        printing_table_total.innerHTML = `
            <tr>
                <td class="d-block">${parseInt(data.invoice.totalTaxPrice)}.00</td>
                <td class="d-block">${data.invoice.totalDiscount == 0 ? "0" : data.invoice.totalDiscount}</td>
                <td class="d-block">3.00</td>
                <td class="d-block">${data.invoice.totalRate}.00</td>
            </tr>
        `
    }
})

function printInvoice(){
    $('#printin_table').printThis({
        importCSS: true,
    });
}

downloadInvoice = async () => {
    $("#invoice").css("display","none")
    $(".loading").fadeIn();
    var element = window.document.getElementById("printin_table").innerHTML;
    var opt = {
        margin: .5,
        filename: 'invoice.pdf',
        image: {type: 'jpeg', quality: 20},
        html2canvas: {scale: 5},
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    await html2pdf().from(element).set(opt).save();
    $("#invoice").css("display","block")
    $(".loading").fadeOut();
}