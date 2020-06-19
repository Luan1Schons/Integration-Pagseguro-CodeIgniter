<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

// CodeIgniter Payment Gateways by @@Luan Schons Griebler
// Payment Gateways Version 1.0.0

$config['version'] = '1.0'; //[version] script version

// Pagseguro infos
$config['pagseguro'] = array(
    'production' => false,
    'url_production' => 'https://ws.pagseguro.uol.com.br/v2',
    'url_sandbox' => 'https://ws.sandbox.pagseguro.uol.com.br/v2',
    'user' => '',
    'pass' => '',
    'payment' => 'pagseguro',
    'version' => $config['version']
);

?>