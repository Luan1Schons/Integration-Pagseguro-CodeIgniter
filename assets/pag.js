    var url = $('.url').attr('data-url');
    var amount = "500.00";
    // Cria a sessão na API 2.0 do PagSeguro
    function create_session(){
    $.ajax({
        url: url + '/pagseguro',
        type: 'post',
        dataType: 'json',
        data: $(this).serialize(),
        success: function(retorno){
            $('#id_session').val(retorno.id);
            PagSeguroDirectPayment.setSessionId(retorno.id);
        },
        error: function(retorno){
            console.log(retorno);
            alert('Ocorreu um erro no sistema!');
        },
        complete: function(retorno){
            
            $('.loader-payments-method').html('');
            listarMeioPag();
        }
    });
    }

    $(document).ready(function() {
        var ctrlDown = false,
            ctrlKey = 17,
            cmdKey = 91,
            vKey = 86,
            cKey = 67;

        var ctrlCounter = 0;
    
        $(document).keydown(function(e) {
            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
        }).keyup(function(e) {
            if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
        });
    
        $(document).keydown(function(e) {
            if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) return false;
        });
        
        // Document Ctrl + C/V 
        $(document).keydown(function(e) {
            if (ctrlDown && (e.keyCode == cKey)){

                ctrlCounter = ctrlCounter + 1;
                if(ctrlCounter == 5){
                    $('#alertGeral').html('<div class="card"><div class="card-body"> <i class="fas fa-exclamation-circle"></i> Você tem atitudes suspeitas!, para a sua segurança o pagamento foi cancelado.</div></div>');
                }

            } 
            if (ctrlDown && (e.keyCode == vKey)){
                ctrlCounter = ctrlCounter + 1;
                if(ctrlCounter == 5){
                    $('#alertGeral').html('<div class="card"><div class="card-body"> <i class="fas fa-exclamation-circle"></i> Você tem atitudes suspeitas!, para a sua segurança o pagamento foi cancelado.</div></div>');
                }

            }
        });
    });

// Pega meios de pagamentos do Pagseguro
function listarMeioPag()
{
    PagSeguroDirectPayment.getPaymentMethods({
        amount: amount,
        success: function(retorno){

            $('.payments-methods').show();
            $.each(retorno.paymentMethods.CREDIT_CARD.options, function(key, item){
                $('.payment-options-card').append('<img class="mr-2 my-2" src="https://stc.pagseguro.uol.com.br/'+item.images.SMALL.path+'"/>');
            });

            $('.payment-options-boleto').append('<span><img class="mr-2 my-2" src="https://stc.pagseguro.uol.com.br/'+retorno.paymentMethods.BOLETO.options.BOLETO.images.SMALL.path+'"/></span>');
            
            $.each(retorno.paymentMethods.ONLINE_DEBIT.options, function(key, item){
                $('.payment-options-debit-online').append('<img class="mr-2 my-2" src="https://stc.pagseguro.uol.com.br/'+item.images.SMALL.path+'"/>');
            });
        },
        error: function(retorno){
            console.log(retorno);
        },
      });
}

// Status que verifica passos de preenchimento das informações do cartão
var status = 0;

$('#validadeMes').on('focusout', function(e){

    var mesVencimento = $('#validadeMes').val();
    mesVencimento = mesVencimento.length;

    if(mesVencimento == 2){
        status = parseInt(status) + 1;
        $('#validadeMes').attr('readonly', true);
        $('#cardMesAlert').text('');
        console.log(status);
    }else{
        $('#cardMesAlert').text('Preencha o mês de vencimento!');
    }
});


$('#validadeAno').on('focusout', function(e){

    var anoVencimento = $('#validadeAno').val();
    anoVencimento = anoVencimento.length;

    if(anoVencimento == 2){
        status = parseInt(status) + 1;
        $('#validadeAno').attr('readonly', true);
        $('#cardAnoAlert').text('');
        console.log(status);
    }else{
        $('#cardAnoAlert').text('Preencha o ano de vencimento!');
    }
});

$('#cvv').on('focusout', function(e){

    var cvv = $('#cvv').val();
    cvv = cvv.length;
    
    if(cvv == 3){
        status = parseInt(status) + 1;
        $('#cvv').attr('readonly', true);
        $('#cardCvvAlert').text('');
        console.log(status);
    }else{
        $('#cardCvvAlert').text('Preencha o CVV!');
    }

});
// Assim que verificou todos os passos com sucesso o valor de STATUS deve ser 4, para solicitar o token do cartão com sucesso!
setInterval(function(){
    if(status == 4){
    $('.cardRefresh').show();
    recupTokenCard($('#flag').val());
    status = 0;
    }
}, 2000);

// Apaga todos os inputs para o procedimento ser refeito
function cardRefresh(){
    $('#installmentsGroup').hide();
    $('.card-flag').html('');
    $('#cvv').attr('readonly', false);
    $('#cvv').val('');

    $('#validadeMes').attr('readonly', false);
    $('#validadeMes').val('');

    $('#validadeAno').attr('readonly', false);
    $('#validadeAno').val('');

    $('#cardBin').attr('readonly', false);
    $('#cardBin').val('');

    $('#cardToken').val('');

    status = 0;
}
var keyUp = 0;
// Pega as bandeiras e informações do cartão
$('#cardBin').on('keyup', function(e){

    // Computa a quantidade de teclas utilizadas para arrumar o glitch de conseguir digitar com o campo em readonly

    keyUp = keyUp + 1;

    if(keyUp <= 16)
    {

    var cardBin = $(this).val();
    cardNumber = cardBin.length;

    if(cardNumber == 16){
        status = parseInt(status) + 1;
        $('#cardBin').attr('readonly', true);
        $('#cardNumberAlert').text('');
        console.log(status);
    }else if(cardNumber == 6){
        $('#cardNumberAlert').text('O número do cartão deve ter 16 dígitos!');
    }else if(cardNumber > 16){
        $('#cardBin').attr('readonly', false);
        $('#cardBin').val('');
    }

    if(cardNumber == 6){
    PagSeguroDirectPayment.getBrand({
        cardBin: cardBin,
        success: function(retorno){
            //função de callback para chamadas bem sucedidas
            $('.card-error').html();
            $('.card-flag').html('<img src="https://stc.pagseguro.uol.com.br//public/img/payment-methods-flags/42x20/'+retorno.brand.name+'.png"/>');
            $('#flag').val(retorno.brand.name);
            recupFlag(retorno.brand.name);
        },
        error: function(retorno){
            //função de callback para chamadas que falharam
            $('.card-error').html('<div class="alert alert-danger">Cartão Inválido!</div>');
            $('#installmentsGroup').hide();
        },
      });
      // Se o campo do numero do cartão for menor que 6 caracteres
    }else if(cardNumber < 6){
        $('.card-flag').empty();
        $('#flag').val('');
        $('#installmentsGroup').hide();
    }
    }else{
        // Correção do bug que permite teclar mesmo com o modo readonly
        $('.card-error').html('<div class="alert alert-danger">Você só pode digitar 16 caracteres neste campo!</div>');
    }
})

// Recupera as parcelas pela bandeira do cartão
function recupFlag(flag)
{   
    $('.loader-installments').show();
    PagSeguroDirectPayment.getInstallments({
        amount: amount,
        brand: flag,
        maxInstallmentNoInterest: 3,
        success: function(retorno){
            console.log(retorno);
            $('#installmentsGroup').show();
            //função de callback para chamadas bem sucedidas
            $.each(retorno.installments, function(key, itemA){
                
                $.each(itemA, function(key, itemB){

                    // Converter o valor para a moedal REAL
                    var valueInstallment = itemB.installmentAmount.toFixed(2).replace('.', ',');

                    if(itemB.interestFree == true){
                        $('#installments').append('<option value="'+itemB.quantity+'" data-parcelas="'+itemB.installmentAmount+'">'+itemB.quantity+'x De R$'+valueInstallment+' Sem Juros'+'</option>')
                    }else{
                        $('#installments').append('<option value="'+itemB.quantity+'" data-parcelas="'+itemB.installmentAmount+'">'+itemB.quantity+'x De R$'+valueInstallment+'</option>')
                    }

                });

            });
        },
        error: function(retorno){
            //função de callback para chamadas bem sucedidas
            console.log(retorno);
        },
        complete: function(retorno){
            $('.loader-installments').hide();
        }
    });
    
}

function recupTokenCard(flag)
{
    PagSeguroDirectPayment.createCardToken({
        cardNumber: $("#cardBin").val(),
        brand: flag,
        cvv: $("#cvv").val(),
        expirationMonth: $("#validadeMes").val(),
        expirationYear: `20${$("#validadeAno").val()}`,
        success: function(retorno){ 
            $('#cardToken').val(retorno.card.token);
            //função de callback para chamadas bem sucedidas
        },
        error: function(retorno){
            console.log(retorno);
            //função de callback para chamadas que falharam
        },
        complete: function(retorno){
            console.log(retorno);
            //função de callback para todas chamadas
        }
    });
}

$('#nome-comprador').on('focusout', function (){
    PagSeguroDirectPayment.onSenderHashReady(function(response){

        if(response.status == 'error') {
            console.log(response.message);
            return false;
        }else{
        var hash = response.senderHash; //Hash estará disponível nesta variável.
        $('#hash-comprador').val(hash)
        }
    });
});

// Mostra a parcela selecionada no input

$('#installments').change(function(response){
    var parcelas = $('#installments').find(':selected').attr('data-parcelas');
    $('#valorParcela').val(parcelas);
});

$('#form-pagamento').on('submit',function(e){
    e.preventDefault();

    $.ajax({
        url: "/pagseguro/buy",
        type: "post",
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response) {

           console.log(response);

        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
});

