    var amount = "500.00";
    var url = $('.url').attr('data-url');
    create_session();
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

$('#validadeMes').on('keyup', function(e){

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


$('#validadeAno').on('keyup', function(e){

    var anoVencimento = $('#validadeAno').val();
    anoVencimento = anoVencimento.length;

    if(anoVencimento == 4){
        status = parseInt(status) + 1;
        $('#validadeAno').attr('readonly', true);
        $('#cardAnoAlert').text('');
        console.log(status);
    }else{
        $('#cardAnoAlert').text('Preencha o ano de vencimento!');
    }
});

$('#cvv').on('keyup', function(e){

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
// Pega as bandeiras e informações do cartão
$('#cardBin').on('keyup', function(e){
    var cardBin = $(this).val();
    cardNumber = cardBin.length;

    if(cardNumber == 16){
        status = parseInt(status) + 1;
        $('#cardBin').attr('readonly', true);
        $('#cardNumberAlert').text('');
        console.log(status);
    }else if(cardNumber == 6){
        $('#cardNumberAlert').text('O número do cartão deve ter 16 dígitos!');
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
            $('#installmentsGroup').show();
            //função de callback para chamadas bem sucedidas
            $.each(retorno.installments, function(key, itemA){
                
                $.each(itemA, function(key, itemB){
                    var valueInstallment = itemB.installmentAmount.toFixed(2).replace('.', ',');
                    if(itemB.interestFree == true){
                        $('#installments').append('<option value="'+itemB.totalAmount+'">'+itemB.quantity+'x De R$'+valueInstallment+' Sem Juros'+'</option>')
                    }else{
                        $('#installments').append('<option value="'+itemB.totalAmount+'">'+itemB.quantity+'x De R$'+valueInstallment+'</option>')
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
        expirationYear: $("#validadeAno").val(),
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
