<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Pagseguro Sandbox</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" crossorigin="anonymous">
    <script type="text/javascript" src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.min.js"></script>
</head>
<body>

    <h3 class="text-center my-2 mb-2">PagSeguro no CodeIgniter</h3>
    <h5 class="text-center text-success my-2 mb-2"><i class="fas fa-boxes"></i> Atuando em modo de teste</h3>
    <div class="col-md-12">
    <div class="row">
    <div class="col-md-4">
    <div class="card">
    <div class="card-body">
    <p class="loader-payments-method container d-flex align-items-center justify-content-center" style=""><i class="fa fa-spinner fa-spin mr-2"></i> Carregando...</p>
    <div class="payments-methods" style="display: none;">
                    <div class="payment-options-card">
                    <h4>Opções para pagamento via cartão de crédito:</h4>
                    </div>

                    <div class="payment-options-boleto">
                    <h4>Boleto:</h4>
                    </div>

                    <div class="payment-options-debit-online">
                    <h4>Opções para pagamento via débito online:</h4>
                    </div>
    </div>
    </div>
    </div>
    </div>

    <div class="col-md-8">
    <div class="card">
    <div class="col-md-8">
        <div class="card-error my-2"></div>
    </div>
            <div class="card-body">
                <p>Preencha suas informações</p>
            <form method="post" action="" id="form-pagamento" autocomplete="off">

            <div class="form-group" style="display:none;">
                <input type="text" name="id_session" id="id_session" class="form-control">
               
            </div>
            <div class="form-group" style="display:block;">
            <label>
            Valor da fatura
            </label>
            <input type="number" name="valorPagto" id="valorPagto" value="500" id="valorPagto" class="form-control" readonly>
            </div>

            <div class="form-group">
                <input type="email" name="email" value="contato@sellpublicidade.com.br" placeholder="seu@email.com" class="form-control">
            </div>

            <div class="form-group">
                <label>Número do cartão de crédito</label>
                <div class="input-group">
                <div class="input-group-prepend">
                <span class="input-group-text card-flag" id="basic-addon1"></span>
                </div>
                <input type="cardbin" name="number" max-lenght="16" id="cardBin" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label>Data de validade Mês</label>
                <div class="input-group">
                <input type="cardbin" name="validadeMes" max-lenght="2" id="validadeMes" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label>Data de validade Ano</label>
                <div class="input-group">
                <input type="cardbin" name="ValidadeAno" max-lenght="4" id="ValidadeAno" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label>Código de segurança [CVV]</label>
                <div class="input-group">
                <input type="cardbin" name="cvv" max-lenght="3" id="cvv" class="form-control">
                </div>
            </div>

            <div class="form-group loader-installments" style="display: none;">
            <p class="container d-flex align-items-center justify-content-center"><i class="fa fa-spinner fa-spin mr-2"></i> Carregando...</p>
            </div>

            <div class="form-group" id="installmentsGroup" style="display:none;">
                 <label for="installments">Escolha o Parcelamento</label>
                 <select class="form-control" id="installments">
                
                </select>
                </div>
            
            <div class="form-group">
                <button type="submit" id="form-pagamento" class="btn btn-success float-right btn-lg">Pagar</button>
            </div>
            <sṕan class="url" data-url="<?= base_url();?>"></span>
            </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script type="text/javascript" src="<?= base_url().'assets/pag.js';?>"></script>
</body>
</html>