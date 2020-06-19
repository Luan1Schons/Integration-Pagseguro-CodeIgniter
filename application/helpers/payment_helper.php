<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function credentials(){
    $ci=& get_instance();
    $ci->load->database(); 
    $ci->load->config('payment');
    $json = json_encode($ci->config->item('pagseguro'));
    return $json;
}