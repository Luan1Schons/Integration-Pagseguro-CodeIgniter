
    var url = $('.url').attr('data-url');
    create_session();
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

function listarMeioPag()
{
    PagSeguroDirectPayment.getPaymentMethods({
        amount: 500.00,
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
        complete: function(retorno){
            
        }
      });
}

$('#cardBin').on('keyup', function(e){
    var cardBin = $(this).val();
    cardNumber = cardBin.length;
    if(cardNumber >= 6){
    PagSeguroDirectPayment.getBrand({
        cardBin: cardBin,
        success: function(retorno){
            //função de callback para chamadas bem sucedidas
            $('.card-error').html();
            $('.card-flag').html('<img src="https://stc.pagseguro.uol.com.br//public/img/payment-methods-flags/42x20/'+retorno.brand.name+'.png"/>');
        },
        error: function(retorno){
            //função de callback para chamadas que falharam
            $('.card-error').html('<div class="alert alert-danger">Cartão Inválido!</div>');
        },
        complete: function(retorno){
            //função de callback para todas chamadas
            $('.card-error').html();
            $('.card-flag').html('');
        }
      });
    }
})
