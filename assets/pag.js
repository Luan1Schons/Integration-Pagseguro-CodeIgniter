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

// Pega as bandeiras e informações do cartão
$('#cardBin').on('keyup', function(e){
    var cardBin = $(this).val();
    cardNumber = cardBin.length;
    if(cardNumber == 6){
    PagSeguroDirectPayment.getBrand({
        cardBin: cardBin,
        success: function(retorno){
            //função de callback para chamadas bem sucedidas
            $('.card-error').html();
            $('.card-flag').html('<img src="https://stc.pagseguro.uol.com.br//public/img/payment-methods-flags/42x20/'+retorno.brand.name+'.png"/>');
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
        cardNumber: $("input#cardbin").val(),
        brand: flag,
        cvv: $("input#cvv").val(),
        expirationMonth: $("input#validadeMes").val(),
        expirationYear: $("input#validadeAno").val(),
        success: { 
            //função de callback para chamadas bem sucedidas
        },
        error: {
            //função de callback para chamadas que falharam
        },
        complete: {
            //função de callback para todas chamadas
        }
    });
}
