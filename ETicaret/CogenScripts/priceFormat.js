var optionPriceFormat = {
    prefix: '',
    centsSeparator: '.',
    thousandsSeparator: ',',
    centsLimit: 2
};

function priceFormat(value) {
    var price = value;
    var currency_symbol = "₺";

    var formattedOutput = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2
    });

    return formattedOutput.format(price).replace(currency_symbol, '').replace('.', '|').replace(',', '.').replace('|', ',') + " ₺";
}

function priceFormatNoSembol(value) {
    var price = value;
    var currency_symbol = "₺";

    var formattedOutput = new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2
    });

    return formattedOutput.format(price).replace(currency_symbol, '').replace('.', '|').replace(',', '.').replace('|', ',');
}