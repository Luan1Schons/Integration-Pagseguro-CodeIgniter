<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

// CodeIgniter Payment Gateways by @@Luan Schons Griebler
// Payment Gateways Version 1.0.0

$config['version'] = '1.0'; //[version] script version

// Pagseguro infos
$config['pagseguro'] = array(
    'production' => false,
    'url_production' => 'https://ws.pagseguro.uol.com.br/v2',
    'url_sandbox' => 'https://ws.sandbox.pagseguro.uol.com.br/v2',
    // <--- Tokens -->
    'token_production' => 'f4c11e75-b9a5-458e-ac65-a16bdaf3065ffbde5fbe400880d8b4bef336bba3a7113131-6683-4647-a6ab-a324d7206707',
    'token_sandbox' => 'D037370229B24E5E9721D7F0E9936D6B',
    // <!--- Tokens -->
    'payment' => 'pagseguro',
    'version' => $config['version']
);

?>